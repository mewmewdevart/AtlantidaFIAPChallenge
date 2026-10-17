/* Controla a seção "Habitantes": crachás com dossiê expansível e o Chasqui (indica quem pode ajudar numa missão).
   Todo o conteúdo vem de dados-mundo-habitantes.js. Quando o idioma muda, tudo é desenhado de novo. */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const dados = window.DADOS_MUNDO_HABITANTES;
    const listaHabitantes = document.getElementById("listaHabitantes");
    if (!dados || !window.IDIOMA || !listaHabitantes) return;

    const { habitantes, chasqui: palavrasChasqui } = dados;
    const { t, lista, rotulo } = window.IDIOMA;

    // Evita que texto dos dados vire HTML sem querer (boa prática ao usar innerHTML)
    function esc(texto) {
      return String(texto)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }

    /* ======================= CRACHÁS ======================= */

    const abertos = new Set();   // ids dos crachás abertos (assim eles continuam abertos ao trocar de idioma)

    // Monta o HTML de UM crachá a partir dos dados de um habitante
    function criarCracha(h) {
      const aberto = abertos.has(h.id);
      return `
        <article class="cracha papel ${aberto ? "cracha--aberto" : ""}" data-id="${esc(h.id)}">
          <button type="button" class="cracha__principal" data-alternar aria-expanded="${aberto}">
            <span class="cracha__foto">
              <img src="${esc(h.retrato)}" alt="${esc(rotulo("retratoDe"))} ${esc(t(h, "nome"))}" loading="lazy" width="800" height="800">
            </span>
            <span class="cracha__info">
              <span class="cracha__nome">${esc(t(h, "nome"))}</span>
              <span class="cracha__funcao">${esc(t(h, "funcao"))}</span>
              <span class="cracha__bio">${esc(t(h, "bio"))}</span>
            </span>
          </button>

          <div class="dossie-envoltorio">
            <div class="dossie" ${aberto ? "" : "inert"}>
              <div class="dossie__interno">
                <dl class="dossie__dados">
                  <div><dt>${esc(rotulo("nomeInteiro"))}</dt><dd>${esc(t(h, "nomeInteiro"))}</dd></div>
                  <div><dt>${esc(rotulo("onde"))}</dt><dd>${esc(t(h, "onde"))}</dd></div>
                </dl>
                <p class="dossie__titulo">${esc(rotulo("sabe"))}</p>
                <ul class="dossie__sabe">${lista(h, "sabe").map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
                <p class="dossie__bio">${esc(t(h, "bio"))}</p>
                <blockquote class="dossie__frase">
                  <p>${esc(t(h, "frase"))}</p>
                </blockquote>
              </div>
            </div>
          </div>

          <div class="cracha__rodape">
            <p class="cracha__lugar">${esc(t(h, "lugar"))}</p>
            <button type="button" class="botao botao--secundario cracha__botao" data-alternar aria-expanded="${aberto}">
              <span data-rotulo-abrir ${aberto ? "hidden" : ""}>${esc(rotulo("abrir"))}</span>
              <span data-rotulo-fechar ${aberto ? "" : "hidden"}>${esc(rotulo("fechar"))}</span>
            </button>
          </div>
        </article>`;
    }

    // Abre ou fecha o dossiê de um crachá (o CSS cuida da animação)
    function alternarDossie(cracha) {
      const aberto = cracha.classList.toggle("cracha--aberto");
      aberto ? abertos.add(cracha.dataset.id) : abertos.delete(cracha.dataset.id);
      cracha.querySelectorAll("[data-alternar]").forEach((b) => b.setAttribute("aria-expanded", aberto));
      cracha.querySelector(".dossie").inert = !aberto;               // fechado = fora do alcance do teclado
      cracha.querySelector("[data-rotulo-abrir]").hidden = aberto;   // alterna os dois rótulos
      cracha.querySelector("[data-rotulo-fechar]").hidden = !aberto;
    }

    // Um único ouvinte para os 6 crachás
    listaHabitantes.addEventListener("click", (evento) => {
      const botao = evento.target.closest("[data-alternar]");
      if (!botao) return;
      alternarDossie(botao.closest(".cracha"));
    });

    function desenharCrachas() {
      listaHabitantes.innerHTML = habitantes.map(criarCracha).join("");
    }

    /* ======================= CHASQUI ======================= */
    /* Chasqui era o mensageiro que corria os caminhos do mundo andino levando recados.
       Aqui ele lê a missão e volta com o nome de quem pode atender. */

    const form = document.getElementById("chasquiForm");
    const campo = document.getElementById("chasquiTexto");
    const contador = document.getElementById("chasquiContador");
    const erro = document.getElementById("chasquiErro");
    const resultado = document.getElementById("chasquiResultado");

    // O que o Chasqui está mostrando agora (guardado para refazer a tela ao trocar de idioma)
    const chasquiEstado = { missao: null, erro: null };

    // Tira acentos e deixa minúsculo: "Antepara RANGENDO, infiltração" -> "antepara rangendo, infiltracao"
    function normalizar(texto) {
      return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    }

    // Conta quantas palavras-chave de cada habitante aparecem na missão (em português ou em Atlante)
    // e guarda a palavra COMO A PESSOA DIGITOU, para mostrar no resultado.
    function pontuar(missao) {
      const texto = normalizar(missao);
      return habitantes.map((h) => {
        const dadosH = palavrasChasqui[h.id];
        const achadas = [];
        [...dadosH.palavras, ...(dadosH.palavras_atl || [])].forEach((p) => {
          const m = new RegExp("(^|[^a-z])" + normalizar(p) + "[a-z']*").exec(texto);
          if (m) {
            const inicio = m.index + m[1].length;
            achadas.push(missao.slice(inicio, m.index + m[0].length).toLowerCase());
          }
        });
        return { habitante: h, achadas: [...new Set(achadas)] };
      }).sort((a, b) => b.achadas.length - a.achadas.length);
    }

    // Devolve quem pode atender a missão, ou null se nenhuma palavra bater com ninguém
    function consultar(missao) {
      const [primeiro, segundo] = pontuar(missao);
      if (primeiro.achadas.length === 0) return null;
      return {
        habitante: primeiro.habitante,
        palavras: primeiro.achadas,
        reforco: segundo.achadas.length > 0 ? segundo.habitante : null,
      };
    }

    function mostrarResultado(r) {
      const h = r.habitante;
      const motivo = `${rotulo("voceFalou")} ${r.palavras.join(", ")}. ${t(h, "nome")} (${t(h, "funcao")}) ${rotulo("sabeFazer")} ${lista(h, "sabe").slice(0, 2).join(", ")}.`;
      const passos = lista(palavrasChasqui[h.id], "passos");

      resultado.innerHTML = `
        <div class="chasqui__resultado">
          <img class="chasqui__foto" src="${esc(h.retrato)}" alt="${esc(t(h, "nome"))}" width="144" height="144">
          <div>
            <p class="chasqui__chame">${esc(rotulo("chame"))} ${esc(t(h, "nome"))}</p>
            <h4 class="chasqui__nome">${esc(t(h, "nome"))}, ${esc(t(h, "funcao"))}</h4>
            <p class="chasqui__motivo">${esc(motivo)}</p>
            <p class="chasqui__subtitulo">${esc(rotulo("comecar"))}</p>
            <ol class="chasqui__passos">${passos.map((p) => `<li>${esc(p)}</li>`).join("")}</ol>
            ${r.reforco ? `<p class="chasqui__reforco">${esc(rotulo("maisMaos"))} ${esc(t(r.reforco, "nome"))} (${esc(t(r.reforco, "funcao"))}).</p>` : ""}
          </div>
        </div>`;
    }

    // Desenha o que o Chasqui deve mostrar agora: o resultado, uma mensagem de erro ou nada
    function desenharChasqui() {
      erro.textContent = chasquiEstado.erro ? rotulo(chasquiEstado.erro) : "";
      resultado.innerHTML = "";
      if (chasquiEstado.missao) {
        const r = consultar(chasquiEstado.missao);
        if (r) mostrarResultado(r);
      }
    }

    if (form) {
      campo.addEventListener("input", () => {
        contador.textContent = `${campo.value.length}/800`;
      });

      form.addEventListener("submit", (evento) => {
        evento.preventDefault();                        // não recarregar a página
        const missao = campo.value.trim();
        chasquiEstado.missao = null;
        chasquiEstado.erro = null;

        if (missao.length < 10) {
          chasquiEstado.erro = "erroCurto";
        } else if (consultar(missao)) {
          chasquiEstado.missao = missao;
        } else {
          chasquiEstado.erro = "erroNinguem";
        }
        desenharChasqui();
      });
    }

    function desenharTudo() {
      desenharCrachas();
      desenharChasqui();
    }

    desenharTudo();
    document.addEventListener("idioma:alterado", desenharTudo);   // troca de idioma = redesenhar
  });
})();
