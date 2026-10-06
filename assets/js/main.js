// Interatividade do Menu Expansivo e Switch de Idiomas
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const langSwitch = document.getElementById('langSwitch');
    const langPt = document.querySelector('.lang-text.lang-pt');
    const langAsteca = document.querySelector('.lang-text.lang-asteca');

    if (nav) {
        nav.addEventListener('click', (event) => {
            // Se clicar dentro do wrapper do switch de idioma, previne que o menu feche
            if (event.target.closest('.lang-switch-wrapper')) {
                event.stopPropagation();
                return;
            }
            nav.classList.toggle('expanded');
        });

        // Fechar se clicar fora do menu
        document.addEventListener('click', (event) => {
            if (!nav.contains(event.target)) {
                nav.classList.remove('expanded');
            }
        });
    }

    // Lógica do Switch de Idiomas via JSON (i18n)
    if (langSwitch) {
        langSwitch.addEventListener('change', () => {
            if (langSwitch.checked) {
                langPt?.classList.remove('active');
                langAsteca?.classList.add('active');
                document.body.setAttribute('data-lang', 'asteca');
                window.i18n?.changeLanguage('ptBrAtlantida');
            } else {
                langAsteca?.classList.remove('active');
                langPt?.classList.add('active');
                document.body.setAttribute('data-lang', 'pt-br');
                window.i18n?.changeLanguage('ptBr');
            }
        });
    }
});
