// Variáveis globais
let map;
let marker;
let selectedLocation = null;
let uploadedFiles = [];

// Inicializar mapa
function initMap() {
    // Centralizando em João Pessoa, PB
    map = L.map('map').setView([-7.1195, -34.8450], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Adicionar marcador ao clicar no mapa
    map.on('click', function(e) {
        setMarker(e.latlng);
    });
}

// Definir marcador no mapa
function setMarker(latlng) {
    // Remover marcador anterior se existir
    if (marker) {
        map.removeLayer(marker);
    }

    // Adicionar novo marcador
    marker = L.marker([latlng.lat, latlng.lng]).addTo(map);
    
    // Salvar localização
    selectedLocation = {
        lat: latlng.lat.toFixed(6),
        lng: latlng.lng.toFixed(6)
    };

    // Atualizar display de coordenadas
    document.getElementById('coordsText').textContent = 
        `${selectedLocation.lat}, ${selectedLocation.lng}`;
}

// Usar localização do usuário
document.getElementById('btnUseLocation').addEventListener('click', function() {
    if (navigator.geolocation) {
        this.textContent = '📍 Obtendo localização...';
        this.disabled = true;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latlng = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                // Centralizar mapa e adicionar marcador
                map.setView([latlng.lat, latlng.lng], 16);
                setMarker(latlng);
                
                this.textContent = '✓ Localização obtida';
                setTimeout(() => {
                    this.textContent = '📍 Usar minha localização';
                    this.disabled = false;
                }, 2000);
            },
            (error) => {
                alert('❌ Não foi possível obter sua localização. Por favor, marque no mapa.');
                this.textContent = '📍 Usar minha localização';
                this.disabled = false;
            }
        );
    } else {
        alert('❌ Seu navegador não suporta geolocalização.');
    }
});

// Validações do formulário
const tituloInput = document.getElementById('titulo');
const descricaoInput = document.getElementById('descricao');
const enderecoInput = document.getElementById('endereco');

// Validar título
tituloInput.addEventListener('blur', function() {
    if (tituloInput.value.trim().length < 5) {
        tituloInput.classList.add('error');
        document.getElementById('tituloError').classList.add('show');
    } else {
        tituloInput.classList.remove('error');
        tituloInput.classList.add('success');
        document.getElementById('tituloError').classList.remove('show');
    }
});

tituloInput.addEventListener('input', function() {
    if (tituloInput.classList.contains('error')) {
        tituloInput.classList.remove('error');
        document.getElementById('tituloError').classList.remove('show');
    }
});

// Validar e contar caracteres da descrição
descricaoInput.addEventListener('input', function() {
    const length = descricaoInput.value.length;
    document.getElementById('charCounter').textContent = `${length} / 500 caracteres`;
    
    if (length > 0 && length < 20) {
        descricaoInput.classList.add('error');
        document.getElementById('descricaoError').classList.add('show');
    } else if (length >= 20) {
        descricaoInput.classList.remove('error');
        descricaoInput.classList.add('success');
        document.getElementById('descricaoError').classList.remove('show');
    }
});

// Upload de fotos
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');

// Click para selecionar arquivo
uploadArea.addEventListener('click', () => fileInput.click());

// Drag and drop
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
});

// Selecionar arquivos
fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

// Processar arquivos
function handleFiles(files) {
    Array.from(files).forEach(file => {
        // Validar tipo e tamanho
        if (!file.type.startsWith('image/')) {
            alert('❌ Por favor, selecione apenas imagens.');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('❌ A imagem deve ter no máximo 5MB.');
            return;
        }

        // Adicionar à lista
        uploadedFiles.push(file);

        // Criar preview
        const reader = new FileReader();
        reader.onload = (e) => {
            const previewDiv = document.createElement('div');
            previewDiv.className = 'preview-item';
            previewDiv.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <button class="preview-remove" onclick="removeImage(${uploadedFiles.length - 1})">×</button>
            `;
            previewContainer.appendChild(previewDiv);
        };
        reader.readAsDataURL(file);
    });
}

// Remover imagem
function removeImage(index) {
    uploadedFiles.splice(index, 1);
    previewContainer.children[index].remove();
}

// Envio do formulário
document.getElementById('denunciaForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let isValid = true;

    // Validar título
    if (tituloInput.value.trim().length < 5) {
        tituloInput.classList.add('error');
        document.getElementById('tituloError').classList.add('show');
        isValid = false;
    }

    // Validar descrição
    if (descricaoInput.value.trim().length < 20) {
        descricaoInput.classList.add('error');
        document.getElementById('descricaoError').classList.add('show');
        isValid = false;
    }

    // Validar tipo
    const tipoSelect = document.getElementById('tipo');
    if (!tipoSelect.value) {
        alert('⚠️ Por favor, selecione o tipo de problema.');
        isValid = false;
    }

    // Validar endereço
    if (enderecoInput.value.trim().length < 5) {
        alert('⚠️ Por favor, informe o endereço completo.');
        isValid = false;
    }

    // Validar localização
    if (!selectedLocation) {
        alert('⚠️ Por favor, marque a localização no mapa.');
        isValid = false;
    }

    // Validar urgência
    const urgenciaSelected = document.querySelector('input[name="urgencia"]:checked');
    if (!urgenciaSelected) {
        alert('⚠️ Por favor, selecione o nível de urgência.');
        isValid = false;
    }

    if (isValid) {
        // Coletar dados
        const formData = {
            titulo: tituloInput.value,
            descricao: descricaoInput.value,
            tipo: tipoSelect.value,
            endereco: enderecoInput.value,
            localizacao: selectedLocation,
            urgencia: urgenciaSelected.value,
            fotos: uploadedFiles.length,
            data: new Date().toLocaleDateString('pt-BR')
        };

        console.log('Dados da denúncia:', formData);

        // Simular envio
        alert(`✅ Denúncia enviada com sucesso!

📝 Título: ${formData.titulo}
📍 Local: ${formData.endereco}
⚡ Urgência: ${formData.urgencia}
📸 Fotos: ${formData.fotos}

Você será redirecionado para suas denúncias.`);

        // Redirecionar (descomente para usar)
        // window.location.href = 'minhas-denuncias.html';
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    initMap();

    // Links da sidebar
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                alert('Navegando para: ' + this.textContent.trim());
            }
        });
    });
});