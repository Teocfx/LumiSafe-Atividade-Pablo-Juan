// Seleção dos elementos do formulário
const form = document.getElementById('cadastroForm');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const confirmarSenhaInput = document.getElementById('confirmarSenha');
const termosCheckbox = document.getElementById('termos');

// Seleção das mensagens de erro
const nomeError = document.getElementById('nomeError');
const emailError = document.getElementById('emailError');
const senhaError = document.getElementById('senhaError');
const confirmarSenhaError = document.getElementById('confirmarSenhaError');

// Elementos da barra de força da senha
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

// Função para validar nome
function validarNome() {
    const nome = nomeInput.value.trim();
    const formGroup = nomeInput.closest('.form-group');
    
    if (nome.length < 3) {
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
        return false;
    } else {
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
        return true;
    }
}

// Função para validar e-mail
function validarEmail() {
    const email = emailInput.value.trim();
    const formGroup = emailInput.closest('.form-group');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
        return false;
    } else {
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
        return true;
    }
}

// Função para calcular força da senha
function calcularForcaSenha(senha) {
    let forca = 0;
    
    if (senha.length >= 6) forca += 1;
    if (senha.length >= 10) forca += 1;
    if (/[a-z]/.test(senha) && /[A-Z]/.test(senha)) forca += 1;
    if (/\d/.test(senha)) forca += 1;
    if (/[^a-zA-Z0-9]/.test(senha)) forca += 1;
    
    return forca;
}

// Função para atualizar visualização da força da senha
function atualizarForcaSenha() {
    const senha = senhaInput.value;
    const forca = calcularForcaSenha(senha);
    
    // Remove classes anteriores
    strengthBar.className = 'strength-bar';
    
    if (senha.length === 0) {
        strengthBar.style.width = '0%';
        strengthText.textContent = '';
        return;
    }
    
    if (forca <= 2) {
        strengthBar.classList.add('weak');
        strengthBar.style.width = '33%';
        strengthText.textContent = 'Senha fraca';
        strengthText.style.color = '#ff4444';
    } else if (forca <= 3) {
        strengthBar.classList.add('medium');
        strengthBar.style.width = '66%';
        strengthText.textContent = 'Senha média';
        strengthText.style.color = '#ffa500';
    } else {
        strengthBar.classList.add('strong');
        strengthBar.style.width = '100%';
        strengthText.textContent = 'Senha forte';
        strengthText.style.color = '#00c851';
    }
}

// Função para validar senha
function validarSenha() {
    const senha = senhaInput.value;
    const formGroup = senhaInput.closest('.form-group');
    
    if (senha.length < 6) {
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
        return false;
    } else {
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
        return true;
    }
}

// Função para validar confirmação de senha
function validarConfirmarSenha() {
    const senha = senhaInput.value;
    const confirmarSenha = confirmarSenhaInput.value;
    const formGroup = confirmarSenhaInput.closest('.form-group');
    
    if (senha !== confirmarSenha || confirmarSenha.length === 0) {
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
        return false;
    } else {
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
        return true;
    }
}

// Event Listeners para validação em tempo real
nomeInput.addEventListener('blur', validarNome);
nomeInput.addEventListener('input', () => {
    if (nomeInput.closest('.form-group').classList.contains('error')) {
        validarNome();
    }
});

emailInput.addEventListener('blur', validarEmail);
emailInput.addEventListener('input', () => {
    if (emailInput.closest('.form-group').classList.contains('error')) {
        validarEmail();
    }
});

senhaInput.addEventListener('input', () => {
    atualizarForcaSenha();
    validarSenha();
    // Revalidar confirmação se já foi preenchida
    if (confirmarSenhaInput.value.length > 0) {
        validarConfirmarSenha();
    }
});

senhaInput.addEventListener('blur', validarSenha);

confirmarSenhaInput.addEventListener('input', validarConfirmarSenha);
confirmarSenhaInput.addEventListener('blur', validarConfirmarSenha);

// Submissão do formulário
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validar todos os campos
    const nomeValido = validarNome();
    const emailValido = validarEmail();
    const senhaValida = validarSenha();
    const confirmarSenhaValida = validarConfirmarSenha();
    const termosAceitos = termosCheckbox.checked;
    
    if (!termosAceitos) {
        alert('Por favor, aceite os termos de uso e política de privacidade.');
        return;
    }
    
    // Se todos os campos forem válidos
    if (nomeValido && emailValido && senhaValida && confirmarSenhaValida) {
        // Coletar dados do formulário
        const dadosCadastro = {
            nome: nomeInput.value.trim(),
            email: emailInput.value.trim(),
            senha: senhaInput.value
        };
        
        // Simulação de cadastro (aqui você faria a chamada para sua API)
        console.log('Dados de cadastro:', dadosCadastro);
        
        // Feedback visual
        const button = form.querySelector('button[type="submit"]');
        const textoOriginal = button.textContent;
        button.textContent = 'CADASTRANDO...';
        button.disabled = true;
        
        // Simular delay de requisição
        setTimeout(() => {
            alert('Cadastro realizado com sucesso!');
            // Redirecionar para página de login
            window.location.href = 'login.html';
        }, 1500);
    } else {
        // Focar no primeiro campo com erro
        if (!nomeValido) {
            nomeInput.focus();
        } else if (!emailValido) {
            emailInput.focus();
        } else if (!senhaValida) {
            senhaInput.focus();
        } else if (!confirmarSenhaValida) {
            confirmarSenhaInput.focus();
        }
    }
});