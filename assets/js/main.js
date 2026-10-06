document.addEventListener('DOMContentLoaded', () => {
    const menuNavegacao = document.getElementById('menuNavegacao');
    const seletorIdiomaSwitch = document.getElementById('seletorIdiomaSwitch');
    const rotuloPt = document.querySelector('.seletor-idioma__rotulo--pt');
    const rotuloAsteca = document.querySelector('.seletor-idioma__rotulo--asteca');

    if (menuNavegacao) {
        menuNavegacao.addEventListener('click', (event) => {
            if (event.target.closest('.seletor-idioma')) {
                event.stopPropagation();
                return;
            }
            menuNavegacao.classList.toggle('menu-navegacao--expandido');
        });

        document.addEventListener('click', (event) => {
            if (!menuNavegacao.contains(event.target)) {
                menuNavegacao.classList.remove('menu-navegacao--expandido');
            }
        });
    }

    if (seletorIdiomaSwitch) {
        seletorIdiomaSwitch.addEventListener('change', () => {
            if (seletorIdiomaSwitch.checked) {
                rotuloPt?.classList.remove('seletor-idioma__rotulo--ativo');
                rotuloAsteca?.classList.add('seletor-idioma__rotulo--ativo');
                document.body.setAttribute('data-lang', 'asteca');
                window.i18n?.changeLanguage('ptBrAtlantida');
            } else {
                rotuloAsteca?.classList.remove('seletor-idioma__rotulo--ativo');
                rotuloPt?.classList.add('seletor-idioma__rotulo--ativo');
                document.body.setAttribute('data-lang', 'pt-br');
                window.i18n?.changeLanguage('ptBr');
            }
        });
    }
});
