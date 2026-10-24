/* ============================================================================
   DADOS DAS SEÇÕES "O MUNDO" E "HABITANTES"
   ----------------------------------------------------------------------------
   Para mudar qualquer coisa do conteúdo na arena, mexa SÓ neste arquivo.
   (Os textos fixos de títulos, FAQ e parágrafos estão no index.html.)

   COMO FUNCIONA O IDIOMA
   Todo texto tem dois campos lado a lado:
       nome:     "Coração do Sol"     <- português
       nome_atl: "Inti Sonqo"         <- Atlante (o idioma inventado de Guaraci)
   Se faltar o campo _atl, o site mostra o português. Para conferir o que ficou sem
   tradução, rode no terminal:   node docs/verificar-atlante.js

   RECEITAS RÁPIDAS (detalhes em docs/como-editar.md)
   - Trocar um texto ............ edite o campo (e o _atl dele).
   - Mudar o estado de um recurso  edite "estado" em `indicadores` (estavel | atencao | risco).
   - Mexer o marcador no mapa ... edite "pin" do lugar (x = esquerda, y = topo, em %).
   - Novo habitante ............. copie um bloco de `habitantes`, ponha o retrato em
                                  assets/media/habitantes/ e copie também o bloco dele em chasqui-palavras.js.
   Este arquivo é .js (e não .json) para o site abrir com dois cliques, sem servidor.
   ============================================================================ */

