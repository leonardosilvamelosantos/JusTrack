// Função para abrir ou fechar a aba de cadastro
function toggleCadastro() {
    console.log("Função toggleCadastro chamada!");

    const cadastroSection = document.getElementById('cadastro');
    if (cadastroSection) {
        cadastroSection.classList.toggle('hidden'); // Alterna a visibilidade da seção de cadastro
        if (cadastroSection.classList.contains('hidden')) {
            console.log("Seção de cadastro oculta");
        } else {
            console.log("Seção de cadastro visível");
        }
    } else {
        console.log("Elemento 'cadastro' não encontrado!");
    }
}

// Função para mostrar ou ocultar o formulário de cadastro após selecionar um tribunal
function showCadastroFields() {
    const tribunalSelect = document.getElementById('tribunal-select');
    const cadastroForm = document.getElementById('cadastro-form');
    
    // Verifica se um tribunal foi selecionado
    if (tribunalSelect.value) {
        cadastroForm.classList.remove('hidden');  // Mostra o formulário
    } else {
        cadastroForm.classList.add('hidden');  // Oculta o formulário se nada for selecionado
    }
}

// Função para simular o envio do formulário
function submitCadastroForm(event) {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário

    const processoPdf = document.getElementById('processo-pdf').files[0];
    const tribunalNome = document.getElementById('tribunal-nome').value;
    const numeroProcesso = document.getElementById('numero-processo').value;
    const nomeCliente = document.getElementById('nome-cliente').value;
    const whatsappCliente = document.getElementById('whatsapp-cliente').value;

    // Exemplo de como você pode tratar os dados
    console.log('Processo PDF:', processoPdf);
    console.log('Tribunal Nome:', tribunalNome);
    console.log('Número do Processo:', numeroProcesso);
    console.log('Nome do Cliente:', nomeCliente);
    console.log('WhatsApp do Cliente:', whatsappCliente);

    // Exemplo de feedback para o usuário
    alert('Processo cadastrado com sucesso!');
}

// Função para alternar entre modo claro e escuro
function toggleDarkMode() {
    const body = document.body;
    const topbar = document.querySelector('.topbar');
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    const buttons = document.querySelectorAll('button');
    const cadastroForm = document.getElementById('cadastro-form');
    const modeIcon = document.getElementById('mode-icon');

    // Alterna a classe 'dark-mode' no body, topbar, sidebar e conteúdo
    body.classList.toggle('dark-mode');
    topbar.classList.toggle('dark-mode');
    sidebar.classList.toggle('dark-mode');
    content.classList.toggle('dark-mode');
    buttons.forEach(button => button.classList.toggle('dark-mode'));
    if (cadastroForm) cadastroForm.classList.toggle('dark-mode');

    // Alterna o ícone e o texto do botão
    if (body.classList.contains('dark-mode')) {
        modeIcon.textContent = '☀️'; // Sol no modo escuro
    } else {
        modeIcon.textContent = '🌙'; // Lua no modo claro
    }
}

// Associar o evento de clique ao botão de cadastro
document.addEventListener('DOMContentLoaded', () => {
    const cadastroBtn = document.getElementById('cadastro-btn');
    if (cadastroBtn) {
        cadastroBtn.addEventListener('click', toggleCadastro); // Ativa a função toggleCadastro no clique
    } else {
        console.log("Botão 'cadastro-btn' não encontrado!");
    }

    const tribunalSelect = document.getElementById('tribunal-select');
    if (tribunalSelect) {
        tribunalSelect.addEventListener('change', showCadastroFields); // Ativa a função showCadastroFields no evento 'change'
    } else {
        console.log("Elemento 'tribunal-select' não encontrado!");
    }

    const cadastroForm = document.getElementById('cadastro-form');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', submitCadastroForm); // Ativa o envio do formulário
    } else {
        console.log("Formulário 'cadastro-form' não encontrado!");
    }

    // Adicionar o evento de clique no botão de alternância de modo
    const modeToggle = document.getElementById('mode-toggle');
    if (modeToggle) {
        modeToggle.addEventListener('click', toggleDarkMode); // Ativa a função toggleDarkMode no clique
    } else {
        console.log("Botão de alternância de modo não encontrado!");
    }
});

// Função para abrir ou fechar a barra lateral
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');

sidebarToggle.addEventListener('click', function() {
    sidebar.classList.toggle('visible'); // Alterna a visibilidade da barra lateral
});

// Alternar entre modo claro e escuro
const modeToggle = document.getElementById('mode-toggle');
const modeIcon = document.getElementById('mode-icon');

modeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    modeIcon.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});
