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
        "contact.quote_label": "PULSO 09 // TLANONOTZALIZTLI TLAPALLI",
        "contact.quote": "“TIHUEHCAH ATL TLANAMACA. AXCAN XINOTZA.”",
        "contact.channel": "CANAL TLAPALLI",
        "contact.title": "XIMONOTZA PORTAL",
        "contact.subtitle": "TERMINAL CRT TLALILIZTLI",
        "contact.terminal": "TL-94 // COMMS/TLALILIZTLI",
        "contact.secure_line": "TLANONOTZALIZTLI TLAPALLI",
        "contact.description": "In canal para aquin quinequi palehuia, motlalia itech calpulli, noso quinequi mononotza ihuan administración portal.",
        "contact.required_note": "(*) Tlanahuatilli",
        "contact.name_label": "01 // TOCAITL NOSO CODINOME",
        "contact.name_placeholder": "Ej.: Atl Xochitl",
        "contact.sector_label": "02 // SECTOR",
        "contact.sector_placeholder": "Xicpehpena in sector",
        "contact.sector_north": "Domo Norte",
        "contact.sector_central": "Anillo Central",
        "contact.sector_four": "Sector 4",
        "contact.sector_farm": "Zona Agrícola",
        "contact.sector_other": "Occe / Amo nicmati",
        "contact.reason_label": "03 // TLANONOTZALIZTLI",
        "contact.reason_placeholder": "Xicpehpena in tlen ticnequi",
        "contact.reason_help": "Nicnequi palehuia",
        "contact.reason_signup": "Nicnequi nimotlaliz",
        "contact.reason_admin": "Nimononotzas ihuan administración",
        "contact.reason_other": "Occe tlamantli",
        "contact.priority_label": "04 // TLAPALLI",
        "contact.priority_placeholder": "Xicpehpena in tlapalli",
        "contact.priority_routine": "Mojmostla",
        "contact.priority_attention": "Nicnequi motlachilis",
        "contact.priority_urgent": "Axcan — seguridad",
        "contact.reply_label": "05 // CANAL PARA NOCUEPILIZ",
        "contact.reply_placeholder": "Ej.: Frecuencia 12 noso atl@calpulli",
        "contact.message_label": "06 // TLANONOTZALIZTLI",
        "contact.message_placeholder": "> Xicihcuilo motlanonotzaliz para central...",
        "contact.demo_notice": "In terminal quicelia in tlanonotzaliz nican; ayamo mopohua ihuan central.",
        "contact.submit": "XITITLANI TLANONOTZALIZTLI",
        "contact.success": "¡Tlanonotzaliztli cualtitoc! In formulario demo quipohua nican; amo quititlania motlahtol a central.",
        "contact.error_name": "Xicihcuilo motocaitl noso codinome.",
        "contact.error_name_short": "Motocaitl monequi quipia ome letras.",
        "contact.error_sector": "Xicpehpena in sector campa tihuala.",
        "contact.error_reason": "Xicpehpena in tlen ticnequi.",
        "contact.error_priority": "Xicpehpena in tlapalli.",
        "contact.error_reply": "Xicihcuilo se canal para nocuepiliz.",
        "contact.error_reply_short": "In canal para nocuepiliz monequi quipia eyi caracteres.",
        "contact.error_message": "Xicihcuilo motlanonotzaliz.",
        "contact.error_message_short": "In tlanonotzaliz monequi quipia majtlactli caracteres.",
        "mural.quote_label": "FREQ. 12 // CALPULLI TLANONOTZALIZTLI",
        "mural.quote": "“NOCHIN TLANONOTZALIZTLI CE ATLACOMOLLI TOHUAN.”",
        "mural.frequency": "CALPULLI FRECUENCIA",
        "mural.title": "CALPULLI TLACUILOLLI",
        "mural.subtitle": "TLANONOTZALIZTLI TLALILIZTLI",
        "mural.transmission": "TLANONOTZALIZTLI",
        "mural.tag_maintenance": "TLAPATILIZTLI",
        "mural.tag_exchange": "PATLALIZTLI",
        "mural.tag_memory": "TLAHCUILOLLI",
        "mural.tag_harvest": "TLAOLIZTLI",
        "mural.tag_urgent": "AXCAN",
        "mural.message_kora": "Tlanonotzaliztli: motlapalehuiz in Sector 4. Xiccerrar in tepozmecatl tlen secundaria a las 18h.",
        "mural.message_tito": "Niquittac cables coaxiales intactos itech petroleiro. Aquin quinequi, ma yahui itech taller.",
        "mural.message_zilda": "Yohualli, tlatolli de archivos Tlaloc itech plaza central reactor.",
        "mural.message_yara": "Yancuic algas, 15% más oxígeno. Ehecatl chipahuac yez.",
        "mural.message_sueli": "Canal tlanonotzaliztli tlapohtli. Tla mocúpula quipoloa presión, xiquinnotza niman.",
        "mural.expires_in": "Tlamis ic",
        "mural.preserved": "TLANONOTZALIZTLI PIYALIZTLI",
        "mural.next_expiration": "TLAMIS IN",
        "mural.expiration_period": "CICLO",
        "mural.expiration_duration": "36-48 H",
        "mural.empty": "Amo onca tlanonotzaliztli axcan.",
        "hero.cover_title": "ATLÂNTIDA - TLALOC",
        "hero.cover_subtitle": "ARENA TLATOANI — NEXT FIAP",
        "hero.livro_titulo_linha1": "Ixtlamati",
        "hero.livro_titulo_linha2": "Atlântida.",
        "hero.livro_descricao": "Tlazocamati atl altepetl, ximomachti ihuan xitlachia yancuic tlalpan ameyalli.",
        "hero.btn_explorar": "Xitlachia Atlântida",
        "hero.btn_saiba_mais": "Miac tlamatiliztli",
        "footer.brand_subtitle": "TLANEXTILIZTLI ATL AHUACATL",
        "footer.description": "In portal quimopalehuia altepetl. Nican macehualtin tlen cúpulas moiximatih, mononotzah, motlatlauhtiah ihuan mopalehuiah. Ayacmo aquin atl mictia.",
        "footer.depth": "HUECATLAN 3.400 m",
        "footer.community": "CALPULLI TLAPOHTLI",
        "footer.areas_heading": "Calpulli tlanahuatilli",
        "footer.community_wall": "Calpulli tlacuilolli",
        "footer.contact": "Ximononotza portal",
        "footer.channels_heading": "Tlanonotzaliztli",
        "footer.channel_radio": "Calpulli radio — frecuencia 12",
        "footer.channel_emergency": "Tepozmecatl tlaocol — nepantla anillo",
        "footer.channel_assembly": "Calpulli tlatlaniliztli — yancuic metztli",
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
      "contact.quote_label": "PULSO 09 // TRANSMISSÃO SEGURA",
      "contact.quote": "“VOCÊ CHEGOU AO FUNDO. AGORA RESPONDA.”",
      "contact.channel": "CANAL SEGURO",
      "contact.title": "FALE COM O PORTAL",
      "contact.subtitle": "TERMINAL CRT DE ALISTAMENTO",
      "contact.terminal": "TL-94 // COMMS/ALISTAMENTO",
      "contact.secure_line": "LINHA SEGURA",
      "contact.description": "O canal para quem precisa de ajuda, quer se cadastrar ou deseja entrar em contato com a administração do portal.",
      "contact.required_note": "(*) Campos obrigatórios",
      "contact.name_label": "01 // NOME OU CODINOME",
      "contact.name_placeholder": "Ex.: Maré Alta",
      "contact.sector_label": "02 // SETOR DE ORIGEM",
      "contact.sector_placeholder": "Selecione seu setor",
      "contact.sector_north": "Domo Norte",
      "contact.sector_central": "Anel Central",
      "contact.sector_four": "Setor 4",
      "contact.sector_farm": "Zona Agrícola",
      "contact.sector_other": "Outro / Não sei informar",
      "contact.reason_label": "03 // TIPO DE CHAMADO",
      "contact.reason_placeholder": "Selecione o motivo do contato",
      "contact.reason_help": "Preciso de ajuda",
      "contact.reason_signup": "Quero me cadastrar",
      "contact.reason_admin": "Falar com a administração",
      "contact.reason_other": "Outro assunto",
      "contact.priority_label": "04 // PRIORIDADE",
      "contact.priority_placeholder": "Selecione a prioridade",
      "contact.priority_routine": "Rotina",
      "contact.priority_attention": "Preciso de atenção",
      "contact.priority_urgent": "Urgente — risco à segurança",
      "contact.reply_label": "05 // CANAL DE RETORNO",
      "contact.reply_placeholder": "Ex.: Frequência 12 ou mare@comuna.abissal",
      "contact.message_label": "06 // MENSAGEM DE TRANSMISSÃO",
      "contact.message_placeholder": "> Digite sua mensagem para a central...",
      "contact.demo_notice": "O terminal registra a mensagem nesta demonstração; ainda não está conectado à central.",
      "contact.submit": "ENVIAR TRANSMISSÃO",
      "contact.success": "Transmissão enviada! Em breve a central entrará em contato.",
      "contact.error_name": "Informe seu nome ou codinome.",
      "contact.error_name_short": "O nome ou codinome deve ter pelo menos 2 caracteres.",
      "contact.error_sector": "Selecione o setor de origem.",
      "contact.error_reason": "Selecione o motivo do contato.",
      "contact.error_priority": "Selecione a prioridade do chamado.",
      "contact.error_reply": "Informe um canal para receber a resposta.",
      "contact.error_reply_short": "O canal de retorno deve ter pelo menos 3 caracteres.",
      "contact.error_message": "Escreva uma mensagem para a central.",
      "contact.error_message_short": "A mensagem deve ter pelo menos 10 caracteres.",
      "mural.quote_label": "FREQ. 12 // TRANSMISSÃO COMUNITÁRIA",
      "mural.quote": "“TODA MENSAGEM É UMA COMPORTA ABERTA ENTRE NÓS.”",
      "mural.frequency": "FREQUÊNCIA COMUNITÁRIA",
      "mural.title": "MURAL DA COMUNIDADE",
      "mural.subtitle": "MENSAGENS FIXADAS NA CHAPA CENTRAL",
      "mural.transmission": "TRANSMISSÃO",
      "mural.tag_maintenance": "MANUTENÇÃO",
      "mural.tag_exchange": "TROCA",
      "mural.tag_memory": "MEMÓRIA",
      "mural.tag_harvest": "COLHEITA",
      "mural.tag_urgent": "URGENTE",
      "mural.message_kora": "Aviso de manutenção preventiva no Setor 4. Fechem as comportas secundárias às 18h.",
      "mural.message_tito": "Achei cabos coaxiais intactos perto da carcaça do petroleiro. Quem precisar, apareça na oficina.",
      "mural.message_zilda": "Sessão de transmissão oral dos arquivos de Tlaloc hoje à noite na praça central do reator.",
      "mural.message_yara": "Nova safra de algas com rendimento 15% superior de oxigênio. O ar vai ficar mais limpo.",
      "mural.message_sueli": "Canal de chamados aberto. Se sua cúpula estiver perdendo pressão, avise imediatamente aqui.",
      "mural.expires_in": "Expira em",
      "mural.preserved": "TRANSMISSÕES PRESERVADAS",
      "mural.next_expiration": "PRÓXIMA JANELA DE RENOVAÇÃO",
      "mural.expiration_period": "CICLO DE SUPORTE",
      "mural.expiration_duration": "36-48 H",
      "mural.empty": "Não há mensagens ativas no mural neste momento.",
      "hero.cover_title": "ATLÂNTIDA",
      "hero.cover_subtitle": "VR CODE ARENA — NEXT FIAP",
      "hero.livro_titulo_linha1": "Explore",
      "hero.livro_titulo_linha2": "Atlântida.",
      "hero.livro_descricao": "Conecte-se à cidade submarina, descubra seus espaços e explore um novo mundo abaixo da superfície.",
      "hero.btn_explorar": "Explorar Atlântida",
      "hero.btn_saiba_mais": "Saiba mais",
      "footer.brand_subtitle": "PORTAL DA COMUNA ABISSAL",
      "footer.description": "O portal que mantém a cidade conectada. Aqui os habitantes das cúpulas se conhecem, se comunicam, pedem e oferecem ajuda. Ninguém se afoga sozinho.",
      "footer.depth": "PROFUNDIDADE 3.400 m",
      "footer.community": "COMUNIDADE ABERTA",
      "footer.areas_heading": "As áreas do portal",
      "footer.community_wall": "Mural da Comunidade",
      "footer.contact": "Fale com o Portal",
      "footer.channels_heading": "Canais de escuta",
      "footer.channel_radio": "Rádio Comunal — frequência 12",
      "footer.channel_emergency": "Emergência de pressão — anel central",
      "footer.channel_assembly": "Assembleia de bairros — toda lua nova",
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