window.DADOS_MUNDO_HABITANTES = {

  /* ------------------------------------------------------------------------
     LUGARES DO MAPA
     tom: "calmo" | "atencao" (muda a cor da etiqueta).  lado: lado da etiqueta no mapa.
     ------------------------------------------------------------------------ */
  lugares: [
    {
      id: "coracao",
      nome: "Coração do Sol",
      nome_atl: "Inti Sonqo",
      estado: "Firme",
      estado_atl: "Takyasqa",
      tom: "calmo",
      foto: "assets/media/mundo/foto-coracao-do-sol.webp",
      fotoPos: "50% 50%",
      fotoAlt: "Salão circular com colunas pintadas, cascatas e um sol de pedra ao fundo",
      fotoAlt_atl: "Muyu hatun wasi, siq'isqa k'uchukunawan, phaqchakunawan, qhipanpi rumi intiwan",
      legenda: "O salão onde o fogo-fundo aquece a cidade inteira.",
      legenda_atl: "Ukhu kütral tukuy llaqtata q'oñichiq wasi.",
      pin: { x: 50, y: 47 },
      resumo: "No centro da cidade, o fogo-fundo aquece a água e as pessoas. As rodas de conversa começam aqui, ao amanhecer.",
      resumo_atl: "Llaqta chawpipi ukhu kütralqa yakuta runakunatawan q'oñichin. Rimanakuy muyukuna kaypi paqariypi qallarin.",
      avisos: [],
      pontos: [
        {
          id: "fogo",
          nome: "O fogo-fundo",
          nome_atl: "Ukhu kütral",
          fazer: ["Escutar o ronco do fogo ao fim de cada maré", "Ensinar aprendizes a ler o calor"],
          fazer_atl: ["Sapa qucha puriy tukukuptin kütralpa qarqarayninta uyariy", "Yachaqkunata q'oñiyta ñawiriyta yachachiy"],
          tem: ["Calor para a cidade inteira", "Água morna nas cascatas"],
          tem_atl: ["Tukuy llaqtapaq q'oñiy", "Q'oñi yaku phaqchakunapi"]
        },
        {
          id: "praca",
          nome: "Praça do Sol",
          nome_atl: "Inti Kancha",
          fazer: ["Roda de conversa ao amanhecer", "Festas e despedidas"],
          fazer_atl: ["Paqariypi rimanakuy muyu", "Raymikuna kacharparikunapas"],
          tem: ["Bancos de pedra", "Sombra de árvores"],
          tem_atl: ["Rumi tiyanakuna", "Sach'akunap llantun"]
        }
      ]
    },
    {
      id: "jardins",
      nome: "Jardins de Alga",
      nome_atl: "Cochayuyo Chakra",
      estado: "Crescendo",
      estado_atl: "Wiñashan",
      tom: "calmo",
      foto: "assets/media/mundo/foto-jardins-de-alga.webp",
      fotoPos: "50% 50%",
      fotoAlt: "Tanques de vidro com algas brilhando em verde, entre tubulações cor de cobre",
      fotoAlt_atl: "Vidrio p'uyñukunapi cochayuyo qomer k'anchashan, kobre tuberiakuna chawpipi",
      legenda: "Tanques de vidro onde as algas acendem à noite.",
      legenda_atl: "Tutapi cochayuyo k'anchaq vidrio p'uyñukuna.",
      pin: { x: 73, y: 30 },
      lado: "esquerda",
      resumo: "Aqui nasce o ar da cidade. As algas crescem em tanques de vidro e acendem quando estão saudáveis.",
      resumo_atl: "Kaypim llaqtapa wayran paqarin. Cochayuyokunaqa vidrio p'uyñukunapi wiñan, allin kaptinqa k'anchan.",
      avisos: [],
      pontos: [
        {
          id: "tanques",
          nome: "Tanques que acendem",
          nome_atl: "K'anchaq p'uyñukuna",
          fazer: ["Colher as algas maduras", "Separar os brotos que apagaram"],
          fazer_atl: ["Puquq cochayuyokunata pallay", "Mana k'anchaq mallkikunata t'aqay"],
          tem: ["Algas frescas", "Sementes guardadas"],
          tem_atl: ["Mushuq cochayuyo", "Waqaychasqa muhukuna"]
        },
        {
          id: "estufas",
          nome: "Estufas do lado leste",
          nome_atl: "Inti lluqsimuq q'oñi wasikuna",
          fazer: ["Medir o ar e a luz de cada estufa", "Trocar a água dos tanques"],
          fazer_atl: ["Sapa q'oñi wasipi wayrata k'anchaytapas tupuy", "P'uyñukunapi yakuta tikray"],
          tem: ["Mudas novas", "Adubo de alga"],
          tem_atl: ["Mushuq mallkikuna", "Cochayuyo wanu"]
        }
      ]
    },
    {
      id: "vozes",
      nome: "Casa das Vozes",
      nome_atl: "Ñe'ẽ Wasi",
      estado: "Canal aberto",
      estado_atl: "Ñan kichasqa",
      tom: "calmo",
      foto: "assets/media/mundo/foto-casa-das-vozes.webp",
      fotoPos: "50% 50%",
      fotoAlt: "Sala redonda com uma mesa-mapa grande no centro e janela para a cidade submersa",
      fotoAlt_atl: "Muyu wasi, chawpipi hatun mapa-mesa, ukhu llaqtaman qhawana t'uquwan",
      legenda: "Daqui sai todo aviso: rádio, recados e histórias contadas em voz alta.",
      legenda_atl: "Kaymanta lluqsin tukuy willay: radio, mensajekuna, rimasqa willakuykunapas.",
      pin: { x: 44, y: 22 },
      resumo: "Quem precisa falar com outro canto da cidade passa por aqui. A casa guarda também a biblioteca da Mestra Zilda.",
      resumo_atl: "Llaqtap huk kuchunwan rimayta munaqqa kaymanmi shamun. Wasipin Amawta Zildap amoxcalli kan.",
      avisos: [
        {
          id: "ruido",
          texto: "Ruído nas linhas do sul",
          texto_atl: "Qulla linakunapi ch'illiy",
          rastro: [
            "Ao cair da noite, o chiado ficou forte no canal do sul.",
            "Tito confirmou: a escavadeira está perto do cabo.",
            "A linha foi desviada pelo cabo reserva."
          ],
          rastro_atl: [
            "Tutayaykuptin qulla ñanpi ch'illiyqa kallpayarqa.",
            "Titum willarqa: ñut'uq makina cable kasqanman asuykunña.",
            "Linaqa waqaychasqa cablepi pasachisqa karqa."
          ]
        }
      ],
      pontos: [
        {
          id: "radio",
          nome: "Rádio de válvula",
          nome_atl: "Valvula radio",
          fazer: ["Abrir o canal e chamar os setores", "Passar os avisos do dia"],
          fazer_atl: ["Ñanta kichaspa ayllukunata waqyay", "Punchawpa willaykunata willay"],
          tem: ["Válvulas guardadas", "Um caderno com todos os chamados"],
          tem_atl: ["Waqaychasqa valvulakuna", "Tukuy waqyaykunap p'anqan"]
        },
        {
          id: "biblioteca",
          nome: "Biblioteca da Mestra Zilda",
          nome_atl: "Amawta Zildap Amoxcalli",
          fazer: ["Contar histórias antigas em voz alta", "Restaurar fitas e registros"],
          fazer_atl: ["Ñawpaq willakuykunata rimaspa willay", "Cintakunata qillqakunatapas allichay"],
          tem: ["Fitas do século XXI", "Cantos de trabalho"],
          tem_atl: ["XXI pachak watap cintakuna", "Llank'ay cuicatlkuna"]
        }
      ]
    },
    {
      id: "estaleiro",
      nome: "Estaleiro",
      nome_atl: "Tepan Wasi",
      estado: "Em obra",
      estado_atl: "Llank'ashan",
      tom: "calmo",
      foto: "assets/media/mundo/foto-estaleiro.webp",
      fotoPos: "80% 50%",
      fotoAlt: "Vista da cidade com docas, guindastes e barcos pequenos entre as cúpulas",
      fotoAlt_atl: "Llaqta qhawasqa: cúpulakuna chawpipi yaku tiyanakuna, hatun apaqkuna, huch'uy wamp'ukuna",
      legenda: "Onde os cascos são remendados e os barcos pequenos saem para o fundo.",
      legenda_atl: "Tepantlikuna allichasqa kaq chaypi, huch'uy wamp'ukuna ukhuman lluqsin.",
      pin: { x: 66, y: 58 },
      lado: "direita",
      resumo: "Guindastes, docas e barcos pequenos. Beto e a turma remendam o casco da cidade um pedaço de cada vez.",
      resumo_atl: "Hatun apaqkuna, yaku tiyanakuna, huch'uy wamp'ukuna. Betoqa llank'aqmasinkunawan llaqtap tepantlinta huk t'aqata huk t'aqata allichan.",
      avisos: [],
      pontos: [
        {
          id: "bancada",
          nome: "Bancada de solda do Beto",
          nome_atl: "Betop tepoz tinkichina mesan",
          fazer: ["Soldar paredes e comportas", "Desenhar padrões nos remendos"],
          fazer_atl: ["Tepantlikunata punkukunatapas tinkichiy", "Allichaykunapi siq'ikuna ruway"],
          tem: ["Maçaricos e chapas de aço", "Tinta de ferrugem"],
          tem_atl: ["Rupachinakuna tepoz p'anqakunapas", "Tepoz qhelliwan llimp'i"]
        },
        {
          id: "deposito",
          nome: "Depósito de sucata do Tito",
          nome_atl: "Titop t'aqwina wasi",
          fazer: ["Separar o que veio do fundo", "Trocar peças por favores"],
          fazer_atl: ["Ukhumanta shamuqkunata t'aqway", "T'aqakunata aynimanta tikray"],
          tem: ["Cabos e placas", "Peças de naufrágios"],
          tem_atl: ["Cablekuna p'anqakunapas", "Chinkasqa wamp'ukunamanta t'aqakuna"]
        }
      ]
    },
    {
      id: "terracos",
      nome: "Terraços d'Água",
      nome_atl: "Yaku Pata",
      estado: "Atenção",
      estado_atl: "Qhawariy",
      tom: "atencao",
      foto: "assets/media/mundo/foto-terracos-dagua.webp",
      fotoPos: "50% 50%",
      fotoAlt: "Cascatas descendo por terraços de pedra com lírios d'água e corais",
      fotoAlt_atl: "Rumi patakunapi phaqchakuna uraykun, yaku t'ikakunawan korallkunawan",
      legenda: "As cascatas que tiram o sal e levam água doce aos bairros.",
      legenda_atl: "Kachita lluqsichiq, ayllukunaman misk'i yakuta apaq phaqchakuna.",
      pin: { x: 34, y: 61 },
      resumo: "A água do mar entra salgada e desce em cascatas até ficar boa de beber. Ultimamente ela desce mais devagar.",
      resumo_atl: "Qucha yakuqa kachiyuq yaykun, phaqchakunapi uraykuspa upyanapaq allin tukun. Kay punchawkunaqa pisi pisimanta uraykun.",
      avisos: [
        {
          id: "rota",
          texto: "Rota do sul bloqueada pela mineradora",
          texto_atl: "Mina-llank'aq qulla ñanta wichqarqa",
          rastro: [
            "Antes do amanhecer, o Anel de Fora tremeu.",
            "Tito confirmou: uma escavadeira sem dono fechou a rota.",
            "A passagem foi interditada até segunda ordem."
          ],
          rastro_atl: [
            "Paqariyta manaraq, Hawa Muyuqa kuyurirqa.",
            "Titum riqsichirqa: mana kamachiqniyuq ñut'uq makina ñanta wichqarqa.",
            "Pasayqa hukniraq kamachikuykama harkasqa karqa."
          ]
        },
        {
          id: "vazao",
          texto: "A vazão das cascatas diminuiu",
          texto_atl: "Phaqchakunap yakuqa pisiyarqa",
          rastro: [],
          rastro_atl: []
        }
      ],
      pontos: [
        {
          id: "filtros",
          nome: "Filtros de sal",
          nome_atl: "Kachi filtrokuna",
          fazer: ["Lavar os filtros a cada maré", "Provar a água antes de liberar"],
          fazer_atl: ["Sapa qucha puriypi filtrokunata mayllay", "Kacharichiyta manaraq yakuta mallikuy"],
          tem: ["Carvão de alga", "Mantas de filtro"],
          tem_atl: ["Rupasqa cochayuyo", "Filtro awasqakuna"]
        },
        {
          id: "cascata",
          nome: "Cascata da praça",
          nome_atl: "Kancha Phaqcha",
          fazer: ["Encher os cântaros dos bairros", "Vigiar o nível dos tanques"],
          fazer_atl: ["Ayllukunap p'uyñunkunata hunt'ay", "Hatun p'uyñukunap hunt'asqanta qhaway"],
          tem: ["Água doce", "Bancos à sombra"],
          tem_atl: ["Misk'i yaku", "Llantupi tiyanakuna"]
        }
      ]
    },
    {
      id: "fora",
      nome: "Anel de Fora",
      nome_atl: "Hawa Muyu",
      estado: "Vigiado",
      estado_atl: "Qhawasqa",
      tom: "atencao",
      foto: "assets/media/mundo/foto-anel-de-fora.webp",
      fotoPos: "50% 50%",
      fotoAlt: "Ruínas de arcos e torres cobertas de plantas, com arraias nadando ao redor",
      fotoAlt_atl: "Ruinakuna: sach'a-sachaman p'ampasqa arcokuna torrekunapas, raya challwakuna muyuspa",
      legenda: "Ruínas além das cúpulas. Tito conhece cada arco.",
      legenda_atl: "Cúpulakunamanta hawapi ruinakuna. Titoqa sapa arcota riqsin.",
      pin: { x: 14, y: 80 },
      resumo: "Além das cúpulas ficam as ruínas e a fossa dos naufrágios. De lá vêm cabos e notícias, e também as mineradoras.",
      resumo_atl: "Cúpulakunamanta hawapi ruinakuna chinkasqa wamp'ukunap t'uqun kan. Chaymanta cablekuna willaykunapas shamun, mina-llank'aqkunapas.",
      avisos: [],
      pontos: [
        {
          id: "fossa",
          nome: "Fossa dos naufrágios",
          nome_atl: "Chinkasqa wamp'ukunap t'uqun",
          fazer: ["Recolher cabos, placas e notícias", "Marcar o que ainda ninguém reclamou"],
          fazer_atl: ["Cablekunata, p'anqakunata, willaykunatawan pallay", "Manaraq pipas hap'iq kaqta unanchay"],
          tem: ["Peças e cabos", "Mapas antigos"],
          tem_atl: ["T'aqakuna cablekunapas", "Ñawpaq mapukuna"]
        },
        {
          id: "eclusa",
          nome: "Eclusa do Anel de Fora",
          nome_atl: "Hawa Muyup punkun",
          fazer: ["Vestir o traje e fechar a eclusa", "Combinar a rota de ida e volta"],
          fazer_atl: ["Pachata churakuspa punkuta wichqay", "Rinapaq kutimunapaqwan ñanta rimanakuy"],
          tem: ["Trajes de pressão", "Cordas-guia"],
          tem_atl: ["Llasay pachakuna", "Pusaq waskhakuna"]
        }
      ]
    }
  ],

  /* ------------------------------------------------------------------------
     HABITANTES (os crachás). "retrato" é o arquivo em assets/media/habitantes/.
     ------------------------------------------------------------------------ */
  habitantes: [
    {
      id: "kora",
      nome: "Kora",
      nome_atl: "Kora",
      funcao: "Guardiã do Fogo-Fundo",
      funcao_atl: "Ukhu Kütral Kamayuq",
      nomeInteiro: "Kora Nunes do Núcleo",
      nomeInteiro_atl: "Kora Sonqo-Kütral",
      lugar: "Coração do Sol",
      lugar_atl: "Inti Sonqo",
      onde: "Coração do Sol, junto ao fogo-fundo",
      onde_atl: "Inti Sonqopi, ukhu kütral waqtanpi",
      sabe: ["Controle de pressão", "Solda fria", "Cuidar do calor"],
      sabe_atl: ["Llasayta kamachiy", "Chiri tinkichiy", "Q'oñita waqaychay"],
      bio: "Cuida do fogo que aquece a cidade inteira. Nunca viu o sol; guarda um pedaço de casca de árvore como lembrança da terra seca.",
      bio_atl: "Tukuy llaqtata q'oñichiq kütralta qhawan. Intitaqa manam rikurqachu; chaki allpap yuyayninpaq sach'a qarata waqaychan.",
      frase: "O fogo faz barulho quando algo vai mal. Quem sabe escutar chega a tempo.",
      frase_atl: "Imapas mana allin kaptin kütralqa qarqarayan. Uyariyta yachaqqa ñawpaqtam chayan.",
      retrato: "assets/media/habitantes/kora.webp"
    },
    {
      id: "zilda",
      nome: "Mestra Zilda",
      nome_atl: "Amawta Zilda",
      funcao: "Guardiã das Palavras",
      funcao_atl: "Tlahtol Waqaychaq",
      nomeInteiro: "Zilda Maria da Biblioteca",
      nomeInteiro_atl: "Zilda Maria Amoxcalli",
      lugar: "Casa das Vozes",
      lugar_atl: "Ñe'ẽ Wasi",
      onde: "Casa das Vozes, na biblioteca",
      onde_atl: "Ñe'ẽ Wasipi, amoxcallipi",
      sabe: ["Cifras antigas", "Canto de trabalho", "Restauro de fitas"],
      sabe_atl: ["Ñawpaq khipukuna", "Llank'ay cuicatl", "Cintakunata allichay"],
      bio: "É a memória da cidade. Canta o que os arquivos antigos deixaram escrito, para ninguém esquecer.",
      bio_atl: "Llaqtap yuyayninmi. Ñawpaq qillqakuna saqisqanta takin, ama pipas qonqananpaq.",
      frase: "O que ninguém conta em voz alta se perde.",
      frase_atl: "Mana pipas rimaspa willasqanqa chinkan.",
      retrato: "assets/media/habitantes/zilda.webp"
    },
    {
      id: "tito",
      nome: "Tito",
      nome_atl: "Tito",
      funcao: "Catador do Fundo",
      funcao_atl: "Ukhu Mashkaq",
      nomeInteiro: "Tito Marés-Vivas",
      nomeInteiro_atl: "Tito Kawsaq-Qucha",
      lugar: "Anel de Fora",
      lugar_atl: "Hawa Muyu",
      onde: "Anel de Fora, além das cúpulas",
      onde_atl: "Hawa Muyupi, cúpulakunamanta hawapi",
      sabe: ["Mergulho profundo", "Salvar cabos", "Achar o caminho no escuro"],
      sabe_atl: ["Ukhuman uraykuy", "Cablekunata qespichiy", "Tutayaqpi ñanta taripay"],
      bio: "Mergulha além das cúpulas e traz cabos, placas e notícias dos naufrágios.",
      bio_atl: "Cúpulakunamanta hawaman uraykuspa chinkasqa wamp'ukunamanta cablekunata, p'anqakunata, willaykunatawan apamun.",
      frase: "Todo naufrágio é um depósito que ninguém reclamou.",
      frase_atl: "Sapa chinkasqa wamp'um manaraq pipas hap'isqan waqaychana.",
      retrato: "assets/media/habitantes/tito.webp"
    },
    {
      id: "yara",
      nome: "Yara",
      nome_atl: "Yara",
      funcao: "Cultivadora do Abismo",
      funcao_atl: "Cochayuyo Tarpuq",
      nomeInteiro: "Yara Folha-Sal",
      nomeInteiro_atl: "Yara Raphi-Kachi",
      lugar: "Jardins de Alga",
      lugar_atl: "Cochayuyo Chakra",
      onde: "Jardins de Alga, nas estufas do lado leste",
      onde_atl: "Cochayuyo Chakrapi, inti lluqsimuq q'oñi wasikunapi",
      sabe: ["Cultivo de algas", "Fazer a alga acender", "Adubo de alga"],
      sabe_atl: ["Cochayuyo tarpuy", "Cochayuyota k'anchachiy", "Cochayuyo wanu"],
      bio: "Cuida das algas que dão ar à cidade. Passa as noites nas estufas conferindo quais brotos acenderam.",
      bio_atl: "Llaqtaman wayrata qoq cochayuyokunata qhawan. Tutakunata q'oñi wasikunapi pasan, mayqin mallkikuna k'anchasqanta qhawaspa.",
      frase: "Broto que acende é broto que vive.",
      frase_atl: "K'anchaq mallkiqa kawsaq mallkim.",
      retrato: "assets/media/habitantes/yara.webp"
    },
    {
      id: "beto",
      nome: "Beto",
      nome_atl: "Beto",
      funcao: "Soldador das Paredes",
      funcao_atl: "Tepan Tepoz Llank'aq",
      nomeInteiro: "Beto Ferro-Quente",
      nomeInteiro_atl: "Beto Tepoz-Rupay",
      lugar: "Estaleiro",
      lugar_atl: "Tepan Wasi",
      onde: "Estaleiro, nas paredes do casco",
      onde_atl: "Tepan Wasipi, llaqtap tepantlinpi",
      sabe: ["Solda de alta pressão", "Reforço de paredes", "Desenho em remendo"],
      sabe_atl: ["Llasaq tinkichiy", "Tepantli kallpachay", "Allichaypi siq'i"],
      bio: "Reforça as portas e paredes contra a pressão. Cada remendo dele vira um desenho que o bairro reconhece.",
      bio_atl: "Punkukunata tepantlikunatapas llasaqmanta kallpachan. Sapa allichayninqa ayllup riqsisqan siq'iman tukun.",
      frase: "Cada remendo meu leva o nome do meu bairro.",
      frase_atl: "Sapa allichayniypiqa ayllumpa sutinmi kan.",
      retrato: "assets/media/habitantes/beto.webp"
    },
    {
      id: "sueli",
      nome: "Sueli",
      nome_atl: "Sueli",
      funcao: "Voz do Canal",
      funcao_atl: "Ñe'ẽ Chaski",
      nomeInteiro: "Sueli Voz-Aberta",
      nomeInteiro_atl: "Sueli Ñe'ẽ-Kicha",
      lugar: "Casa das Vozes",
      lugar_atl: "Ñe'ẽ Wasi",
      onde: "Casa das Vozes, junto ao rádio",
      onde_atl: "Ñe'ẽ Wasipi, radio waqtanpi",
      sabe: ["Rádio de válvula", "Chamar quem precisa", "Código de emergência"],
      sabe_atl: ["Valvula radio", "Yanapata mañaqkunata waqyay", "Usqhay willay khipu"],
      bio: "Chama, escuta e avisa. Nenhum canto da cidade fica sem notícia, mesmo no escuro mais fundo.",
      bio_atl: "Waqyan, uyarin, willan. Llaqtap sapa kuchunpas willayta chaskin, aswan ukhu tutapipas.",
      frase: "Enquanto o canal estiver aberto, ninguém está sozinho.",
      frase_atl: "Ñan kichasqa kashaptinqa, manam pipas sapallanchu.",
      retrato: "assets/media/habitantes/sueli.webp"
    }
  ],

  /* ------------------------------------------------------------------------
     INDICADORES ("O pulso da cidade")
     estado:    "estavel" | "atencao" | "risco"   (muda a cor)
     tendencia: "sobe" | "firme" | "cai"          (o texto está em `rotulos`)
     valor e barra: números de 0 a 100 (a barra enche até esse %).
     O nome de cada indicador (Oxigênio, Energia...) está em `rotulos`, com o mesmo id.
     ------------------------------------------------------------------------ */
  indicadores: [
    {
      id: "oxigenio",
      valor: 93, barra: 93, unidade: "%",
      estado: "estavel", tendencia: "firme",
      nota: "Os Jardins de Alga produzem mais ar do que a cidade gasta.",
      nota_atl: "Cochayuyo Chakrakunaqa llaqta mikhusqanmanta aswan wayrata ruwan."
    },
    {
      id: "energia",
      valor: 84, barra: 84, unidade: "%",
      estado: "estavel", tendencia: "firme",
      nota: "As turbinas seguem no ritmo normal, alimentadas pelo fogo-fundo.",
      nota_atl: "Turbinakunaqa ukhu kütralpa kallpanwan allinta purin."
    },
    {
      id: "paredes",
      valor: 57, barra: 57, unidade: "%",
      estado: "risco", tendencia: "cai",
      nota: "Microfissuras na parede do Estaleiro. Beto já foi para lá.",
      nota_atl: "Tepan Wasipi tepantlipi huch'uy p'akikuna kashan. Betoqa chayman rirqañam."
    },
    {
      id: "agua",
      valor: 71, barra: 71, unidade: "%",
      estado: "atencao", tendencia: "cai",
      nota: "Os filtros dos Terraços d'Água precisam de limpeza: a vazão caiu.",
      nota_atl: "Yaku Pata filtrokunata mayllinanchikmi: yakuqa pisiyarqa."
    },
    {
      id: "animo",
      valor: 76, barra: 76, unidade: "%",
      estado: "estavel", tendencia: "sobe",
      nota: "Assembleia de bairros cheia. Cozinha comum aberta em três cúpulas.",
      nota_atl: "Ayllukunap kawiñninqa huntasqa. Kuska mikuna wasiqa kimsa cúpulapi kichasqa."
    },
    {
      id: "comunicacao",
      valor: 42, barra: 42, unidade: "%",
      estado: "risco", tendencia: "cai",
      nota: "Chiado no cabo do sul: a escavadeira mexeu na linha. Sueli procura outro caminho.",
      nota_atl: "Qulla cablepi ch'illiy: ñut'uq makinaqa linata kuyuchirqa. Sueliqa huk ñanta maskashan."
    }
  ],

  /* ------------------------------------------------------------------------
     CHASQUI: as palavras-chave e os "primeiros passos" de cada habitante ficam em
     chasqui-palavras.js (um arquivo só para o Chasqui). Aqui ficam apenas os textos de tela dele (rótulos).
     ------------------------------------------------------------------------ */

  /* ------------------------------------------------------------------------
     RÓTULOS usados pelos blocos que o JavaScript monta (cada um com pt e atl).
     Os textos fixos do index.html ficam no próprio HTML (atributo data-atl).
     ------------------------------------------------------------------------ */
  rotulos: {
    abrir:        { pt: "Conhecer",             atl: "Riqsiy" },
    fechar:       { pt: "Fechar",               atl: "Wichqay" },
    nomeInteiro:  { pt: "Nome inteiro",         atl: "Hunt'a suti" },
    onde:         { pt: "Onde fica",            atl: "Maypi kachkan" },
    sabe:         { pt: "Sabe fazer",           atl: "Yachasqankuna" },
    avisos:       { pt: "Avisos",               atl: "Willaykuna" },
    lugares:      { pt: "Lugares",              atl: "Tiyanakuna" },
    fazer:        { pt: "O que se faz aqui",    atl: "Kaypi ruwaykuna" },
    tem:          { pt: "O que tem aqui",       atl: "Kaypi kaqkuna" },
    semRastro:    { pt: "Ainda ninguém contou o que houve.", atl: "Manaraqmi pipas imachus pasasqanta willarqachu." },
    retratoDe:    { pt: "Retrato de",           atl: "Siq'i:" },

    /* nomes dos indicadores (mesmo id de `indicadores`) */
    oxigenio:     { pt: "Oxigênio",             atl: "Wayra" },
    energia:      { pt: "Energia",              atl: "Newen" },
    paredes:      { pt: "Paredes",              atl: "Tepantli" },
    agua:         { pt: "Água",                 atl: "Uma" },
    animo:        { pt: "Ânimo da comunidade",  atl: "Lofkawsay" },
    comunicacao:  { pt: "Comunicação",          atl: "Dungunñan" },

    /* estados e tendências dos indicadores */
    estavel:      { pt: "Estável",              atl: "Allin" },
    atencao:      { pt: "Atenção",              atl: "Qhawariy" },
    risco:        { pt: "Risco",                atl: "Manchay" },
    sobe:         { pt: "↑ subindo",            atl: "↑ wicharin" },
    firme:        { pt: "→ firme",              atl: "→ takyan" },
    cai:          { pt: "↓ caindo",             atl: "↓ uraykun" },

    /* Chasqui */
    chame:        { pt: "Chame",                atl: "Waqyay" },
    comecar:      { pt: "Por onde começar",     atl: "Maymantam qallariy" },
    maisMaos:     { pt: "Se precisar de mais mãos, chame também", atl: "Aswan maki munaptikiqa, waqyay" },
    voceFalou:    { pt: "Você falou de",        atl: "Qanqa rimarqanki:" },
    sabeFazer:    { pt: "sabe fazer:",          atl: "yachan:" },
    erroCurto:    { pt: "Conte a missão com um pouco mais de detalhe (pelo menos 10 letras).",
                    atl: "Aswan allinta willay (aswan pisimanta 10 qillqa)." },
    erroNinguem:  { pt: "O Chasqui não achou ninguém para esse caso. Diga qual é o problema (por exemplo: parede, rádio, algas, mergulho, calor).",
                    atl: "Chaskiqa kay ruwaypaq pitapas mana tarirqachu. Imachus sasachakuyta willay (hina: tepantli, radio, cochayuyo, uraykuy, q'oñiy)." }
  }
};
