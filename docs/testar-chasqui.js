/* Testa o Chasqui com as frases de docs/chasqui-casos.js e mostra onde ele errou.
   Uso (na pasta do projeto):   node docs/testar-chasqui.js
   Para ver o ranking de uma frase só:   node docs/testar-chasqui.js "a parede está rangendo"
   Sai com erro (código 1) se alguma frase de exemplo falhar. */

const path = require("path");
const CHASQUI = require(path.join(__dirname, "../assets/js/chasqui-palavras.js"));

const frase = process.argv[2];
if (frase) {
  console.log(`"${frase}"\n`);
  CHASQUI.pontuar(frase).forEach((r) =>
    console.log(`  ${r.id.padEnd(6)} ${String(r.pontos).padStart(2)} pontos  ${r.achadas.join(", ")}`));
  const r = CHASQUI.consultar(frase);
  console.log(r ? `\n  -> atende: ${r.id}${r.reforco ? ` (reforço: ${r.reforco})` : ""}` : "\n  -> ninguém (o Chasqui diria que não achou)");
  process.exit(0);
}

const casos = require("./chasqui-casos.js");
const erros = [];
casos.forEach(([texto, esperado]) => {
  const r = CHASQUI.consultar(texto);
  const veio = r ? r.id : "__nenhum__";
  if (veio !== esperado) erros.push(`  esperado ${esperado}, veio ${veio}  <-  ${texto}`);
});

const acertos = casos.length - erros.length;
console.log(`Chasqui: ${acertos} de ${casos.length} frases certas (${Math.round((100 * acertos) / casos.length)}%)`);
if (erros.length) {
  console.log("\nErrou:\n" + erros.join("\n"));
  console.log('\nPara ver por quê:  node docs/testar-chasqui.js "<a frase>"');
  process.exit(1);
}
