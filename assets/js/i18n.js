/* Troca o idioma do site (português <-> Atlante).
   Os textos ficam em assets/lang/dicionarios.js (window.I18N_DICIONARIOS), carregado antes deste arquivo.
   Cada elemento com data-i18n="chave" recebe o texto da chave no idioma escolhido. */

// Código de idioma que o navegador e os leitores de tela recebem em <html lang="...">.
// "qu-x-atlante" = quéchua (a gramática do Atlante) + uso privado "atlante", pois o Atlante é inventado.
const CODIGO_LANG = {
  ptBr: "pt-BR",
  ptBrAtlantida: "qu-x-atlante"
};

const i18n = {
  dictionaries: window.I18N_DICIONARIOS || {},

  // Mantido por compatibilidade (o main.js chama este nome): devolve o dicionário do idioma ou o português
  getFallbackDictionary(lang) {
    return this.dictionaries[lang] || this.dictionaries.ptBr || {};
  },

  async loadDictionary(lang) {
    return this.getFallbackDictionary(lang);
  },

  async changeLanguage(lang) {
    if (!this.dictionaries[lang]) {
      console.warn(`Idioma "${lang}" não existe em assets/lang/dicionarios.js; mantendo o atual.`);
      return;
    }
    const dict = this.dictionaries[lang];

    document.documentElement.lang = CODIGO_LANG[lang] || "pt-BR";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      } else {
        console.warn(`Chave de idioma sem texto em "${lang}": ${key}`);
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] !== undefined) {
        el.setAttribute("placeholder", dict[key]);
      }
    });

    window.dispatchEvent(new CustomEvent("app:language-changed", { detail: { lang } }));
  }
};

window.i18n = i18n;
