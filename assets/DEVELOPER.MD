# Manual do Desenvolvedor 👨‍💻

## 🏗️ Arquitetura
```
Frontend (JS) ←→ Backend (Django) ←→ Banco de Dados
```

## ⚙️ Configuração

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend
Abrir `frontend/index.html` com Live Server

## 📁 Estrutura
```
iluminacao-publica/
├── backend/
│   ├── core/
│   │   ├── models.py
│   │   ├── views.py
│   │   └── serializers.py
│   └── requirements.txt
└── frontend/
    ├── index.html
    ├── js/
    └── css/
```

## 🔌 API Endpoints

### Autenticação
- POST `/api/auth/register/` - Criar usuário
- POST `/api/auth/login/` - Login (JWT)

### Ocorrências
- GET `/api/ocorrencias/` - Listar
- POST `/api/ocorrencias/` - Criar
- GET `/api/ocorrencias/{id}/` - Detalhes

## 🎨 Padrões de Projeto

- **Module Pattern** (Frontend)
- **Singleton Pattern** (ApiService)
- **Repository Pattern** (Django ORM)

## 🐛 Troubleshooting

**CORS Error:**
Verificar `settings.py`:
```python
CORS_ALLOWED_ORIGINS = ["http://localhost:5500"]
```