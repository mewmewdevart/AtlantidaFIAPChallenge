/* Troca de idioma das seções "O Mundo" e "Habitantes".

   Como funciona (o i18n.js da equipe só avisa que o idioma mudou: evento app:language-changed):
   1. Textos do index.html: o português fica escrito normalmente na tag e a versão em Atlante vai
      no atributo data-atl.   <p data-atl="Kay willakuy">Esta história</p>
      Também existem data-atl-alt (texto da imagem), data-atl-placeholder e data-atl-aria-label.
   2. Textos montados por JavaScript (mapa, crachás, indicadores, Chasqui): vêm de
      dados-mundo-habitantes.js, onde cada campo tem o par  campo / campo_atl.
      Os scripts usam IDIOMA.t(objeto, "campo") e se redesenham quando o idioma muda. */

(function () {
  "use strict";

  // O main.js da equipe marca o idioma em <body data-lang="atlantida"> antes de chamar o i18n
  const ehAtlante = () => document.body.getAttribute("data-lang") === "atlantida";

  const rotulos = () => (window.DADOS_MUNDO_HABITANTES || {}).rotulos || {};

  window.IDIOMA = {
    ehAtlante,

    // Texto de um campo que tem versão em Atlante:  t(lugar, "nome")  ->  lugar.nome ou lugar.nome_atl
    t(objeto, campo) {
      return (ehAtlante() && objeto[campo + "_atl"]) || objeto[campo];
    },

    // Lista de textos (ex.: passos, "fazer"): usa a lista em Atlante só se ela existir
    lista(objeto, campo) {
      const atl = ehAtlante() ? objeto[campo + "_atl"] : null;
      return atl && atl.length ? atl : objeto[campo];
    },

    // Rótulo curto de interface (botões, títulos de bloco): vem de `rotulos` nos dados
    rotulo(chave) {
      const r = rotulos()[chave];
      if (!r) return chave;
      return (ehAtlante() && r.atl) || r.pt;
    },

    // Troca os textos fixos do HTML marcados com data-atl
    aplicarEstatico(raiz = document) {
      const atl = ehAtlante();

      raiz.querySelectorAll("[data-atl]").forEach((el) => {
        if (el.dataset.pt === undefined) el.dataset.pt = el.textContent;   // guarda o português
        el.textContent = atl ? el.dataset.atl : el.dataset.pt;
      });

      ["alt", "placeholder", "aria-label"].forEach((atributo) => {
        raiz.querySelectorAll(`[data-atl-${atributo}]`).forEach((el) => {
          const guardado = `data-pt-${atributo}`;
          if (!el.hasAttribute(guardado)) el.setAttribute(guardado, el.getAttribute(atributo) || "");
          el.setAttribute(atributo, atl ? el.getAttribute(`data-atl-${atributo}`) : el.getAttribute(guardado));
        });
      });
    }
  };

  // O i18n.js da equipe avisa com este evento quando termina de trocar o idioma.
  // Aqui trocamos os textos data-atl e avisamos os scripts das seções (secao-mundo.js e secao-habitantes.js).
  window.addEventListener("app:language-changed", () => {
    window.IDIOMA.aplicarEstatico();
    document.dispatchEvent(new CustomEvent("idioma:alterado"));
  });
})();
