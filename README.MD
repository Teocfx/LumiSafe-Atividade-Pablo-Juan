# Sistema de Iluminação Pública 💡

> Projeto A3 - Modelos, Métodos e Técnicas da Engenharia de Software
> FPB - 2025.2

## 📝 Descrição

Sistema web colaborativo para registro e visualização de problemas de iluminação pública.

## 🛠️ Tecnologias

**Frontend:**
- JavaScript Vanilla
- HTML5 / CSS3
- Leaflet.js

**Backend:**
- Python 3.11
- Django 5.0
- Django REST Framework
- SQLite

## 🚀 Como Rodar o Projeto

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows

pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend
Abrir `frontend/index.html` com Live Server

## 👥 Equipe

- Teófilo da Costa - 1362321634
- Flávio Eduardo Nascimento
- Miquéias Oliveira
- Felipe Maciel

## 📚 Documentação

- [Manual do Desenvolvedor](DEVELOPER.md)
- [Guia do Usuário](USER_GUIDE.md)

---

**Status:** 🚧 Em desenvolvimento