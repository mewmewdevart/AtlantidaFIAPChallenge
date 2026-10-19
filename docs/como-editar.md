# Como editar as seções "O Mundo" e "Habitantes" (guia rápido para a arena)

Regra de ouro: **conteúdo = um arquivo só** (`assets/js/dados-mundo-habitantes.js`) e **textos fixos = `index.html`**. Não precisa mexer em CSS nem em JavaScript para trocar texto, estado ou imagem.

Depois de qualquer mudança: abra o `index.html`, troque o idioma no menu para ver o Atlante e rode as conferências (precisa do Node.js; se não tiver, só olhe os dois idiomas no navegador):

```bash
node assets/js/tests/verificar-atlante.js        # O Mundo e Habitantes: tudo tem Atlante? sobrou português?
node assets/js/tests/verificar-idiomas.js        # menu, hero, Mural, Contato, rodapé: mesmas chaves nos dois idiomas, caracteres
node assets/js/tests/testar-chasqui.js           # o Chasqui ainda acerta as frases de exemplo?
node assets/js/tests/verificar-palavras-chave.js # as listas têm repetição ou palavra comum demais?
```

## Onde fica cada coisa

| Quero mudar... | Arquivo | Onde |
|---|---|---|
| Parágrafos, Lei da casa, perguntas do FAQ | `index.html` | procure o texto; a versão em Atlante está no atributo `data-atl` da mesma tag |
| Lugares do mapa (nome, resumo, avisos, pontos) | `dados-mundo-habitantes.js` | lista `lugares` |
| Posição de um marcador no mapa | `dados-mundo-habitantes.js` | `pin: { x: 50, y: 47 }` (x = esquerda, y = topo, em %) |
| Habitantes (nome, bio, frase, retrato) | `dados-mundo-habitantes.js` | lista `habitantes` |
| Indicadores (número, estado, nota) | `dados-mundo-habitantes.js` | lista `indicadores` |
| Palavras que o Chasqui entende e os "primeiros passos" | `chasqui-palavras.js` | um bloco por habitante, com `forte`, `fraca` e `passos` (português e Atlante lado a lado) |
| Textos de menu, hero, Mural, Contato e rodapé (os que têm `data-i18n`) | `assets/lang/dicionarios.js` | blocos `ptBr` e `ptBrAtlantida`, mesma chave nos dois |
| Rótulos que não são do index.html (botões e títulos de bloco montados pelo JS) | `dados-mundo-habitantes.js` | objeto `rotulos` |
| Cores e fontes | `assets/css/variables.css` | variáveis `--cor-...` |

## Receitas

**Trocar um texto:** edite o campo em português e o `_atl` ao lado.
```js
nome: "Coração do Sol",
nome_atl: "Inti Sonqo",
```

**Mudar um indicador do "pulso da cidade":**
```js
{ id: "agua", valor: 71, barra: 71, unidade: "%",
  estado: "atencao",     // estavel (verde) | atencao (laranja) | risco (vermelho)
  tendencia: "cai",      // sobe | firme | cai
  nota: "...", nota_atl: "..." }
```
Para trocar o nome de um indicador (ex.: "Água"), edite `rotulos.agua`.

**Trocar um retrato:** substitua o arquivo em `assets/media/habitantes/` mantendo o nome, ou mude o campo `retrato`. Use imagem quadrada (800×800) em `.webp`.

**Novo habitante:** (1) copie um bloco de `habitantes` e mude os campos; (2) copie o bloco do mesmo `id` em `chasqui-palavras.js` e troque as palavras e os passos; (3) ponha o retrato em `assets/media/habitantes/`. A grade ajusta sozinha.

**Novo lugar no mapa:** copie um bloco de `lugares`, mude `id`, textos, `foto` e `pin`. O marcador aparece sozinho. Se a etiqueta ficar cortada na borda do mapa, use `lado: "esquerda"` ou `"direita"`.

**Nova pergunta do FAQ:** copie um bloco `<div class="faq__item">` do `index.html`. Troque o ano nos três lugares (`id`, `aria-controls`, `aria-labelledby`) e escreva os textos, cada um com seu `data-atl`.

**Mudar o nome da cidade:** o nome Ñandeyaku aparece em `index.html` e em `dados-mundo-habitantes.js`; use localizar e substituir nesses dois arquivos (e em `docs/glossario-atlantida.md`).

