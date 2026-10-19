/* Controla a seção "O Mundo":
   - FAQ sobre a história do mundo (perguntas que abrem e fecham)
   - mapa ilustrado da cidade com marcadores clicáveis (cada marcador abre o painel do lugar)
   - pulso da cidade: painel de indicadores (oxigênio, energia, paredes...)
   Todo o conteúdo vem de dados-mundo-habitantes.js. Quando o idioma muda, tudo é desenhado de novo. */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const dados = window.DADOS_MUNDO_HABITANTES;
    if (!dados || !window.IDIOMA) return;

    const { lugares, indicadores } = dados;
    const { t, lista, rotulo } = window.IDIOMA;

    // Evita que texto dos dados vire HTML sem querer (boa prática ao usar innerHTML)
    function esc(texto) {
      return String(texto)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }

    /* ======================= FAQ ======================= */

    const faq = document.querySelector(".faq");

    // Abre ou fecha uma pergunta (o CSS cuida da animação). Cada pergunta é independente das outras.
    function alternarPergunta(item) {
      const aberto = item.classList.toggle("faq__item--aberto");
      item.querySelector(".faq__botao").setAttribute("aria-expanded", aberto);
      item.querySelector(".faq__resposta").inert = !aberto;   // fechada = fora do alcance do teclado
    }

    if (faq) {
      faq.addEventListener("click", (evento) => {
        const botao = evento.target.closest(".faq__botao");
        if (botao) alternarPergunta(botao.closest(".faq__item"));
      });
    }

    /* ======================= PULSO DA CIDADE ======================= */

    const grade = document.getElementById("pulsoGrade");

    // Ícones intuitivos e representativos para cada estado de recurso vital
    const iconesEstado = {
      estavel: "fa-solid fa-circle-check",
      atencao: "fa-solid fa-triangle-exclamation",
      risco: "fa-solid fa-circle-exclamation"
    };

    function criarIndicadores() {
      grade.innerHTML = indicadores.map((i) => {
        const icone = iconesEstado[i.estado] || "fa-solid fa-circle-info";
        return `
        <article class="indicador indicador--${esc(i.estado)}">
          <header class="indicador__linha">
            <h4 class="indicador__nome">${esc(rotulo(i.id))}</h4>
            <span class="indicador__estado indicador__estado--${esc(i.estado)}">
              <i class="${icone} indicador__icone" aria-hidden="true"></i>
              <span>${esc(rotulo(i.estado))}</span>
            </span>
          </header>
          <div class="indicador__medida">
            <p class="indicador__valor">${esc(i.valor)}<span class="indicador__unidade">${esc(i.unidade)}</span></p>
            <span class="indicador__tendencia">${esc(rotulo(i.tendencia))}</span>
          </div>
          <div class="indicador__barra" role="img" aria-label="${esc(i.valor)} ${esc(i.unidade)}"><span style="width:${Number(i.barra)}%"></span></div>
          <p class="indicador__nota">${esc(t(i, "nota"))}</p>
        </article>`;
      }).join("");
    }

    /* ======================= MAPA DA CIDADE ======================= */

    const areaMapa = document.getElementById("mapaCidade");
    const painel = document.getElementById("painelLugar");

    // O que está selecionado ou aberto agora (guardado para sobreviver à troca de idioma)
    const estado = { lugarAtivo: lugares[0].id, avisoAberto: null, pontoAberto: null };

    // Cria os marcadores em cima da imagem do mapa. A posição vem dos dados em porcentagem,
    // então acompanha o tamanho da imagem em qualquer tela.
    function criarMarcadores() {
      areaMapa.querySelectorAll(".marcador").forEach((m) => m.remove());
      areaMapa.insertAdjacentHTML("beforeend", lugares.map((lugar) => {
        // a etiqueta fica à direita do ponto, a menos que o dado diga outro lado (ou o ponto esteja perto da borda)
        const esquerda = lugar.lado ? lugar.lado === "esquerda" : lugar.pin.x > 62;
        const lado = esquerda ? "marcador--esquerda" : "";
        const atencao = lugar.tom === "atencao" ? "marcador--atencao" : "";
        return `
          <button type="button" class="marcador ${lado} ${atencao}" data-lugar="${esc(lugar.id)}"
                  style="left:${Number(lugar.pin.x)}%; top:${Number(lugar.pin.y)}%"
                  aria-pressed="false" aria-label="${esc(t(lugar, "nome"))}">
            <span class="marcador__ponto"></span>
            <span class="marcador__nome">${esc(t(lugar, "nome"))}</span>
          </button>`;
      }).join(""));
    }

    // Redesenha o painel com o lugar selecionado
    function desenharPainel() {
      const lugar = lugares.find((l) => l.id === estado.lugarAtivo) || lugares[0];

      areaMapa.querySelectorAll("[data-lugar]").forEach((botao) => {
        const ativo = botao.dataset.lugar === lugar.id;
        botao.classList.toggle("marcador--ativo", ativo);
        botao.setAttribute("aria-pressed", ativo);
      });

      const avisos = lugar.avisos.map((aviso) => {
        const aberto = estado.avisoAberto === aviso.id;
        const passos = lista(aviso, "rastro").length
          ? lista(aviso, "rastro").map((p) => `<li>${esc(p)}</li>`).join("")
          : `<li>${esc(rotulo("semRastro"))}</li>`;
        return `
          <li>
            <button type="button" class="lugar__aviso" data-aviso="${esc(aviso.id)}" aria-expanded="${aberto}">
              <span class="lugar__opcao-texto">${esc(t(aviso, "texto"))}</span>
              <span class="lugar__icone" aria-hidden="true"></span>
            </button>
            ${aberto ? `<ol class="lugar__rastro">${passos}</ol>` : ""}
          </li>`;
      }).join("");

      const pontos = lugar.pontos.map((ponto) => {
        const aberto = estado.pontoAberto === ponto.id;
        return `
          <li>
            <button type="button" class="lugar__poi" data-ponto="${esc(ponto.id)}" aria-expanded="${aberto}">
              <span class="lugar__opcao-texto">${esc(t(ponto, "nome"))}</span>
              <span class="lugar__icone" aria-hidden="true"></span>
            </button>
            ${aberto ? `
              <div class="lugar__info">
                <div>
                  <p class="lugar__info-titulo">${esc(rotulo("fazer"))}</p>
                  ${lista(ponto, "fazer").map((f) => `<p>${esc(f)}</p>`).join("")}
                </div>
                <div>
                  <p class="lugar__info-titulo">${esc(rotulo("tem"))}</p>
                  ${lista(ponto, "tem").map((x) => `<p>${esc(x)}</p>`).join("")}
                </div>
              </div>` : ""}
          </li>`;
      }).join("");

      painel.innerHTML = `
        <figure class="lugar__foto">
          <img src="${esc(lugar.foto)}" alt="${esc(t(lugar, "fotoAlt"))}" style="object-position:${esc(lugar.fotoPos || "50% 50%")}" width="1000" height="563">
          <figcaption>${esc(t(lugar, "legenda"))}</figcaption>
        </figure>

        <div class="lugar__corpo">
          <header class="lugar__cabecalho">
            <h3 class="lugar__nome">${esc(t(lugar, "nome"))}</h3>
            <span class="lugar__estado lugar__estado--${esc(lugar.tom)}">${esc(t(lugar, "estado"))}</span>
          </header>
          <p class="lugar__resumo">${esc(t(lugar, "resumo"))}</p>

          ${lugar.avisos.length ? `
            <h4 class="lugar__subtitulo">${esc(rotulo("avisos"))}</h4>
            <ul class="lugar__lista">${avisos}</ul>` : ""}

          <h4 class="lugar__subtitulo">${esc(rotulo("lugares"))}</h4>
          <ul class="lugar__lista">${pontos}</ul>
        </div>`;
    }

    function desenharTudo() {
      if (grade) criarIndicadores();
      if (areaMapa && painel) {
        criarMarcadores();
        desenharPainel();
      }
    }

    if (areaMapa && painel) {
      // Um único ouvinte no mapa escuta o clique de todos os marcadores (delegação de eventos)
      areaMapa.addEventListener("click", (evento) => {
        const botao = evento.target.closest("[data-lugar]");
        if (!botao) return;
        estado.lugarAtivo = botao.dataset.lugar;
        estado.avisoAberto = null;   // trocar de lugar fecha os painéis abertos
        estado.pontoAberto = null;
        desenharPainel();

        // Em tela estreita o painel fica abaixo do mapa: leva a pessoa até ele para ela perceber que mudou
        if (window.matchMedia("(max-width: 1023px)").matches) {
          painel.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });

      painel.addEventListener("click", (evento) => {
        const aviso = evento.target.closest("[data-aviso]");
        const ponto = evento.target.closest("[data-ponto]");

        if (aviso) {
          const id = aviso.dataset.aviso;
          estado.avisoAberto = estado.avisoAberto === id ? null : id;   // abre ou fecha
          desenharPainel();
          painel.querySelector(`[data-aviso="${id}"]`)?.focus();        // mantém o foco no botão
        } else if (ponto) {
          const id = ponto.dataset.ponto;
          estado.pontoAberto = estado.pontoAberto === id ? null : id;
          desenharPainel();
          painel.querySelector(`[data-ponto="${id}"]`)?.focus();
        }
      });
    }

    desenharTudo();
    document.addEventListener("idioma:alterado", desenharTudo);   // troca de idioma = redesenhar
  });
})();
