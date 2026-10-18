/* ============================================================================
   CHASQUI: PALAVRAS-CHAVE E PASSOS
   ----------------------------------------------------------------------------
   O Chasqui lê o que a pessoa escreveu e procura estas palavras. Quem juntar mais
   pontos é quem atende; o segundo colocado aparece como "reforço".

   COMO CADA HABITANTE É DESCRITO
       forte: { pt: [...], atl: [...] }   palavra que aponta direto para a pessoa  (vale 2 pontos)
       fraca: { pt: [...], atl: [...] }   pista indireta, que ajuda a desempatar    (vale 1 ponto)
       passos / passos_atl                o que fazer primeiro (português / Atlante)

   As listas de português e de Atlante valem SEMPRE as duas ao mesmo tempo, porque a
   pessoa pode escrever em um idioma com o site no outro.

   REGRAS DE ESCRITA DAS PALAVRAS
   - Pode usar acento, maiúscula, ñ e apóstrofo. O Chasqui ignora tudo isso na hora de comparar
     ("válvula" pega "valvula", "ch'illiy" pega "chilliy").
   - Só o começo da palavra basta:  "cultiv"  pega cultivo, cultivar, cultivando.
   - Termine com $ para pegar a palavra inteira:  "porta$"  pega "porta", mas NÃO "portal".
     Use $ em palavras curtas ou que viram outra coisa quando continuam (porta/portal, fita/fitar).
   - Espaço junta palavras que precisam vir seguidas:  "falta de ar"  e  "lá fora".
   - Hífen separa:  "curto-circuito" é lido como "curto circuito".
   - Repetir palavra, ou pôr "tradu" e "tradução" juntas, não dá ponto dobrado: conta uma vez só.
   - A mesma palavra pode ficar em mais de um habitante, mas prefira pôr a certeira como
     "forte" em um só e como "fraca" nos outros.

   PARA TESTAR DEPOIS DE MEXER:   node docs/testar-chasqui.js   e   node docs/verificar-palavras-chave.js
   (roda as frases de docs/chasqui-casos.js e mostra as que o Chasqui errou;
    para ver o ranking de uma frase:  node docs/testar-chasqui.js "a parede está rangendo")

   Habitante novo: copie um bloco, troque o id (o mesmo id de `habitantes` em
   dados-mundo-habitantes.js) e preencha as listas.
   ============================================================================ */

