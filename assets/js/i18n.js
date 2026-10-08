/* Gerencia internacionalização carregando dicionários de idioma e fornecendo fallback quando necessário */

const i18n = {
  dictionaries: {},

  async loadDictionary(lang) {
    if (this.dictionaries[lang]) {
      return this.dictionaries[lang];
    }

    try {
      const fileName = lang === "ptBrAtlantida" ? "ptBrAtlantida.json" : "ptBr.json";
      const response = await fetch(`assets/lang/${fileName}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      this.dictionaries[lang] = data;
      return data;
    } catch (error) {
      console.warn(`Não foi possível carregar assets/lang/${lang}.json via fetch, usando fallback interno:`, error);
      return this.getFallbackDictionary(lang);
    }
  },

  getFallbackDictionary(lang) {
    if (lang === "ptBrAtlantida") {
      return {
        "nav.menu": "KALPULLI",
        "nav.lang_pt": "PT-BR",
        "nav.lang_atlantida": "Atlantida",
        "nav_lateral.inicio": "Ipepe",
        "nav_lateral.mundo": "Cemanahuatl",
        "nav_lateral.habitantes": "Macehualtin",
        "nav_lateral.mural": "Tlacuilolli",
        "nav_lateral.contato": "Nahuatilli",
        "hero.cover_title": "ATLÂNTIDA - TLALOC",
        "hero.cover_subtitle": "ARENA TLATOANI — NEXT FIAP",
        "hero.livro_titulo_linha1": "Ixtlamati",
        "hero.livro_titulo_linha2": "Atlântida.",
        "hero.livro_descricao": "Tlazocamati atl altepetl, ximomachti ihuan xitlachia yancuic tlalpan ameyalli.",
        "hero.btn_explorar": "Xitlachia Atlântida",
        "hero.btn_saiba_mais": "Miac tlamatiliztli",
        "footer.copyright": "© 2026 Calpulli Ctrl + People — NEXT FIAP / VR Code Arena."
      };
    }

    return {
      "nav.menu": "MENU",
      "nav.lang_pt": "PT-BR",
      "nav.lang_atlantida": "Atlantida",
      "nav_lateral.inicio": "Início",
      "nav_lateral.mundo": "O Mundo",
      "nav_lateral.habitantes": "Habitantes",
      "nav_lateral.mural": "Mural",
      "nav_lateral.contato": "Contato",
      "hero.cover_title": "ATLÂNTIDA",
      "hero.cover_subtitle": "VR CODE ARENA — NEXT FIAP",
      "hero.livro_titulo_linha1": "Explore",
      "hero.livro_titulo_linha2": "Atlântida.",
      "hero.livro_descricao": "Conecte-se à cidade submarina, descubra seus espaços e explore um novo mundo abaixo da superfície.",
      "hero.btn_explorar": "Explorar Atlântida",
      "hero.btn_saiba_mais": "Saiba mais",
      "footer.copyright": "© 2026 Grupo Ctrl + People — NEXT FIAP / VR Code Arena."
    };
  },

  async changeLanguage(lang) {
    const dict = await this.loadDictionary(lang);
    if (!dict) return;

    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });
  }
};

window.i18n = i18n;

