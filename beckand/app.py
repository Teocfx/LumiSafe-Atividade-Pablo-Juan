import os
from flask import Flask, request, jsonify, send_from_directory, url_for
from config import Config
from models import db, User, Report, Photo, Trajectory
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from PIL import Image
import uuid
import json

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "webp"}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, supports_credentials=True)
    db.init_app(app)
    jwt = JWTManager(app)
    socketio = SocketIO(app, cors_allowed_origins="*", async_mode="eventlet")

    # ensure upload folder exists
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

    @app.before_first_request
    def create_tables():
        db.create_all()

    # ---------- Auth ----------
    @app.route("/auth/register", methods=["POST"])
    def register():
        data = request.get_json()
        if not data:
            return jsonify({"msg":"JSON body required"}), 400
        nome = data.get("nome")
        email = data.get("email")
        password = data.get("password")
        if not (nome and email and password):
            return jsonify({"msg":"nome, email e password são obrigatórios"}), 400
        if User.query.filter_by(email=email).first():
            return jsonify({"msg":"E-mail já cadastrado"}), 400
        user = User(nome=nome, email=email, password_hash=generate_password_hash(password))
        db.session.add(user)
        db.session.commit()
        return jsonify({"msg":"Usuário criado"}), 201

    @app.route("/auth/login", methods=["POST"])
    def login():
        data = request.get_json()
        if not data:
            return jsonify({"msg":"JSON body required"}), 400
        email = data.get("email")
        password = data.get("password")
        user = User.query.filter_by(email=email).first()
        if not user or not check_password_hash(user.password_hash, password):
            return jsonify({"msg":"Credenciais inválidas"}), 401
        access_token = create_access_token(identity=user.id)
        return jsonify({"access_token": access_token, "user": {"id": user.id, "nome": user.nome, "email": user.email}})

    # ---------- Uploads serving ----------
    @app.route("/uploads/<path:filename>")
    def uploaded_file(filename):
        return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

    # ---------- Create Report (with photos) ----------
    # multipart/form-data: fields -> title, description, lat, lng, status (opt), token in Authorization
    @app.route("/reports", methods=["POST"])
    @jwt_required(optional=True)
    def create_report():
        user_id = get_jwt_identity()
        title = request.form.get("title")
        description = request.form.get("description")
        lat = request.form.get("lat")
        lng = request.form.get("lng")
        status = request.form.get("status") or "pendente"
        if lat is None or lng is None:
            return jsonify({"msg":"lat e lng são obrigatórios"}), 400
        try:
            lat = float(lat); lng = float(lng)
        except:
            return jsonify({"msg":"lat/lng inválidos"}), 400

        report = Report(title=title, description=description, lat=lat, lng=lng, status=status, user_id=user_id)
        db.session.add(report)
        db.session.commit()

        # handle multiple files field 'photos'
        files = request.files.getlist("photos")
        saved = []
        for f in files:
            if f and allowed_file(f.filename):
                ext = secure_filename(f.filename).rsplit('.',1)[1].lower()
                fname = f"{uuid.uuid4().hex}.{ext}"
                fpath = os.path.join(app.config["UPLOAD_FOLDER"], fname)
                # optional resize / verify
                try:
                    img = Image.open(f.stream)
                    img.verify()  # ensure it's an image
                    f.stream.seek(0)
                except Exception as e:
                    continue
                f.save(fpath)
                photo = Photo(filename=fname, mimetype=f.mimetype, report_id=report.id)
                db.session.add(photo)
                saved.append(fname)
        db.session.commit()

        # build response
        geo = {
            "id": report.id,
            "title": report.title,
            "description": report.description,
            "lat": report.lat,
            "lng": report.lng,
            "status": report.status,
            "created_at": report.created_at.isoformat(),
            "photos": [url_for("uploaded_file", filename=fname, _external=True) for fname in saved]
        }

        # broadcast to real-time clients
        socketio.emit("new_report", geo, broadcast=True)

        return jsonify({"msg":"Report created", "report": geo}), 201

    # ---------- Get all reports as GeoJSON-like list ----------
    @app.route("/reports", methods=["GET"])
    def get_reports():
        reports = Report.query.order_by(Report.created_at.desc()).all()
        features = []
        for r in reports:
            photos = [url_for("uploaded_file", filename=p.filename, _external=True) for p in r.photos]
            feat = {
                "type": "Feature",
                "id": r.id,
                "properties": {
                    "title": r.title,
                    "description": r.description,
                    "status": r.status,
                    "created_at": r.created_at.isoformat(),
                    "photos": photos,
                    "user_id": r.user_id
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [r.lng, r.lat]
                }
            }
            features.append(feat)
        return jsonify({"type":"FeatureCollection", "features": features})

    # ---------- Get one report ----------
    @app.route("/reports/<int:report_id>", methods=["GET"])
    def get_report(report_id):
        r = Report.query.get_or_404(report_id)
        photos = [url_for("uploaded_file", filename=p.filename, _external=True) for p in r.photos]
        return jsonify({
            "id": r.id,
            "title": r.title,
            "description": r.description,
            "lat": r.lat, "lng": r.lng,
            "status": r.status,
            "created_at": r.created_at.isoformat(),
            "photos": photos
        })

    # ---------- Update report status (admin or owner) ----------
    @app.route("/reports/<int:report_id>", methods=["PATCH"])
    @jwt_required()
    def update_report(report_id):
        user_id = get_jwt_identity()
        r = Report.query.get_or_404(report_id)
        data = request.get_json() or {}
        status = data.get("status")
        if status:
            r.status = status
        if "title" in data:
            r.title = data.get("title")
        if "description" in data:
            r.description = data.get("description")
        db.session.commit()
        # notify clients
        payload = {
            "id": r.id,
            "status": r.status,
            "title": r.title,
            "lat": r.lat,
            "lng": r.lng,
        }
        socketio.emit("update_report", payload, broadcast=True)
        return jsonify({"msg":"Atualizado", "report": payload})

    # ---------- User's history ----------
    @app.route("/me/reports", methods=["GET"])
    @jwt_required()
    def my_reports():
        user_id = get_jwt_identity()
        reports = Report.query.filter_by(user_id=user_id).order_by(Report.created_at.desc()).all()
        out = []
        for r in reports:
            out.append({
                "id": r.id, "title": r.title, "description": r.description,
                "lat": r.lat, "lng": r.lng, "status": r.status,
                "created_at": r.created_at.isoformat(),
                "photos": [url_for("uploaded_file", filename=p.filename, _external=True) for p in r.photos]
            })
        return jsonify(out)

    # ---------- Trajectories ----------
    @app.route("/trajectories", methods=["POST"])
    @jwt_required()
    def create_trajectory():
        user_id = get_jwt_identity()
        data = request.get_json()
        if not data or "coords" not in data:
            return jsonify({"msg":"coords are required (list of {lat,lng})"}), 400
        coords = data["coords"]
        name = data.get("name")
        traj = Trajectory(name=name, coords_json=json.dumps(coords), user_id=user_id)
        db.session.add(traj)
        db.session.commit()
        # optional broadcast
        socketio.emit("new_trajectory", {"id": traj.id, "name": name, "coords": coords}, broadcast=True)
        return jsonify({"msg":"trajectory saved", "id": traj.id}), 201

    @app.route("/trajectories", methods=["GET"])
    def get_trajectories():
        trajs = Trajectory.query.order_by(Trajectory.created_at.desc()).limit(200).all()
        out = []
        for t in trajs:
            out.append({"id": t.id, "name": t.name, "coords": t.coords(), "created_at": t.created_at.isoformat()})
        return jsonify(out)

    # ---------- SocketIO events (optional) ----------
    @socketio.on("connect")
    def handle_connect():
        print("Client connected")
        emit("hello", {"msg":"connected"})

    @socketio.on("disconnect")
    def handle_disconnect():
        print("Client disconnected")

    # attach socketio to app to allow run
    app.socketio = socketio
    return app

if __name__ == "__main__":
    app = create_app()
    # run with socketio
    app.socketio.run(app, host="0.0.0.0", port=5000)
