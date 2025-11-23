// Dados de exemplo das denúncias do usuário
const minhasDenuncias = [
    {
        id: 'DEN-001',
        titulo: 'Poste sem iluminação na Rua das Flores',
        descricao: 'O poste localizado em frente ao número 123 está completamente sem iluminação há mais de uma semana. A rua fica muito escura à noite, comprometendo a segurança dos moradores.',
        tipo: 'sem-iluminacao',
        status: 'pendente',
        urgencia: 'alta',
        data: '02/11/2024',
        endereco: 'Rua das Flores, 123 - Centro',
        coordenadas: '-7.1195, -34.8450',
        fotos: 2
    },
    {
        id: 'DEN-002',
        titulo: 'Lâmpada queimada na Av. Principal',
        descricao: 'Lâmpada queimada no poste em frente à farmácia. O local fica escuro durante a noite.',
        tipo: 'lampada-queimada',
        status: 'andamento',
        urgencia: 'media',
        data: '01/11/2024',
        endereco: 'Av. Principal, 456 - Bairro Novo',
        coordenadas: '-7.1205, -34.8460',
        fotos: 1,
        atualizacao: 'Equipe enviada para avaliação - 02/11/2024'
    },
    {
        id: 'DEN-003',
        titulo: 'Poste danificado após acidente',
        descricao: 'Poste foi atingido por veículo e está inclinado, com risco de queda. Fiação aparente.',
        tipo: 'poste-danificado',
        status: 'resolvida',
        urgencia: 'alta',
        data: '28/10/2024',
        endereco: 'Rua Central, 789 - Jardim',
        coordenadas: '-7.1185, -34.8440',
        fotos: 3,
        resolucao: 'Poste substituído - 31/10/2024'
    },
    {
        id: 'DEN-004',
        titulo: 'Iluminação fraca na praça',
        descricao: 'A praça do bairro está com iluminação muito fraca, dificultando o uso no período noturno.',
        tipo: 'iluminacao-fraca',
        status: 'pendente',
        urgencia: 'baixa',
        data: '30/10/2024',
        endereco: 'Praça da Paz - Bairro Jardim',
        coordenadas: '-7.1215, -34.8470',
        fotos: 0
    },
    {
        id: 'DEN-005',
        titulo: 'Cabo solto em poste',
        descricao: 'Cabo de iluminação solto, balançando com o vento. Pode causar curto-circuito.',
        tipo: 'fiacao-exposta',
        status: 'andamento',
        urgencia: 'alta',
        data: '29/10/2024',
        endereco: 'Rua do Comércio, 321 - Centro',
        coordenadas: '-7.1175, -34.8430',
        fotos: 2,
        atualizacao: 'Agendado reparo para 04/11/2024'
    },
    {
        id: 'DEN-006',
        titulo: 'Lâmpada piscando',
        descricao: 'Lâmpada piscando constantemente, pode queimar a qualquer momento.',
        tipo: 'lampada-queimada',
        status: 'resolvida',
        urgencia: 'media',
        data: '25/10/2024',
        endereco: 'Rua dos Pássaros, 88',
        coordenadas: '-7.1165, -34.8420',
        fotos: 1,
        resolucao: 'Lâmpada substituída - 27/10/2024'
    },
    {
        id: 'DEN-007',
        titulo: 'Poste sem tampa',
        descricao: 'Poste sem a tampa de proteção, expondo a fiação interna.',
        tipo: 'poste-danificado',
        status: 'resolvida',
        urgencia: 'media',
        data: '20/10/2024',
        endereco: 'Av. dos Estados, 1200',
        coordenadas: '-7.1225, -34.8480',
        fotos: 1,
        resolucao: 'Tampa instalada - 23/10/2024'
    }
];

let filteredDenuncias = [...minhasDenuncias];

