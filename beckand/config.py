import os
from dotenv import load_dotenv
load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "PalavraSecreta")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI", "sqlite:///" + os.path.join(BASE_DIR, "app.db"))
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER", os.path.join(BASE_DIR, "uploads"))
    MAX_CONTENT_LENGTH = 10 * 1024 * 1024  # 10 MB max por request (ajuste se quiser)
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "jwt-secret-string")