**Ensinar uma palavra nova ao Chasqui:** abra `assets/js/chasqui-palavras.js`, ache o habitante e ponha a palavra em `forte` (aponta direto para ele, vale 2 pontos) ou em `fraca` (pista, vale 1). Só o começo da palavra basta (`"cultiv"` pega cultivo e cultivar); termine com `$` para a palavra inteira (`"porta$"` não pega "portal"). As regras completas estão no comentário do topo do arquivo. Palavra repetida conta uma vez só, então pode ampliar a lista sem medo de dar ponto dobrado. Depois rode `node assets/js/tests/testar-chasqui.js` (frases de exemplo) e `node assets/js/tests/verificar-palavras-chave.js` (avisa de palavra comum demais, como "uma" ou "para", que faria o Chasqui responder fora de hora). Quando alguém escrever na arena uma frase que o Chasqui errou, acrescente a frase e o habitante certo em `assets/js/tests/chasqui-casos.js`.

**Mudar um texto do menu, do hero ou do rodapé:** edite a chave em `assets/lang/dicionarios.js`, nos dois blocos (`ptBr` e `ptBrAtlantida`). Textos que o HTML marca com `data-atl="..."` ficam no próprio HTML.

## Padrão visual dos títulos (para não se perder)

| Nível | Onde | Fonte | Tamanho | Peso |
|---|---|---|---|---|
| Título do livro (h1) | hero | EB Garamond | `--titulo-hero` | 700 |
| Título de seção (h2) e número 02–05 | todas as seções | EB Garamond | `--titulo-secao-h2` / `--titulo-secao-numero` | 700 |
| Sobretítulo e subtítulo da seção | todas as seções | Outfit, maiúsculas | `--texto-xs` | 700 / 600 |
| Subseção (h3) | Mapa, Pulso, Quem pode ajudar? | EB Garamond | `--titulo-subsecao` | 600 |
| Título de cartão (h3) | Perguntas frequentes, Lei da casa | EB Garamond | `--texto-xl` | 600 |
| Nome (lugar, habitante) | cartões | EB Garamond | `--texto-3xl` | 500 |
| Item (h4) | Lugares, indicadores | EB Garamond | `--texto-lg` | 600 |

O cabeçalho numerado (`.secao__cabecalho`) é definido **uma vez só**, em `style.css`. Mudou ali, mudou nas quatro seções.

## Hero (livro 3D): o que não pode quebrar

- A ilustração (`.livro-3d__imagem-ilustracao`) tem 10,2 "unidades" de largura e o texto (`.livro-3d__conteudo-texto`) tem no máximo 6,5. A soma é de propósito: a ilustração entra um pouco na página do texto, mas nunca cobre as palavras. Se aumentar uma, diminua a outra.
- Abaixo de 1100px o livro vira uma coluna simples. O número aparece **duas vezes**: no `@media (max-width: 1100px)` de `style.css` e em `MAX_LARGURA_LIVRO_PLANO` no `atlantida-book-anim.js`. Troque nos dois.

## Acessibilidade: checklist rápido antes de entregar

- Cores de texto novas: use os tokens `-acessivel` de `variables.css` (contraste mínimo 4,5:1). Texto claro sobre botão: `--cor-oceano-acessivel`.
- Todo botão que faz algo tem `type="button"`; o que só leva a outra parte da página é um link (`<a href="#...">`).
- Imagem decorativa: `alt=""`. Imagem que informa: `alt` descrevendo, com `data-atl-alt` para o Atlante.
- Todo `aria-label` novo também ganha `data-atl-aria-label`.
- Alvos de toque com pelo menos 24px de altura (2rem nos links do rodapé).
- Teste de teclado: aperte Tab pela página toda; todo item deve mostrar o anel de foco, e Esc fecha o menu.

## O que cada arquivo faz

- `assets/lang/dicionarios.js`: todos os textos `data-i18n` nos dois idiomas (fonte única, funciona abrindo o arquivo com dois cliques).
- `assets/js/i18n.js` (da equipe): troca o idioma do site, atualiza o `lang` do `<html>` e avisa as outras partes com o evento `app:language-changed`.
- `assets/js/chasqui-palavras.js`: palavras-chave, passos e o motor de busca do Chasqui.
- `assets/js/idioma-secoes.js`: troca os textos com `data-atl` e oferece `IDIOMA.t(objeto, "campo")` para os scripts.
- `assets/js/secao-mundo.js` e `secao-habitantes.js`: leem os dados e montam o mapa, os indicadores, os crachás e o Chasqui. Redesenham tudo quando o idioma muda.
- `assets/css/secoes-comuns.css`, `secao-mundo.css`, `secao-habitantes.css`: visual das duas seções.

## Se algo não aparecer

1. Abra o console do navegador (F12). Erros de sintaxe nos dados (vírgula faltando, aspas abertas) aparecem lá.
2. Confira vírgulas entre os itens das listas e entre os campos do objeto.
3. `node docs/verificar-atlante.js` mostra campo sem tradução ou lista com tamanhos diferentes; `node docs/verificar-idiomas.js` faz o mesmo para o menu, o Mural e o Contato.