// Renderizar denúncias
function renderDenuncias(denuncias) {
    const container = document.getElementById('denunciasContainer');
    const emptyState = document.getElementById('emptyState');

    if (denuncias.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    container.style.display = 'grid';
    emptyState.style.display = 'none';

    container.innerHTML = denuncias.map(denuncia => `
        <div class="denuncia-card" onclick="openModal('${denuncia.id}')">
            <div class="urgencia-indicator ${denuncia.urgencia}"></div>
            
            <div class="card-content">
                <div class="card-header">
                    <span class="denuncia-id">${denuncia.id}</span>
                    <span class="denuncia-data">📅 ${denuncia.data}</span>
                </div>
                
                <h3 class="denuncia-title">${denuncia.titulo}</h3>
                <p class="denuncia-desc">${denuncia.descricao.substring(0, 100)}${denuncia.descricao.length > 100 ? '...' : ''}</p>
                
                <div class="card-footer">
                    <span class="card-info">📍 ${denuncia.endereco}</span>
                    <span class="card-info">📸 ${denuncia.fotos} foto${denuncia.fotos !== 1 ? 's' : ''}</span>
                    <span class="card-info">⚡ ${getUrgenciaText(denuncia.urgencia)}</span>
                </div>
            </div>
            
            <div class="card-actions">
                <span class="status-badge ${denuncia.status}">${getStatusText(denuncia.status)}</span>
                <button class="btn-details" onclick="event.stopPropagation(); openModal('${denuncia.id}')">
                    Ver detalhes →
                </button>
            </div>
        </div>
    `).join('');
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

// Obter texto da urgência
function getUrgenciaText(urgencia) {
    const urgenciaMap = {
        'baixa': 'Baixa',
        'media': 'Média',
        'alta': 'Alta'
    };
    return urgenciaMap[urgencia] || urgencia;
}

// Atualizar estatísticas
function updateStats() {
    const pendentes = minhasDenuncias.filter(d => d.status === 'pendente').length;
    const andamento = minhasDenuncias.filter(d => d.status === 'andamento').length;
    const resolvidas = minhasDenuncias.filter(d => d.status === 'resolvida').length;

    document.getElementById('totalPendentes').textContent = pendentes;
    document.getElementById('totalAndamento').textContent = andamento;
    document.getElementById('totalResolvidas').textContent = resolvidas;
}

// Filtrar denúncias
function filterDenuncias(filter) {
    if (filter === 'todas') {
        filteredDenuncias = [...minhasDenuncias];
    } else {
        filteredDenuncias = minhasDenuncias.filter(d => d.status === filter);
    }
    applySort();
}

// Buscar denúncias
function searchDenuncias(query) {
    const searchTerm = query.toLowerCase();
    filteredDenuncias = minhasDenuncias.filter(d => 
        d.titulo.toLowerCase().includes(searchTerm) ||
        d.id.toLowerCase().includes(searchTerm) ||
        d.descricao.toLowerCase().includes(searchTerm) ||
        d.endereco.toLowerCase().includes(searchTerm)
    );
    renderDenuncias(filteredDenuncias);
}

// Ordenar denúncias
function applySort() {
    const sortValue = document.getElementById('sortSelect').value;
    
    if (sortValue === 'recente') {
        filteredDenuncias.sort((a, b) => {
            const dateA = a.data.split('/').reverse().join('');
            const dateB = b.data.split('/').reverse().join('');
            return dateB.localeCompare(dateA);
        });
    } else if (sortValue === 'antiga') {
        filteredDenuncias.sort((a, b) => {
            const dateA = a.data.split('/').reverse().join('');
            const dateB = b.data.split('/').reverse().join('');
            return dateA.localeCompare(dateB);
        });
    } else if (sortValue === 'urgencia') {
        const urgenciaOrder = { 'alta': 3, 'media': 2, 'baixa': 1 };
        filteredDenuncias.sort((a, b) => urgenciaOrder[b.urgencia] - urgenciaOrder[a.urgencia]);
    }
    
    renderDenuncias(filteredDenuncias);
}

// Abrir modal com detalhes
function openModal(denunciaId) {
    const denuncia = minhasDenuncias.find(d => d.id === denunciaId);
    if (!denuncia) return;

    const modal = document.getElementById('detailsModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div class="detail-section">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <h3 style="font-size: 22px; color: #1f2937; margin: 0;">${denuncia.titulo}</h3>
                <span class="status-badge ${denuncia.status}">${getStatusText(denuncia.status)}</span>
            </div>
            <p style="color: #667eea; font-weight: 600; font-size: 14px;">${denuncia.id}</p>
        </div>

        <div class="detail-section">
            <h3>📝 Descrição</h3>
            <p>${denuncia.descricao}</p>
        </div>

        <div class="detail-grid">
            <div class="detail-item">
                <label>Tipo de Problema</label>
                <p>${denuncia.tipo.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
            </div>
            <div class="detail-item">
                <label>Urgência</label>
                <p>⚡ ${getUrgenciaText(denuncia.urgencia)}</p>
            </div>
            <div class="detail-item">
                <label>Data da Denúncia</label>
                <p>📅 ${denuncia.data}</p>
            </div>
            <div class="detail-item">
                <label>Fotos Anexadas</label>
                <p>📸 ${denuncia.fotos} foto${denuncia.fotos !== 1 ? 's' : ''}</p>
            </div>
        </div>

        <div class="detail-section">
            <h3>📍 Localização</h3>
            <p>${denuncia.endereco}</p>
            <p style="font-size: 13px; color: #9ca3af; margin-top: 5px;">Coordenadas: ${denuncia.coordenadas}</p>
        </div>

        ${denuncia.atualizacao ? `
            <div class="detail-section">
                <h3>🔄 Última Atualização</h3>
                <p style="background: #dbeafe; padding: 12px; border-radius: 8px; color: #1e40af; font-weight: 500;">
                    ${denuncia.atualizacao}
                </p>
            </div>
        ` : ''}

        ${denuncia.resolucao ? `
            <div class="detail-section">
                <h3>✅ Resolução</h3>
                <p style="background: #d1fae5; padding: 12px; border-radius: 8px; color: #065f46; font-weight: 500;">
                    ${denuncia.resolucao}
                </p>
            </div>
        ` : ''}
    `;

    modal.classList.add('show');
}

// Fechar modal
function closeModal() {
    document.getElementById('detailsModal').classList.remove('show');
}

// Fechar modal ao clicar fora
document.getElementById('detailsModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar denúncias
    renderDenuncias(minhasDenuncias);
    
    // Atualizar estatísticas
    updateStats();

    // Event listeners para filtros
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterDenuncias(this.getAttribute('data-filter'));
        });
    });

    // Event listener para busca
    let searchTimeout;
    document.getElementById('searchInput').addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchDenuncias(this.value);
        }, 300);
    });

    // Event listener para ordenação
    document.getElementById('sortSelect').addEventListener('change', applySort);

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