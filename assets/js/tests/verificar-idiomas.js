/* Confere os textos de assets/lang/dicionarios.js (menu, hero, Mural, Contato, rodapé) nos dois idiomas.
   Uso (na pasta do projeto):   node assets/js/tests/verificar-idiomas.js
   Sai com erro (código 1) se achar problema.

   O que ele olha:
   1. as duas listas (português e Atlante) têm exatamente as mesmas chaves e nenhuma está vazia;
   2. toda chave usada no index.html (data-i18n) existe, e nenhuma chave ficou sobrando;
   3. sobrou português ou espanhol dentro do Atlante;
   4. caracteres: "..." em vez de …, aspas retas, " - " no lugar de —, espaço duplo, ¡ ¿. */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const raiz = path.join(__dirname, "../../..");
const problemas = [];

const janela = {};
vm.runInNewContext(fs.readFileSync(path.join(raiz, "assets/lang/dicionarios.js"), "utf8"), { window: janela });
const { ptBr, ptBrAtlantida } = janela.I18N_DICIONARIOS;

// 1. mesmas chaves, nada vazio
Object.keys(ptBr).filter((k) => !(k in ptBrAtlantida)).forEach((k) => problemas.push(`falta no Atlante: ${k}`));
Object.keys(ptBrAtlantida).filter((k) => !(k in ptBr)).forEach((k) => problemas.push(`falta no português: ${k}`));
for (const [nome, dic] of [["português", ptBr], ["Atlante", ptBrAtlantida]]) {
  Object.entries(dic).forEach(([k, v]) => { if (!String(v).trim()) problemas.push(`${nome}: texto vazio em ${k}`); });
}

// 2. chaves do HTML x chaves do dicionário
const html = fs.readFileSync(path.join(raiz, "index.html"), "utf8");
const usadas = new Set([...html.matchAll(/data-i18n(?:-placeholder)?="([^"]+)"/g)].map((m) => m[1]));
usadas.forEach((k) => { if (!(k in ptBr)) problemas.push(`o index.html usa "${k}", que não existe no dicionário`); });
const emCodigo = fs.readFileSync(path.join(raiz, "assets/js/main.js"), "utf8");
const semUso = Object.keys(ptBr).filter((k) => !usadas.has(k) && !emCodigo.includes(`"${k}"`));

// 3. resto de português ou espanhol dentro do Atlante
const IGUAL_DE_PROPOSITO = new Set(["nav.lang_pt", "nav.lang_atlantida", "hero.livro_titulo_linha2"]);
const OUTRAS_LINGUAS = new Set(("de del la el los las que para con por una uno unos y o en es su sus mas más muy este esta esto " +
  "um uns uma umas os as em no na nos nas pelo pela não nao ou ele ela eles elas seu seus suas esse essa isso isto aqui como quando " +
  "onde quem sem sobre entre ainda todo toda todos todas ninguém foi são está estão " +
  "frecuencia sector seguridad administración administracion zona anillo domo cables plaza archivos algas oxígeno oxigeno " +
  "central codinome comunidade transmissão transmissao ajuda mensagem").split(/\s+/));
Object.entries(ptBrAtlantida).forEach(([k, v]) => {
  if (!IGUAL_DE_PROPOSITO.has(k) && v === ptBr[k] && /[a-záéíóúâêôãõç]{4,}/i.test(v)) problemas.push(`${k}: igual ao português (sem tradução)`);
  const sobras = String(v).toLowerCase().replace(/[^a-záàâãéêíóôõúüçñ'\s-]/g, " ").split(/\s+/).filter((p) => OUTRAS_LINGUAS.has(p));
  if (sobras.length) problemas.push(`${k}: palavra de outra língua no Atlante (${[...new Set(sobras)].join(", ")}): "${String(v).slice(0, 60)}"`);
});

// 4. caracteres
const REGRAS = [
  [/\.\.\./, 'use "…" (um caractere) em vez de três pontos'],
  [/"/, 'aspas retas ("): use “ ”'],
  [/ - /, 'hífen solto: use travessão " — "'],
  [/\d-\d/, 'hífen entre números: use travessão curto "–" (ex.: 36–48)'],
  [/\S {2,}\S/, "espaço duplo"],
  [/[¡¿]/, "¡ ou ¿ (espanhol) não existem em português nem em Atlante"],
  [/\s[,.;:!?]/, "espaço antes de pontuação"],
  [/Atlantida/, 'falta o acento: "Atlântida"'],
];
for (const [nome, dic] of [["português", ptBr], ["Atlante", ptBrAtlantida]]) {
  Object.entries(dic).forEach(([k, v]) => REGRAS.forEach(([rx, msg]) => { if (rx.test(v)) problemas.push(`${nome} ${k}: ${msg}: "${String(v).slice(0, 50)}"`); }));
}

if (problemas.length) {
  console.log(`Encontrei ${problemas.length} ponto(s) para arrumar:\n`);
  problemas.forEach((p) => console.log(" - " + p));
  process.exit(1);
}
if (semUso.length) console.log(`Aviso (não é erro): ${semUso.length} chave(s) sem uso no index.html e no main.js: ${semUso.join(", ")}\n`);
console.log(`Tudo certo: ${Object.keys(ptBr).length} textos nos dois idiomas, sem resto de outra língua e sem erro de caractere.`);
