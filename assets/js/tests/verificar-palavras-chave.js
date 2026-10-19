/* Confere as listas de palavras do Chasqui (assets/js/chasqui-palavras.js) e avisa de problemas comuns.
   Uso (na pasta do projeto):   node assets/js/tests/verificar-palavras-chave.js
   Não substitui  node assets/js/tests/testar-chasqui.js  (que roda as frases de exemplo): este olha as LISTAS.
   Sai com erro (código 1) só nos itens marcados como ERRO; os AVISOS são para você decidir. */

const path = require("path");
const CHASQUI = require(path.join(__dirname, "../chasqui-motor.js"));
const { normalizar } = CHASQUI;

const erros = [];
const avisos = [];

// Palavras muito comuns que NÃO deveriam apontar para ninguém sozinhas (se apontarem, o Chasqui responde fora de hora)
const COMUNS = `a o as os um uma uns umas de do da dos das em no na nos nas por para com sem sob sobre entre até desde e ou mas que se como quando onde porque já ainda também só muito pouco mais menos bem mal sempre nunca agora hoje ontem amanhã aqui ali lá eu tu ele ela nós eles elas me te lhe meu minha seu sua este esta isto esse essa isso quem qual cada todo toda todos outro mesmo
ser estar ter haver fazer ir vir dar ver dizer poder querer saber dever ficar deixar passar chegar levar colocar tomar achar parecer começar acabar seguir viver gostar pensar entender conhecer perguntar pedir ajudar trabalhar jogar
casa rua cidade país mundo céu sol lua estrela dia noite semana mês ano hora minuto vida amor medo alegria tristeza paz amigo irmão pai mãe filho filha marido homem mulher menino menina jovem povo gente pessoa nome número lugar coisa razão problema pergunta ideia sonho vontade verdade forma modo jeito time equipe trabalho dinheiro preço festa jogo filme pizza sorvete café
sim não obrigado obrigada desculpa olá oi tchau parabéns ótimo legal bonito feio bom ruim fácil difícil rápido grande pequeno novo velho primeiro último perto longe dentro acima abaixo frente atrás lado meio centro
portal site página botão seção título imagem ilustração mapa visita design projeto desafio missão arena futuro presente`.split(/\s+/);

const ids = Object.keys(CHASQUI.habitantes);
const fortePor = {}; // palavra normalizada -> habitantes onde é forte

ids.forEach((id) => {
  const h = CHASQUI.habitantes[id];
  ["forte", "fraca"].forEach((nivel) => {
    const g = h[nivel];
    if (!g || !Array.isArray(g.pt) || !Array.isArray(g.atl)) erros.push(`${id}: faltam as listas ${nivel}.pt e/ou ${nivel}.atl`);
  });
  if (!Array.isArray(h.passos) || h.passos.length < 3) erros.push(`${id}: "passos" precisa de 3 passos em português`);
  if (!Array.isArray(h.passos_atl) || h.passos_atl.length !== (h.passos || []).length) erros.push(`${id}: "passos_atl" precisa ter o mesmo número de passos que "passos"`);
  if (!h.forte || !h.forte.atl || h.forte.atl.length < 5) avisos.push(`${id}: poucas palavras fortes em Atlante`);

  const todas = [];
  ["forte", "fraca"].forEach((nivel) => {
    const g = h[nivel] || {};
    [["pt", g.pt], ["atl", g.atl]].forEach(([idioma, lista]) =>
      (lista || []).forEach((p) => todas.push({ p, nivel, idioma, n: normalizar(p).replace(/[\s-]+/g, " ") })));
  });

  // repetidas dentro do mesmo habitante
  const vistas = new Map();
  todas.forEach((t) => {
    if (vistas.has(t.n)) {
      const a = vistas.get(t.n);
      avisos.push(`${id}: "${t.p}" repete "${a.p}" (${a.nivel}/${a.idioma}); conta uma vez só, pode apagar uma`);
    } else vistas.set(t.n, t);
  });

  // palavra de uma letra/duas letras sem $ pega palavra demais
  todas.forEach((t) => {
    const unica = !t.n.includes(" ");
    const base = t.n.replace(/\$$/, "");
    if (unica && !t.n.endsWith("$") && base.length < 4) avisos.push(`${id}: "${t.p}" é muito curta sem $ e pode pegar palavras demais`);
    if (t.nivel === "forte" && unica) (fortePor[base + (t.n.endsWith("$") ? "$" : "")] ||= new Set()).add(id);
  });
});

// mesma palavra forte em dois habitantes: desempate vira sorte
Object.entries(fortePor).forEach(([p, quem]) => {
  if (quem.size > 1) avisos.push(`"${p}" é palavra FORTE de ${[...quem].join(" e ")}; deixe forte em um só e fraca no outro`);
});

// palavras comuns que apontam para alguém
COMUNS.forEach((w) => {
  const r = CHASQUI.pontuar(w).filter((x) => x.pontos > 0);
  if (r.length) avisos.push(`a palavra comum "${w}" pontua para ${r.map((x) => x.id + "(" + x.achadas.join("|") + ")").join(", ")}; confira se não faz o Chasqui responder fora de hora`);
});

const total = ids.reduce((n, id) => {
  const h = CHASQUI.habitantes[id];
  return n + ["forte", "fraca"].reduce((m, nv) => m + h[nv].pt.length + h[nv].atl.length, 0);
}, 0);
console.log(`Chasqui: ${ids.length} habitantes, ${total} palavras-chave no total.`);
ids.forEach((id) => {
  const h = CHASQUI.habitantes[id];
  console.log(`  ${id.padEnd(6)} forte pt ${String(h.forte.pt.length).padStart(3)} / atl ${String(h.forte.atl.length).padStart(3)}   fraca pt ${String(h.fraca.pt.length).padStart(3)} / atl ${String(h.fraca.atl.length).padStart(3)}`);
});
if (avisos.length) console.log("\nAVISOS:\n" + avisos.map((a) => "  - " + a).join("\n"));
if (erros.length) console.log("\nERROS:\n" + erros.map((e) => "  - " + e).join("\n"));
if (!avisos.length && !erros.length) console.log("\nTudo certo.");
process.exit(erros.length ? 1 : 0);
