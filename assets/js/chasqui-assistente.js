/**
 * CHASQUIBOT — O MENSAGEIRO DE GUARACI
 * Botão flutuante de chatbot acessível e painel de conversação com tags rápidas.
 * Usa o motor window.CHASQUI e o renderizador window.CHASQUI_UI.
 */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const gatilho = document.getElementById("chasquiGatilho");
    const painel = document.getElementById("chasquiPainel");
    const container = document.getElementById("chasquiAssistente");
    const form = document.getElementById("chasquiAssistenteForm");
    const input = document.getElementById("chasquiAssistenteInput");
    const contador = document.getElementById("chasquiAssistenteContador");
    const log = document.getElementById("chasquiLog");
    const btnFechar = document.getElementById("chasquiFechar");

    if (!gatilho || !painel || !form || !input || !log) return;

    // Helpers de internacionalização
    function obterIdioma() {
      return window.IDIOMA || {
        rotulo: (c) => c,
        t: (obj, k) => (obj ? obj[k] : ""),
        lista: (obj, k) => (obj && obj[k] ? obj[k] : [])
      };
    }

    function esc(texto) {
      return String(texto || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    function consultar(missao) {
      if (window.CHASQUI_UI && typeof window.CHASQUI_UI.consultar === "function") {
        return window.CHASQUI_UI.consultar(missao);
      }
      if (!window.CHASQUI || !window.DADOS_MUNDO_HABITANTES) return null;
      const r = window.CHASQUI.consultar(missao);
      if (!r) return null;
      const { habitantes } = window.DADOS_MUNDO_HABITANTES;
      const achar = (id) => habitantes.find((h) => h.id === id);
      return { habitante: achar(r.id), palavras: r.palavras, reforco: r.reforco ? achar(r.reforco) : null };
    }

    // Configuração das tags de missões frequentes
    const tagsFrequentes = [
      { chave: "chasquiTagAlgas", icone: "fa-seedling" },
      { chave: "chasquiTagRadio", icone: "fa-tower-broadcast" },
      { chave: "chasquiTagEnergia", icone: "fa-bolt" },
      { chave: "chasquiTagMergulho", icone: "fa-water" }
    ];

    // Histórico de mensagens do chat
    const historico = [
      { tipo: "boasVindas" }
    ];

    // Renderiza todo o histórico de balões (recalcula no idioma atual)
    function renderizarConversa() {
      const { rotulo, t, lista } = obterIdioma();
      const fragmento = historico.map((msg) => {
        if (msg.tipo === "boasVindas") {
          const tagsHtml = tagsFrequentes.map((tInfo) => {
            const textoTag = rotulo(tInfo.chave);
            return `
              <button type="button" class="chasqui-tag-btn" data-tag-chave="${esc(tInfo.chave)}" data-missao="${esc(textoTag)}">
                <i class="fa-solid ${esc(tInfo.icone)}" aria-hidden="true"></i>
                <span>${esc(textoTag)}</span>
              </button>`;
          }).join("");

          return `
            <div class="chasqui-mensagem chasqui-mensagem--chasqui">
              <div class="chasqui-mensagem__balao">
                <p>${esc(rotulo("chasquiBoasVindas"))}</p>
                <div class="chasqui-assistente__tags-bloco">
                  <span class="chasqui-assistente__tags-titulo">${esc(rotulo("chasquiTagsTitulo"))}</span>
                  <div class="chasqui-assistente__tags-lista">
                    ${tagsHtml}
                  </div>
                </div>
              </div>
            </div>`;
        }

        if (msg.tipo === "usuario") {
          return `
            <div class="chasqui-mensagem chasqui-mensagem--usuario">
              <div class="chasqui-mensagem__balao">
                <p>${esc(msg.texto)}</p>
              </div>
            </div>`;
        }

        if (msg.tipo === "erro") {
          return `
            <div class="chasqui-mensagem chasqui-mensagem--chasqui chasqui-mensagem--erro">
              <div class="chasqui-mensagem__balao">
                <p>${esc(rotulo(msg.chaveErro))}</p>
              </div>
            </div>`;
        }

        if (msg.tipo === "resultado") {
          const resultadoAtual = consultar(msg.missao);
          let htmlConteudo = "";

          if (resultadoAtual && window.CHASQUI_UI && typeof window.CHASQUI_UI.htmlResultado === "function") {
            htmlConteudo = window.CHASQUI_UI.htmlResultado(resultadoAtual, { esc, t, rotulo, lista });
          } else {
            htmlConteudo = `<p>${esc(rotulo("erroNinguem"))}</p>`;
          }

          return `
            <div class="chasqui-mensagem chasqui-mensagem--chasqui">
              <div class="chasqui-mensagem__balao">
                ${htmlConteudo}
              </div>
            </div>`;
        }

        return "";
      }).join("");

      log.innerHTML = fragmento;
      log.scrollTop = log.scrollHeight;
    }

    // Processa o envio de uma missão
    function processarMissao(missao) {
      if (!missao) return;

      historico.push({ tipo: "usuario", texto: missao });

      if (missao.length < 10) {
        historico.push({ tipo: "erro", chaveErro: "erroCurto" });
      } else {
        const r = consultar(missao);
        if (r) {
          historico.push({ tipo: "resultado", missao });
        } else {
          historico.push({ tipo: "erro", chaveErro: "erroNinguem" });
        }
      }

      input.value = "";
      if (contador) contador.textContent = "0/800";
      renderizarConversa();
    }

    // Clique nas tags de perguntas rápidas
    log.addEventListener("click", (e) => {
      const btnTag = e.target.closest(".chasqui-tag-btn");
      if (!btnTag) return;
      e.preventDefault();
      e.stopPropagation();
      const chave = btnTag.getAttribute("data-tag-chave");
      const { rotulo } = obterIdioma();
      const missao = (chave && rotulo(chave)) || btnTag.getAttribute("data-missao");
      if (missao) {
        processarMissao(missao);
      }
    });

    // Atualiza rótulos estáticos de interface
    function atualizarTextos() {
      const { rotulo } = obterIdioma();

      container.querySelectorAll("[data-rotulo]").forEach((el) => {
        const chave = el.getAttribute("data-rotulo");
        const texto = rotulo(chave);
        if (texto) el.textContent = texto;
      });

      container.querySelectorAll("[data-rotulo-placeholder]").forEach((el) => {
        const chave = el.getAttribute("data-rotulo-placeholder");
        const texto = rotulo(chave);
        if (texto) el.setAttribute("placeholder", texto);
      });

      container.querySelectorAll("[data-rotulo-aria]").forEach((el) => {
        const chave = el.getAttribute("data-rotulo-aria");
        const texto = rotulo(chave);
        if (texto) el.setAttribute("aria-label", texto);
      });

      renderizarConversa();
    }

    // Abertura e fechamento
    function alternarPainel(forcarAberto) {
      const estaAberto = !painel.hidden;
      const abrir = typeof forcarAberto === "boolean" ? forcarAberto : !estaAberto;

      painel.hidden = !abrir;
      gatilho.setAttribute("aria-expanded", String(abrir));
      if (container) {
        container.classList.toggle("chasqui-assistente--aberto", abrir);
      }

      if (abrir) {
        log.scrollTop = log.scrollHeight;
        input.focus();
      } else {
        gatilho.focus();
      }
    }

    // Evita que cliques internos dentro do assistente borbulhem para o fechamento global
    container.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // Eventos do Gatilho e Fechar
    gatilho.addEventListener("click", (e) => {
      e.stopPropagation();
      alternarPainel();
    });

    if (btnFechar) {
      btnFechar.addEventListener("click", (e) => {
        e.stopPropagation();
        alternarPainel(false);
      });
    }

    // Fechar ao teclar Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !painel.hidden) {
        alternarPainel(false);
      }
    });

    // Fechar ao clicar fora (usa composedPath para não falhar caso o nó clicado tenha sido recriado)
    document.addEventListener("click", (e) => {
      const path = typeof e.composedPath === "function" ? e.composedPath() : [];
      const clicouDentro = path.includes(container) || container.contains(e.target);
      if (!painel.hidden && !clicouDentro) {
        alternarPainel(false);
      }
    });

    // Contador de caracteres e quebra de linha com Shift+Enter
    input.addEventListener("input", () => {
      if (contador) {
        contador.textContent = `${input.value.length}/800`;
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        form.dispatchEvent(new Event("submit", { cancelable: true }));
      }
    });

    // Envio do formulário da missão
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const missao = input.value.trim();
      processarMissao(missao);
    });

    // Inicialização e escuta da troca de idioma
    atualizarTextos();
    document.addEventListener("idioma:alterado", atualizarTextos);
  });
})();
