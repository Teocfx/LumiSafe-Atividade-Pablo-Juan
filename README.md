# 🔦 Lumisafe

> Melhorando a segurança nas ruas através do mapeamento colaborativo da iluminação pública.

## 📋 Sobre o Projeto

Lumisafe é uma aplicação web que tem como objetivo melhorar a segurança nas ruas, oferecendo mais liberdade e voz às comunidades. Através de um mapa interativo, usuários podem reportar problemas de iluminação pública, criando uma ponte entre a população e as autoridades responsáveis.
> Projeto A3 - Modelos, Métodos e Técnicas da Engenharia de Software
> FPB - 2025.2

## ✨ Principais Funcionalidades

- 📍 **Denúncias com Fotos e Marcadores**: Reporte pontos de luz com defeito ou em bom funcionamento
- 🗺️ **Mapa Interativo**: Visualize todos os marcadores de iluminação da sua região
- 📊 **Acompanhamento em Tempo Real**: Veja atualizações sobre o status das denúncias
- 📜 **Histórico de Ocorrências**: Acesse o histórico completo de reportes
- 🚶 **Registro de Trajetos**: Mapeie ruas inteiras através da geolocalização


## 📚 Documentação

### Requisitos
- [Requisitos Funcionais e Não Funcionais](requisitos-lumisafe.md)
- [Histórias de Usuário](requisitos-lumisafe.md#historias-de-usuario-hu)
- [Casos de Uso](assets/use-cases/casos-de-uso.md)

### Diagramas
- [Diagrama de Classes UML](DiagramaDeClasseUML.drawio.pdf)
- [Arquivo Editável .drawio](DiagramaDeClasseUML.drawio)

## 🛠️ Tecnologias

**Frontend:**
- JavaScript 
- HTML5 / CSS3
- Leaflet.js
- Bootstrap 5.3

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

## 👥 Requisitos de Usuário

### Para Visitantes
- ✅ Visualizar mapa em modo somente leitura
- ✅ Filtrar marcadores por status, data e bairro
- ✅ Buscar marcadores por endereço

### Para Usuários Autenticados
- ✅ Criar denúncias com fotos
- ✅ Editar e remover suas próprias denúncias
- ✅ Registrar trajetos via GPS
- ✅ Sincronização entre dispositivos
- ✅ Sessão persistente

## 🔒 Segurança e Privacidade

- Dados criptografados
- Conformidade com LGPD
- Consentimento expresso para coleta de localização
- Armazenamento seguro de fotos

## 📊 Requisitos Não Funcionais

- ⚡ 99,5% de disponibilidade
- 🚀 Carregamento em até 3 segundos (4G)
- 📱 Design responsivo
- 🌐 Suporte aos principais navegadores
- 🔐 Acesso restrito e criptografado

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, siga estes passos:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 👥 Equipe

- Teófilo da Costa RA - 1362321634
- Flávio Eduardo Nascimento RA - 1362413582
- Miquéias Oliveira RA - 1362219767
- Felipe Maciel RA - 1362419474


**Status:** 🚧 Em desenvolvimento
