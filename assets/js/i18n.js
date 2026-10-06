// i18n - Sistema de Troca Dinâmica de Idiomas via Arquivos JSON (ptBr.json e ptBrAtlantida.json)

const i18n = {
    // Dicionários em cache
    dictionaries: {},

    // Carrega o dicionário a partir do arquivo JSON
    async loadDictionary(lang) {
        if (this.dictionaries[lang]) {
            return this.dictionaries[lang];
        }

        try {
            const fileName = lang === 'ptBrAtlantida' ? 'ptBrAtlantida.json' : 'ptBr.json';
            const response = await fetch(`assets/lang/${fileName}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            this.dictionaries[lang] = data;
            return data;
        } catch (error) {
            console.warn(`Não foi possível carregar assets/lang/${lang}.json via fetch, usando fallback interno:`, error);
            // Fallback caso aberto via protocolo file:// no navegador sem servidor local
            return this.getFallbackDictionary(lang);
        }
    },

    // Dicionário Fallback para execução local sem webserver
    getFallbackDictionary(lang) {
        if (lang === 'ptBrAtlantida') {
            return {
                "nav.menu": "KALPULLI",
                "nav.lang_pt": "PT-BR",
                "nav.lang_atlantida": "Atlantida",
                "hero.cover_title": "ATLÂNTIDA - TLALOC",
                "hero.cover_subtitle": "ARENA TLATOANI — NEXT FIAP",
                "footer.copyright": "© 2026 Calpulli Ctrl + People — NEXT FIAP / VR Code Arena."
            };
        }
        return {
            "nav.menu": "MENU",
            "nav.lang_pt": "PT-BR",
            "nav.lang_atlantida": "Atlantida",
            "hero.cover_title": "ATLÂNTIDA",
            "hero.cover_subtitle": "VR CODE ARENA — NEXT FIAP",
            "footer.copyright": "© 2026 Grupo Ctrl + People — NEXT FIAP / VR Code Arena."
        };
    },

    // Aplica as chaves de tradução no HTML nos elementos com data-i18n
    async changeLanguage(lang) {
        const dict = await this.loadDictionary(lang);
        if (!dict) return;

        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key] !== undefined) {
                el.textContent = dict[key];
            }
        });
    }
};

window.i18n = i18n;