(function () {
  "use strict";

  const HABITANTES = {

    /* ---------------------------- KORA: fogo, calor, pressão, energia, luz ---------------------------- */
    kora: {
      forte: {
        pt: [
          // fogo e calor
          "fogo", "fogão", "fogueira", "forno", "fornalha", "chama$", "chamas$", "brasa", "faísca", "fagulha", "cinza$", "cinzas$",
          "incêndio", "incendi", "queim", "fumaça", "fumegand", "abrasad", "escald", "derret",
          "calor", "quente", "esquent", "aquec", "superaquec", "sobreaquec", "ferv", "vapor", "caldeira", "caldeirão", "chaminé",
          "esfria", "esfriou", "resfriamento", "refrigera", "calefa", "térmic", "termômetro", "temperatura",
          "núcleo", "reator", "coração do sol", "fogo-fundo",
          // pressão
          "pressão", "pressões", "pressuri", "despressuri", "válvula", "manômetro",
          // energia e luz
          "energia", "elétric", "eletricidade", "curto-circuito", "sobrecarga", "descarga", "choque$", "voltagem", "tensão elétrica",
          "gerador", "turbina", "dínamo", "usina", "motor$", "motores$", "bateria", "disjuntor", "fusível", "cabo elétrico", "cabo de energia", "fiação", "tomada$", "tomadas$", "fio$", "fios$",
          "apagão", "apagou", "apagaram", "blecaute", "queda de energia", "falta de luz", "faltou luz", "sem luz", "sem energia", "luz apagou",
          "lâmpada", "lanterna", "lamparina", "tocha", "lampejo", "relâmpago", "raio$", "raios$", "trovão",
          "combustível", "diesel", "lenha", "carvão", "gás$", "gases$",
          "extintor", "bombeiro", "inflam", "isqueiro", "incandesc", "ebuli", "radiador", "interruptor", "acender", "acendeu", "acesa$", "apagar a luz", "eletrici"
        ],
        atl: [
          // mapudungun (a língua de Kora)
          "kütral", "newen", "antü", "antu$",
          // quéchua, náuatle e o que a equipe já usava
          "nina$", "ruphay", "rupay", "rupha", "q'oñiy", "q'oñi$", "q'uñi", "kallpa", "illapa",
          "tletl", "tlitl", "tonalli", "totonki", "totonqui", "inti sonqo", "inti$"
        ]
      },
      fraca: {
        pt: ["luz$", "luzes$", "escuro", "escuridão", "escurec", "ilumin", "brilh", "piscand", "pisca$", "frio", "refriger",
             "tensão", "estour", "gelad", "congel", "pilha$", "pilhas$", "equipament", "máquina", "ventilador", "ventilação", "aparelho", "desliga", "grau$", "graus$"],
        atl: ["tlahuilli", "k'ancha", "k'anchay", "chiri", "chirichiy", "tutayay", "tuta$"]
      },
      passos: [
        "Fechar a válvula mais próxima antes de qualquer conserto.",
        "Conferir o calor do fogo-fundo ao fim de cada maré.",
        "Anotar o que mudou e avisar a Casa das Vozes."
      ],
      passos_atl: [
        "Allichayta manaraq qallarispa aswan qaylla valvulata wichqay.",
        "Sapa qucha puriy tukukuptin ukhu kütralpa q'oñinta qhaway.",
        "Imachus hukman tikrasqanta qillqay, Ñe'ẽ Wasitaq willay."
      ]
    },

    /* ------------------------- ZILDA: memória, arquivo, palavras, ensino ------------------------- */
    zilda: {
      forte: {
        pt: [
          // memória e arquivo
          "arquivo", "memória", "memorial", "lembr", "recorda", "recordaç", "esquec", "saudade", "fita$", "fitas$", "registro", "registrar",
          "documento", "biblioteca", "livro", "livros", "pergaminho", "papiro", "manuscrit", "inscri", "antigo", "antiga", "antigos", "antigas",
          "velhos", "ancião", "anciã", "ancestr", "antepassad", "bisav", "avo$", "avos$", "genealog", "descendente", "origem", "origens",
          // histórias, cantos, tradição
          "história", "lenda", "mito$", "mitos$", "mitolog", "folclor", "fábula", "saga$", "conto$", "contos$", "contar", "contação", "narr", "relato$",
          "cantiga", "canção", "canções", "cantar", "canto$", "cantos$", "poema", "poesia", "poeta", "verso$", "versos$", "ninar",
          "cultura", "tradi", "costume$", "costumes", "ritual", "rito$", "ritos$", "cerimônia", "funeral", "luto$", "homenagem", "despedida",
          // línguas, escrita e ensino
          "idioma", "língua", "dialeto", "sotaque", "palavra", "vocabul", "gramática", "alfabeto", "letra$", "letras$", "sílaba", "pronunc",
          "código", "cifra", "decifr", "símbolo", "glifo", "hieróglif", "signific", "quer dizer", "tradu", "interpret", "dicionário",
          "escrit", "escrev", "escrever", "caligraf", "leitura", "ensin", "ensinamento", "sabedoria", "mestre$", "mestra$", "professor",
          "mais velhos",
          "redigir", "redaç", "discurso", "soletr", "alfabetiz", "analfabet", "gíria", "provérbio", "ditado$", "ditados$", "adágio", "tradutor", "intérprete", "idiomas",
          "decodific", "criptograf", "cifrad", "heranç", "legado", "arcaic", "antiguidade", "testemunho", "depoimento", "enigma", "charada",
          "quéchua", "guarani", "náuatle", "nahuatl", "mapudungun", "aimará", "multilíngue"
        ],
        atl: [
          // náuatle (a língua de Zilda)
          "amoxcalli", "amoxtli", "cuicatl", "cuica", "xochicuica", "tlahtol", "tlahtolli", "tlatolli", "tlacuilo", "tlacuiloa", "tlamatini", "tlamati",
          "tlamachtia", "nechmachtia", "momachtia", "huehue", "toltecayo",
          // quéchua e o que a equipe já usava
          "khipu", "quipu", "willakuy", "yuyay", "yuyaykuna", "yuyarina", "qillqa", "ñawinchay", "ñawpa", "yachachiy", "yachay",
          "simi$", "simikuna", "harawi", "taki$", "takiy", "paqarin"
        ]
      },
      fraca: {
        pt: ["ler$", "leia$", "aprender", "aprend", "estud", "escola", "aula$", "aulas$", "criança", "texto", "carta$", "cartas$",
             "família", "passado$", "expressão", "entrevista", "museu", "exposição", "mistéri", "lição", "lições"],
        atl: ["machu", "paya$", "tlacuilolli", "kawsay"]
      },
      passos: [
        "Reunir os registros e as fitas do caso.",
        "Marcar uma roda de memória com os mais velhos.",
        "Escrever de novo o que foi recuperado, antes que se perca."
      ],
      passos_atl: [
        "Kay ruwaypaq qillqakunata cintakunatapas huñuy.",
        "Machu-paya runakunawan yuyay muyuta rimanakuy.",
        "Chinkaptinmanta ñawpaq, tarisqata huktawan qillqay."
      ]
    },

    /* ------------------------- TITO: fundo do mar, mergulho, sucata, fora ------------------------- */
    tito: {
      forte: {
        pt: [
          // mergulho e fundo
          "mergulh", "submers", "fossa", "abismo", "profund", "fundo$", "leito", "lama$", "afund", "afog", "oceano", "mar$", "mares$", "maré$", "correnteza",
          // barcos e naufrágios
          "naufrág", "barco", "navio", "submarin", "petroleiro", "embarcação", "lancha", "bote$", "botes$", "jangada", "canoa", "remo$", "remos$",
          "âncora", "deriva$", "à deriva", "encalh", "destroço", "boiand", "boia$", "boias$", "flutu",
          // sucata e busca
          "sucata", "ferro velho", "metal$", "metais$", "peça$", "peças$", "reposição", "lixo", "recuper", "resgat", "tesour", "garimp", "catar$", "catador", "vasculh",
          "perdido", "desaparec", "sumiu", "sumiram", "abandonad", "não voltou",
          // fora da cidade
          "exterior", "externo", "externa", "lá fora", "anel de fora", "superfície", "expedição", "explor",
          "mineradora", "minera", "escavadeira", "escav", "eclusa", "traje", "escafandro",
          // bichos do fundo
          "tubar", "polvo$", "lula$", "baleia", "recife", "coral$", "corais$", "monstro",
          // navegação e cais
          "balsa$", "balsas$", "navega", "marinheir", "pirata", "tripula", "capitão", "barca$", "cais$", "doca$", "docas$", "porão", "contêiner", "guindaste", "sonar$",
          // restos, reaproveitamento e achados
          "sobras$", "restos$", "entulho", "refugo", "detrit", "recicl", "reaproveit", "relíquia", "artefat", "valioso", "valiosa"
        ],
        atl: [
          // quéchua e aimará (as línguas de Tito)
          "uraykuy", "uray$", "ukhu", "quch", "mama qucha", "hawa", "mashka", "maska", "mashkay", "maskay", "chinka", "ñut'uq", "mina$", "llank'aq",
          "hawa muyu", "wampu", "lluqsi"
        ]
      },
      fraca: {
        pt: ["cabo$", "cabos$", "fora$", "corda", "escuro", "escuridão", "rota$", "rotas$", "corrente$", "correntes$", "tempestade", "peixe", "peixes",
             "perdi$", "perdeu$", "perdemos$", "caixa$", "caixas$", "porto$", "portos$", "rede$", "redes$", "pesc", "equipament", "milha$", "milhas$", "encontr", "achei", "achado$", "achados$", "procur", "buscar"],
        atl: ["waska", "kutimu", "quta$", "challwa"]
      },
      passos: [
        "Conferir o traje e a eclusa do Anel de Fora.",
        "Combinar a rota de ida e volta antes de mergulhar.",
        "Levar corda-guia e luz reserva."
      ],
      passos_atl: [
        "Hawa Muyup pachanta punkuntapas qhaway.",
        "Uraykuymanta ñawpaq rinapaq kutimunapaq ñanta rimanakuy.",
        "Pusaq waskhata waqaychasqa k'anchaytapas apay."
      ]
    },

    /* ----------------------- YARA: algas, ar, comida, água potável, saúde ----------------------- */
    yara: {
      forte: {
        pt: [
          // algas, plantas e jardim
          "alga$", "algas$", "planta", "plantas$", "plantar", "plantio", "cultiv", "estufa", "viveiro", "canteiro", "horta", "hortali", "jardim", "jardins", "semente", "broto", "brot", "germin", "mudas$",
          "regar$", "rega$", "irrig", "poda$", "podar", "flor", "flores$", "pétala", "fruto$", "frutos$",
          "raiz", "raízes", "folha", "folhas$", "adubo", "adubar", "fertiliz", "solo$", "fotossínt", "bioluminesc", "tanque", "tanques$",
          "murch", "mofo", "bolor", "praga", "pragas$", "secou", "secando", "seca$", "secas$", "ressec", "estiagem", "apodrec", "podre$",
          // comida
          "comida", "alimento", "aliment", "conserva", "armazen", "despensa", "fermenta", "bebida", "vitamina", "proteína", "merenda", "refeição", "cozinh", "cardápio", "receita", "tempero", "pão$", "paes$", "arroz", "milho", "trigo", "batata", "legum", "vegeta", "verdur",
          "fruta", "frutas$", "salada", "sopa$", "colheita", "nutri", "ração", "fome$", "faminto", "desnutri",
          // ar e respiração
          "oxigênio", "respir", "sufoc", "ofeg", "falta de ar", "tontur", "vertigem", "desmai", "asma$", "pulm", "ar viciado", "fôlego", "poluiç", "cansaço", "cansad",
          // água boa e filtro
          "purific", "dessaliniz", "salinidade", "salobra", "filtro", "filtros$", "sede$", "potável", "cascata", "vazão", "nutriente", "água turva", "turva$", "turvo$", "nascente"
        ],
        atl: [
          // quéchua (a língua de Yara) e náuatle
          "cochayuyo", "mallki", "tarpu", "puqu", "wayra", "chakra", "muhu", "mikhu", "miku", "yura$", "wanu", "p'uyñu", "q'oñi wasi", "phaqcha",
          "sarakuna", "papakuna", "papata", "kinwa", "t'anta", "yuyu$", "chakisqa", "chakiy",
          "ehecatl", "xihuitl", "xochitl", "tlaolli", "tlacual", "tlacua$", "ihiyo", "tlalli"
        ]
      },
      fraca: {
        pt: ["ar$", "água", "sal$", "salgad", "tosse", "tossindo", "cheiro", "doente", "doenc", "febre", "enjo", "remédio", "medicin", "chá$",
             "fedid", "fedor", "úmid", "amarel", "fraqueza", "vaso$", "vasos$", "estoque", "racion", "peixe", "peixes", "saúde"],
        atl: ["yaku$", "atl$", "hampi", "unqu", "samay", "challwa"]
      },
      passos: [
        "Medir o ar e a luz nas estufas.",
        "Separar os brotos que apagaram e ver o que houve.",
        "Ajustar o adubo dos tanques."
      ],
      passos_atl: [
        "Q'oñi wasikunapi wayrata k'anchaytapas tupuy.",
        "Mana k'anchaq mallkikunata t'aqaspa, imachus pasasqanta qhaway.",
        "P'uyñukunap wanunta allichay."
      ]
    },

    /* ----------------------- BETO: paredes, solda, comportas, vazamentos ----------------------- */
    beto: {
      forte: {
        pt: [
          // paredes e estrutura
          "antepara", "parede", "paredes$", "muro$", "muros$", "estrutura", "estrutural", "viga$", "vigas$", "colunas$", "pilar", "pilares$", "alicerce",
          "casco", "teto$", "tetos$", "piso$", "pisos$", "assoalho", "degrau", "escada$", "escadas$", "corrimão", "passarela", "ponte$", "pontes$",
          "grade$", "grades$", "gradil", "portão", "portões", "cercas$", "cercado", "cadeado", "galpão", "janela", "janelas$", "vidro$", "vidros$", "divisória", "divisori", "bancada",
          // solda, portas e comportas
          "solda$", "soldas$", "soldar", "soldagem", "soldando", "soldou", "porta$", "portas$", "comporta", "dobradiça", "fechadura", "trinco$",
          // rachaduras, buracos e vazamentos
          "rach", "fissura", "trinca", "trincad", "rompe", "buraco", "furo$", "furos$", "fresta", "brecha", "infiltra", "vazamento", "vaza", "gotej", "goteira", "pingand", "pingo$", "pingos$",
          "desabar", "desabou", "desmoron", "ceder", "cedeu", "enverg", "empena", "esfarel", "descasc", "afundou", "tombar",
          // consertos
          "reforç", "remend", "vedar", "vedação", "tampar", "tapar", "rangendo", "rang",
          "tábua", "tábuas$", "estalou", "entup", "ralo$", "bueiro", "encanador", "andaime", "calha$", "calhas$", "terremoto", "tremor", "sismo", "colaps", "bamba$", "bambo$", "frouxo",
          "ferrugem", "ferrugens", "enferruj", "oxid", "corrosão", "concreto", "cimento", "tijolo", "argamassa", "reboco", "madeira",
          // tubos e canos
          "cano$", "canos$", "tubo$", "tubos$", "tubulaç", "encanament", "esgoto", "canaliz"
        ],
        atl: [
          // náuatle (a língua de Beto)
          "tepantli", "tepan", "tepoz", "tetl$", "tzacua", "calli$", "tepozmecatl", "tepan wasi",
          // quéchua e o que a equipe já usava
          "punku", "p'aki", "tinkichiy", "pirqa", "pirqay", "qarqa", "chaka$", "wasicha", "rumi$", "herrumbre"
        ]
      },
      fraca: {
        pt: ["cúpula$", "cúpulas$", "entrou água", "água entrando", "alag", "inund", "romp", "quebr", "quebrou", "consert", "repar",
             "ferro$", "parafus", "rebit", "obra$", "obras$", "oficina", "ferrament", "martelo", "prego$", "pregos$", "prateleira", "estante",
             "construir", "construç", "reform", "pedreiro", "estaleiro", "telhado", "chão$", "solto$", "solta$", "ruína", "ruínas$", "danificad", "dano$", "danos$", "tinta$", "pintar", "pintura", "reparo$", "úmid", "estour", "abertura$", "podre$"],
        atl: ["yaykuy", "urma", "urmay", "kancha$", "tuqu$"]
      },
      passos: [
        "Olhar a parede e marcar as rachaduras.",
        "Fechar as comportas do corredor.",
        "Soldar e testar por uma maré inteira."
      ],
      passos_atl: [
        "Tepantlita qhawaspa p'akikunata unanchay.",
        "Ñan punkukunata wichqay.",
        "Tinkichiy, hukkuti qucha puriykama tupuy."
      ]
    },

    /* ------------------------ SUELI: rádio, canal, avisos, sinal, reuniões ------------------------ */
    sueli: {
      forte: {
        pt: [
          // rádio e sinal
          "rádio$", "rádios$", "radiofon", "canal", "canais$", "sinal", "sinais$", "sem sinal", "perdemos o sinal", "perdi o sinal", "perdeu o sinal", "sinal fraco",
          "sintoniz", "frequência", "interferência", "estática", "estatic", "chiado", "ruído", "antena", "transmit", "transmiss", "onda$", "ondas$",
          "telefon", "alto-falante", "megafone", "microfone", "microf", "comunic", "contato", "contatos$", "sem resposta", "ninguém responde", "ninguém atende", "sem comunicação",
          // avisos e notícias
          "avis", "anunci", "alerta", "alarme", "sirene", "campainha", "sino$", "sinos$", "apito", "buzina", "chamado", "chamar", "chamada", "chamados$", "convoc", "convite", "convidar",
          "notícia", "noticiário", "boletim", "emiss", "emissora", "locutor", "locução", "radiodifus", "receptor", "ao vivo", "ligaç", "ligar para", "sos$", "mayday", "boato", "rumor", "fofoca", "informar", "informaç", "informe$", "cartaz", "cartazes", "panfleto", "jornal$", "jornais$", "mensagem", "mensagens$", "recado", "recados$", "comunicado", "divulg", "espalh", "difund",
          // reuniões e coordenação
          "assembleia", "assembl", "reunião", "reuniões", "reunir", "coorden", "isolad", "incomunic", "emergência", "socorro", "pedido de ajuda", "silêncio", "silenc"
        ],
        atl: [
          // guarani (a língua de Sueli)
          "ñe'ẽ$", "marandu", "aty$", "ñemomarandu",
          // mapudungun, náuatle e quéchua
          "dungun", "tlanonotza", "nonotza", "mononotza", "nechnonotza", "waqyay", "willay", "rimay", "rimana", "ch'illiy", "uyari", "kachay", "kutichi", "chaski"
        ]
      },
      fraca: {
        pt: ["linha$", "linhas$", "cabo$", "cabos$", "barulho", "som$", "voz$", "vozes", "ouvir", "ouvi$", "escut", "mural", "satélite", "eco$", "grito$", "gritar", "volume$", "bairro", "bairros", "falar com", "falar para", "conversar", "conversa$",
             "mudo$", "responder", "resposta"],
        atl: ["lina", "ayllu", "ayllukuna", "hendu", "mombeu"]
      },
      passos: [
        "Abrir o canal e avisar todos os setores.",
        "Trocar de frequência se houver ruído.",
        "Anotar quem respondeu ao chamado."
      ],
      passos_atl: [
        "Ñanta kichaspa tukuy ayllukunata willay.",
        "Ch'illiy kaptin huk ñanman tikray.",
        "Pikunachus kutichisqankuta qillqay."
      ]
    }
  };

  /* ==========================================================================
     DAQUI PARA BAIXO É O MOTOR. Não precisa mexer para trocar palavras.
     ========================================================================== */

  const PESO_FORTE = 2;
  const PESO_FRACA = 1;

  // minúsculo, sem acento, sem ñ/ü e sem apóstrofo: "Ch'illiy" -> "chilliy", "Válvula" -> "valvula"
  function normalizar(texto) {
    return String(texto)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/['’ʼ`´]/g, "");
  }

  // "falta de ar" -> [{txt:"falta"},{txt:"de"},{txt:"ar"}] ; "porta$" -> [{txt:"porta", exato:true}]
  function compilar(palavra) {
    return normalizar(palavra)
      .split(/[\s-]+/)
      .filter(Boolean)
      .map((parte) => (parte.endsWith("$") ? { txt: parte.slice(0, -1), exato: true } : { txt: parte, exato: false }));
  }

  // Lista de {partes, peso} de cada habitante (montada uma vez só).
  // Palavra repetida (ou já coberta por um começo menor, como "tradu" e "tradução") conta uma vez só,
  // para a lista poder crescer sem dar ponto dobrado por acidente.
  // Frases com mais de uma palavra ("falta de ar") somam à parte, de propósito.
  const COMPILADO = {};
  Object.entries(HABITANTES).forEach(([id, h]) => {
    const itens = [];
    [["forte", PESO_FORTE], ["fraca", PESO_FRACA]].forEach(([nivel, peso]) => {
      const grupo = h[nivel] || {};
      [...(grupo.pt || []), ...(grupo.atl || [])].forEach((p) => {
        const partes = compilar(p);
        if (!partes.length) return;
        const chave = partes.map((x) => x.txt + (x.exato ? "$" : "")).join(" ");
        const igual = itens.find((i) => i.chave === chave);
        if (igual) igual.peso = Math.max(igual.peso, peso);
        else itens.push({ partes, peso, chave });
      });
    });
    COMPILADO[id] = itens.filter((b) =>
      !(b.partes.length === 1 && itens.some((a) =>
        a !== b && a.partes.length === 1 && !a.partes[0].exato && a.peso >= b.peso &&
        a.partes[0].txt.length < b.partes[0].txt.length && b.partes[0].txt.startsWith(a.partes[0].txt))));
  });

  // Quebra a missão em palavras, guardando como a pessoa digitou (orig) e a versão para comparar (norm)
  function separar(missao) {
    const palavras = [];
    const regra = /[\p{L}\p{N}'’ʼ]+/gu;
    let m;
    while ((m = regra.exec(missao))) {
      const norm = normalizar(m[0]);
      if (norm) palavras.push({ orig: m[0].toLowerCase(), norm });
    }
    return palavras;
  }

  // Procura a palavra-chave na missão; devolve o trecho como a pessoa digitou, ou null
  function achar(palavras, partes) {
    for (let i = 0; i + partes.length <= palavras.length; i++) {
      const bate = partes.every((parte, j) => {
        const w = palavras[i + j].norm;
        return parte.exato ? w === parte.txt : w.startsWith(parte.txt);
      });
      if (bate) return palavras.slice(i, i + partes.length).map((w) => w.orig).join(" ");
    }
    return null;
  }

  // Ranking de todos os habitantes: [{ id, pontos, fortes, achadas }], do melhor para o pior.
  // Empate: quem tem mais palavras fortes; depois, a ordem em que aparecem aqui.
  function pontuar(missao) {
    const palavras = separar(missao);
    return Object.keys(HABITANTES)
      .map((id, ordem) => {
        let pontos = 0;
        let fortes = 0;
        const achadas = [];
        COMPILADO[id].forEach(({ partes, peso }) => {
          const trecho = achar(palavras, partes);
          if (trecho === null) return;
          pontos += peso;
          if (peso === PESO_FORTE) fortes++;
          if (!achadas.includes(trecho)) achadas.push(trecho);
        });
        return { id, pontos, fortes, achadas, ordem };
      })
      .sort((a, b) => b.pontos - a.pontos || b.fortes - a.fortes || a.ordem - b.ordem);
  }

  // Quem atende a missão: { id, palavras, reforco } ou null se nenhuma palavra bateu com ninguém
  function consultar(missao) {
    const [primeiro, segundo] = pontuar(missao);
    if (!primeiro || primeiro.pontos === 0) return null;
    return {
      id: primeiro.id,
      palavras: primeiro.achadas,
      reforco: segundo && segundo.pontos > 0 ? segundo.id : null
    };
  }

  const CHASQUI = { habitantes: HABITANTES, pontuar, consultar, normalizar };
  if (typeof window !== "undefined") window.CHASQUI = CHASQUI;
  if (typeof module !== "undefined" && module.exports) module.exports = CHASQUI;
})();
