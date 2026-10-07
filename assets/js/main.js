/**
 * Script Principal - Interações da Interface (Menu e Alternância de Idioma)
 */

document.addEventListener("DOMContentLoaded", () => {
  const menuNavegacao = document.getElementById("menuNavegacao");
  const seletorIdiomaSwitch = document.getElementById("seletorIdiomaSwitch");
  const rotuloPt = document.querySelector(".seletor-idioma__rotulo--pt");
  const rotuloAtlantida = document.querySelector(".seletor-idioma__rotulo--atlantida") || document.querySelector(".seletor-idioma__rotulo--asteca");

  if (menuNavegacao) {
    menuNavegacao.addEventListener("click", (evento) => {
      if (evento.target.closest(".seletor-idioma")) {
        evento.stopPropagation();
        return;
      }
      menuNavegacao.classList.toggle("menu-navegacao--expandido");
    });

    document.addEventListener("click", (evento) => {
      if (!menuNavegacao.contains(evento.target)) {
        menuNavegacao.classList.remove("menu-navegacao--expandido");
      }
    });
  }

  if (seletorIdiomaSwitch) {
    seletorIdiomaSwitch.addEventListener("change", () => {
      if (seletorIdiomaSwitch.checked) {
        rotuloPt?.classList.remove("seletor-idioma__rotulo--ativo");
        rotuloAtlantida?.classList.add("seletor-idioma__rotulo--ativo");
        document.body.setAttribute("data-lang", "atlantida");
        window.i18n?.changeLanguage("ptBrAtlantida");
      } else {
        rotuloAtlantida?.classList.remove("seletor-idioma__rotulo--ativo");
        rotuloPt?.classList.add("seletor-idioma__rotulo--ativo");
        document.body.setAttribute("data-lang", "pt-br");
        window.i18n?.changeLanguage("ptBr");
      }
    });
  }
});
