/* Executa todas as 4 conferências automatizadas do projeto Khipu em lote.
   Uso (na raiz do projeto): node assets/js/tests/testar-tudo.js
   Sai com código 0 se tudo passar ou 1 se algum teste falhar. */

const { spawnSync } = require("child_process");
const path = require("path");

const testes = [
  { nome: "1. Tradução Atlante (dados-secoes.js)", arquivo: "verificar-atlante.js" },
  { nome: "2. Dicionários e Chaves (dicionarios.js vs index.html)", arquivo: "verificar-idiomas.js" },
  { nome: "3. Palavras-chave do Chasqui (chasqui-motor.js)", arquivo: "verificar-palavras-chave.js" },
  { nome: "4. Casos de Teste do Chasqui (358 frases)", arquivo: "testar-chasqui.js" }
];

console.log("=== INICIANDO VALIDAÇÃO DO PROJETO KHIPU (GUARACI) ===\n");

let falhas = 0;

testes.forEach(({ nome, arquivo }) => {
  const caminho = path.join(__dirname, arquivo);
  console.log(`[TESTE] ${nome}...`);
  const resultado = spawnSync(process.execPath, [caminho], { encoding: "utf8" });

  if (resultado.status === 0) {
    if (resultado.stdout.trim()) {
      console.log(resultado.stdout.trim().split("\n").map(l => "   " + l).join("\n"));
    }
    console.log(`-> OK: ${nome}\n`);
  } else {
    falhas++;
    console.error(`-> FALHA em ${nome} (código ${resultado.status}):`);
    if (resultado.stdout) console.error(resultado.stdout);
    if (resultado.stderr) console.error(resultado.stderr);
    console.error("");
  }
});

if (falhas === 0) {
  console.log("=== SUCESSO: Todas as 4 baterias de testes foram aprovadas com 100%! ===");
  process.exit(0);
} else {
  console.error(`=== ERRO: ${falhas} bateria(s) de testes falharam. Verifique os logs acima. ===`);
  process.exit(1);
}
