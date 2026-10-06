/**
 * Script Principal - Interações da Interface (Menu e Alternância de Idioma)
 */

document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos do menu de navegação e seletor de idioma
    const menuNavegacao = document.getElementById('menuNavegacao');
    const seletorIdiomaSwitch = document.getElementById('seletorIdiomaSwitch');
    const rotuloPt = document.querySelector('.seletor-idioma__rotulo--pt');
    const rotuloAtlantida = document.querySelector('.seletor-idioma__rotulo--atlantida') || document.querySelector('.seletor-idioma__rotulo--asteca');

    // 1. Controle de Expansão/Fechamento do Menu Flutuante
    if (menuNavegacao) {
        menuNavegacao.addEventListener('click', (evento) => {
            // Evita fechar/alternar ao interagir diretamente com o switch de idiomas
            if (evento.target.closest('.seletor-idioma')) {
                evento.stopPropagation();
                return;
            }
            menuNavegacao.classList.toggle('menu-navegacao--expandido');
        });

        // Fecha o menu caso o usuário clique em qualquer área externa
        document.addEventListener('click', (evento) => {
            if (!menuNavegacao.contains(evento.target)) {
                menuNavegacao.classList.remove('menu-navegacao--expandido');
            }
        });
    }

    // 2. Alternância Dinâmica de Idioma (Português <-> Atlântida)
    if (seletorIdiomaSwitch) {
        seletorIdiomaSwitch.addEventListener('change', () => {
            if (seletorIdiomaSwitch.checked) {
                // Modo Atlântida Ativado
                rotuloPt?.classList.remove('seletor-idioma__rotulo--ativo');
                rotuloAtlantida?.classList.add('seletor-idioma__rotulo--ativo');
                document.body.setAttribute('data-lang', 'atlantida');
                window.i18n?.changeLanguage('ptBrAtlantida');
            } else {
                // Modo Português Ativado
                rotuloAtlantida?.classList.remove('seletor-idioma__rotulo--ativo');
                rotuloPt?.classList.add('seletor-idioma__rotulo--ativo');
                document.body.setAttribute('data-lang', 'pt-br');
                window.i18n?.changeLanguage('ptBr');
            }
        });
    }
});
