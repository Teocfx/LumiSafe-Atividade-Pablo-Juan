// Dados de exemplo das denúncias
const denuncias = [
    {
        id: 'DEN-001',
        descricao: 'Poste sem iluminação na Rua das Flores',
        status: 'pendente',
        data: '02/11/2024',
        localizacao: 'Rua das Flores, 123',
        lat: -7.1195,
        lng: -34.8450
    },
    {
        id: 'DEN-002',
        descricao: 'Lâmpada queimada na Av. Principal',
        status: 'andamento',
        data: '01/11/2024',
        localizacao: 'Av. Principal, 456',
        lat: -7.1205,
        lng: -34.8460
    },
    {
        id: 'DEN-003',
        descricao: 'Poste danificado após acidente',
        status: 'resolvida',
        data: '31/10/2024',
        localizacao: 'Rua Central, 789',
        lat: -7.1185,
        lng: -34.8440
    },
    {
        id: 'DEN-004',
        descricao: 'Iluminação fraca na praça',
        status: 'pendente',
        data: '02/11/2024',
        localizacao: 'Praça da Paz',
        lat: -7.1215,
        lng: -34.8470
    },
    {
        id: 'DEN-005',
        descricao: 'Cabo solto em poste de iluminação',
        status: 'andamento',
        data: '01/11/2024',
        localizacao: 'Rua do Comércio, 321',
        lat: -7.1175,
        lng: -34.8430
    }
];

// Inicializar o mapa
let map;
let markers = [];

function initMap() {
    // Centralizando em João Pessoa, PB
    map = L.map('map').setView([-7.1195, -34.8450], 13);

    // Adicionar camada do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Adicionar marcadores das denúncias
    addMarkers(denuncias);
}

// Adicionar marcadores no mapa
function addMarkers(denunciasToShow) {
    // Limpar marcadores anteriores
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    denunciasToShow.forEach(denuncia => {
        // Definir cor do marcador baseado no status
        let markerColor = 'red';
        if (denuncia.status === 'andamento') markerColor = 'blue';
        if (denuncia.status === 'resolvida') markerColor = 'green';

        // Criar ícone customizado
        const icon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="background: ${markerColor}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
            iconSize: [30, 30]
        });

        // Adicionar marcador
        const marker = L.marker([denuncia.lat, denuncia.lng], { icon: icon })
            .addTo(map)
            .bindPopup(`
                <div style="padding: 5px;">
                    <strong>${denuncia.id}</strong><br>
                    ${denuncia.descricao}<br>
                    <span style="color: #666; font-size: 12px;">${denuncia.localizacao}</span><br>
                    <span class="status-badge ${denuncia.status}" style="display: inline-block; margin-top: 5px;">${getStatusText(denuncia.status)}</span>
                </div>
            `);

        markers.push(marker);
    });
}

// Renderizar lista de denúncias
function renderDenuncias(denunciasToShow) {
    const listaDenuncias = document.getElementById('listaDenuncias');
    
    if (denunciasToShow.length === 0) {
        listaDenuncias.innerHTML = '<p style="text-align: center; color: #9ca3af; padding: 20px;">Nenhuma denúncia encontrada</p>';
        return;
    }

    listaDenuncias.innerHTML = denunciasToShow.map(denuncia => `
        <div class="denuncia-item" onclick="focusMarker(${denuncia.lat}, ${denuncia.lng})">
            <div class="denuncia-header">
                <span class="denuncia-id">${denuncia.id}</span>
                <span class="status-badge ${denuncia.status}">${getStatusText(denuncia.status)}</span>
            </div>
            <p class="denuncia-desc">${denuncia.descricao}</p>
            <div class="denuncia-footer">
                <span>📍 ${denuncia.localizacao}</span>
                <span>📅 ${denuncia.data}</span>
            </div>
        </div>
    `).join('');
}

// Focar no marcador ao clicar na lista
function focusMarker(lat, lng) {
    map.setView([lat, lng], 15);
    // Abrir popup do marcador correspondente
    markers.forEach(marker => {
        const markerLatLng = marker.getLatLng();
        if (markerLatLng.lat === lat && markerLatLng.lng === lng) {
            marker.openPopup();
        }
    });
}

// Obter texto do status
function getStatusText(status) {
    const statusMap = {
        'pendente': 'Pendente',
        'andamento': 'Em Andamento',
        'resolvida': 'Resolvida'
    };
    return statusMap[status] || status;
}

// Atualizar estatísticas
function updateStats() {
    const pendentes = denuncias.filter(d => d.status === 'pendente').length;
    const andamento = denuncias.filter(d => d.status === 'andamento').length;
    const resolvidas = denuncias.filter(d => d.status === 'resolvida').length;
    const total = denuncias.length;

    document.getElementById('statPendentes').textContent = pendentes;
    document.getElementById('statAndamento').textContent = andamento;
    document.getElementById('statResolvidas').textContent = resolvidas;
    document.getElementById('statTotal').textContent = total;
}

// Filtrar denúncias
function filterDenuncias(filter) {
    let filtered = denuncias;
    
    if (filter !== 'todas') {
        filtered = denuncias.filter(d => d.status === filter);
    }
    
    renderDenuncias(filtered);
    addMarkers(filtered);
}

// Event listeners para os filtros
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar mapa
    initMap();
    
    // Renderizar denúncias
    renderDenuncias(denuncias);
    
    // Atualizar estatísticas
    updateStats();
    
    // Filtros
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover active de todos
            filterButtons.forEach(b => b.classList.remove('active'));
            // Adicionar active no clicado
            this.classList.add('active');
            
            // Filtrar
            const filter = this.getAttribute('data-filter');
            filterDenuncias(filter);
        });
    });
    
    // Botão nova denúncia
    document.getElementById('btnNovaDenuncia').addEventListener('click', function() {
        alert('🚀 Redirecionando para o formulário de nova denúncia...');
        // window.location.href = 'nova-denuncia.html';
    });
    
    // Links da sidebar
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                alert('Navegando para: ' + this.textContent.trim());
            }
        });
    });
});