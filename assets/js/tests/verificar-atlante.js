/* Confere se tudo que tem versão em português também tem versão em Atlante, e se sobrou português nas traduções.
   Uso (na pasta do projeto):   node assets/js/tests/verificar-atlante.js
   Sai com erro (código 1) se achar problema, para dar para usar antes de entregar. */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const raiz = path.join(__dirname, "../../..");
const problemas = [];

// Palavras comuns do português que não existem no Atlante ("uma" ficou de fora de propósito: em Atlante é a água). Se aparecerem num texto _atl, é sinal de resto sem traduzir.
const PORTUGUES = new Set(("de da do das dos que para com um uns umas os as em no na nos nas por pelo pela " +
  "não nao mais mas ou se ele ela eles elas seu sua seus suas esse essa esses essas este esta estes estas isso " +
  "isto aqui ali lá muito também como quando onde quem qual quais sem sobre entre até desde porque ainda " +
  "todo toda todos todas cada nenhum nenhuma ninguém tudo nada foi são está estão ser tem têm vai vão " +
  "cidade bairro bairros água ar fogo pessoas lugar casa").split(/\s+/));

function achaPortugues(texto) {
  const palavras = texto.toLowerCase().replace(/[^a-záàâãéêíóôõúüçñ'\s-]/g, " ").split(/\s+/).filter(Boolean);
  return palavras.filter((p) => PORTUGUES.has(p));
}

function conferirTexto(onde, pt, atl) {
  if (typeof pt !== "string") return;
  if (atl === undefined || atl === "") return problemas.push(`${onde}: falta a versão em Atlante de "${pt.slice(0, 50)}"`);
  const sobras = achaPortugues(atl);
  if (sobras.length) problemas.push(`${onde}: português no Atlante (${[...new Set(sobras)].join(", ")}): "${atl.slice(0, 70)}"`);
}

/* ---------- 1. Dados (dados-secoes.js) ---------- */
const janela = {};
vm.runInNewContext(fs.readFileSync(path.join(raiz, "assets/js/dados-secoes.js"), "utf8"), { window: janela });
const d = janela.DADOS_MUNDO_HABITANTES;

// Varre o objeto: para todo campo "x" que tenha "x_atl" (ou que devesse ter), confere o par.
const SEM_TRADUCAO = new Set(["id", "tom", "foto", "fotoPos", "lado", "retrato", "unidade", "estado", "tendencia", "pin", "valor", "barra", "passos", "passos_atl"]);
function varrer(obj, caminho) {
  if (Array.isArray(obj)) return obj.forEach((x, i) => varrer(x, `${caminho}[${i}]`));
  if (!obj || typeof obj !== "object") return;
  for (const [campo, valor] of Object.entries(obj)) {
    if (campo.endsWith("_atl")) continue;
    const onde = `${caminho}.${campo}`;
    if (typeof valor === "string" && !SEM_TRADUCAO.has(campo)) {
      conferirTexto(onde, valor, obj[campo + "_atl"]);
    } else if (Array.isArray(valor) && valor.length && typeof valor[0] === "string" && !SEM_TRADUCAO.has(campo)) {
      const atl = obj[campo + "_atl"] || [];
      if (atl.length !== valor.length) problemas.push(`${onde}: a lista em Atlante tem ${atl.length} itens e a em português tem ${valor.length}`);
      valor.forEach((v, i) => conferirTexto(`${onde}[${i}]`, v, atl[i]));
    } else if (typeof valor === "object") {
      varrer(valor, onde);
    }
  }
}
["lugares", "habitantes", "indicadores"].forEach((k) => varrer(d[k], k));

Object.entries(d.rotulos).forEach(([k, r]) => conferirTexto(`rotulos.${k}`, r.pt, r.atl));

// Chasqui: palavras-chave e passos vivem em chasqui-motor.js
const janelaChasqui = {};
vm.runInNewContext(fs.readFileSync(path.join(raiz, "assets/js/chasqui-motor.js"), "utf8"), { window: janelaChasqui });
Object.entries(janelaChasqui.CHASQUI.habitantes).forEach(([id, c]) => {
  if (!c.passos_atl || c.passos_atl.length !== c.passos.length) problemas.push(`chasqui.${id}: passos_atl não bate com passos`);
  else c.passos_atl.forEach((p, i) => conferirTexto(`chasqui.${id}.passos[${i}]`, c.passos[i], p));
  if (!d.habitantes.some((h) => h.id === id)) problemas.push(`chasqui.${id}: não existe habitante com esse id em dados-mundo-habitantes.js`);
  ["forte", "fraca"].forEach((nivel) => ["pt", "atl"].forEach((lang) => {
    if (!c[nivel] || !Array.isArray(c[nivel][lang])) problemas.push(`chasqui.${id}.${nivel}.${lang}: lista ausente`);
  }));
});
d.habitantes.forEach((h) => {
  if (!janelaChasqui.CHASQUI.habitantes[h.id]) problemas.push(`habitantes.${h.id}: falta o bloco dele em chasqui-palavras.js`);
});

// Todo indicador precisa de rótulo (nome, estado e tendência)
d.indicadores.forEach((i) => ["id", "estado", "tendencia"].forEach((c) => {
  if (!d.rotulos[i[c]]) problemas.push(`rotulos.${i[c]}: falta o rótulo usado pelo indicador "${i.id}"`);
}));

/* ---------- 2. Textos fixos do index.html (data-atl) ---------- */
const html = fs.readFileSync(path.join(raiz, "index.html"), "utf8");
const inicio = html.indexOf('id="o-mundo"');
const fim = html.indexOf('id="mural"');
const trecho = html.slice(inicio, fim);
const decodificar = (s) => s.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

// elementos que mostram texto mas não têm data-atl nem data-i18n (ficariam em português)
const SEM_TEXTO = /^\s*$/;
for (const m of trecho.matchAll(/<(p|span|strong|h[1-6]|figcaption|label|button|dt|dd|li)\b([^>]*)>([^<]+)<\/\1>/g)) {
  const [, tag, attrs, conteudo] = m;
  if (SEM_TEXTO.test(conteudo) || /^\s*[\d/]+\s*$/.test(conteudo)) continue;     // vazio ou só números (ex.: "2154", "0/800")
  if (/data-atl=|data-i18n=/.test(attrs)) continue;
  problemas.push(`index.html: <${tag}> sem data-atl: "${decodificar(conteudo).trim().slice(0, 60)}"`);
}
for (const m of trecho.matchAll(/data-atl="([^"]*)"[^>]*>([^<]*)</g)) {
  conferirTexto("index.html", decodificar(m[2]), decodificar(m[1]));
}
for (const m of trecho.matchAll(/(alt|placeholder|aria-label)="([^"]+)"([^>]*)data-atl-\1="([^"]+)"/g)) {
  conferirTexto(`index.html ${m[1]}`, decodificar(m[2]), decodificar(m[4]));
}
for (const m of trecho.matchAll(/<(img|textarea|div)\b[^>]*\b(alt|placeholder)="([^"]+)"[^>]*>/g)) {
  if (m[3] && !new RegExp(`data-atl-${m[2]}=`).test(m[0])) problemas.push(`index.html: ${m[2]} sem versão em Atlante: "${m[3].slice(0, 50)}"`);
}

/* ---------- Resultado ---------- */
if (problemas.length) {
  console.log(`Encontrei ${problemas.length} ponto(s) para arrumar:\n`);
  problemas.forEach((p) => console.log(" - " + p));
  process.exit(1);
}
console.log("Tudo certo: todo texto tem versão em Atlante e não sobrou português nas traduções.");
