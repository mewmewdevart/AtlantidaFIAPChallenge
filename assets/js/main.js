// Interatividade do Menu Expansivo
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');

    if (nav) {
        nav.addEventListener('click', () => {
            nav.classList.toggle('expanded');
        });

        // Fechar se clicar fora do menu
        document.addEventListener('click', (event) => {
            if (!nav.contains(event.target)) {
                nav.classList.remove('expanded');
            }
        });
    }
});
