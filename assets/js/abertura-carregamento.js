/* ==========================================================================
   PASSAGEM DA ABERTURA PARA A HERO (PORTAL KHIPU)
   - A abertura visível é a de mergulho (abertura.js + abertura.css), a cada carregamento.
   - Aqui fica só a passagem: libera o scroll, foca a hero (WCAG 2.4.3), inicia as animações
     submarinas e abre o livro. Sem o mergulho (?pular, movimento reduzido, animações
     pausadas), a passagem é imediata.
   ========================================================================== */

(function () {
  "use strict";

  let finalizado = false;

  function inicializarAbertura() {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    // A tela de abertura é a de mergulho (abertura.js, 10 s), que cobre a página. Este arquivo cuida só da
    // passagem: ao fim do mergulho libera o scroll, foca a hero e abre o livro. Sem o mergulho
    // (?pular, movimento reduzido ou animações pausadas), a passagem é imediata.
    if (document.documentElement.classList.contains("abertura-ativa")) {
      window.addEventListener("abertura:fim", () => finalizarAbertura(true), { once: true });
      return;
    }
    finalizarAbertura(true);
  }

  function finalizarAbertura(imediato = false) {
    if (finalizado) return;
    finalizado = true;

    // Cancela o timeout de emergência global se ainda ativo
    if (window.__timeoutSegurancaAbertura) {
      clearTimeout(window.__timeoutSegurancaAbertura);
      window.__timeoutSegurancaAbertura = null;
    }

    const abertura = document.getElementById("aberturaCarregamento");
    const hero = document.getElementById("inicio");
    const statusTexto = document.getElementById("aberturaStatusTexto");

    // Atualiza anúncio acessível para tecnologias assistivas
    if (statusTexto) {
      statusTexto.textContent = "Portal pronto para navegação.";
    }

    // Transição imediata (modo sem animações ou erro de nós)
    if (imediato || !abertura || !hero) {
      if (abertura) {
        abertura.classList.add("abertura-carregamento--oculta");
        abertura.remove();
      }
      document.body.classList.remove("em-abertura", "aguardando-hero");
      window.scrollTo(0, 0);
      window.dispatchEvent(new Event("scroll"));

      // Transfere foco acessível para a Hero
      if (hero) {
        hero.focus({ preventScroll: true });
      }

      if (typeof window.iniciarAnimacoesSubmarinas === "function") {
        window.iniciarAnimacoesSubmarinas();
      }
      if (typeof window.executarAnimacaoAberturaLivro === "function") {
        window.executarAnimacaoAberturaLivro();
      }
      return;
    }

    // Transição fluida: libera o scroll e desliza suavemente para baixo até a hero
    document.body.classList.remove("em-abertura");
    document.body.classList.add("aguardando-hero");

    // Rola suavemente até o topo da hero section
    hero.scrollIntoView({ behavior: "smooth", block: "start" });

    let heroEnquadrada = false;
    let timerScroll = null;

    const onHeroChegouNaPosicao = () => {
      if (heroEnquadrada) return;
      heroEnquadrada = true;
      window.removeEventListener("scroll", monitorarChegadaHero);

      // 1. O livro surge na tela ao remover aguardando-hero
      document.body.classList.remove("aguardando-hero");

      // 2. Quando o livro surgir, a abertura é deletada
      if (abertura && abertura.parentNode) {
        abertura.classList.add("abertura-carregamento--oculta");
        abertura.remove();
      }

      window.scrollTo({ top: 0, behavior: "instant" });
      window.dispatchEvent(new Event("scroll"));

      // Transfere foco acessível para a Hero section (WCAG 2.4.3)
      if (hero) {
        hero.focus({ preventScroll: true });
      }

      // 3. Inicia animações submarinas e animação de abertura do livro
      if (typeof window.iniciarAnimacoesSubmarinas === "function") {
        window.iniciarAnimacoesSubmarinas();
      }
      if (typeof window.executarAnimacaoAberturaLivro === "function") {
        window.executarAnimacaoAberturaLivro();
      }
    };

    const monitorarChegadaHero = () => {
      clearTimeout(timerScroll);
      const rect = hero.getBoundingClientRect();
      if (Math.abs(rect.top) <= 8) {
        onHeroChegouNaPosicao();
        return;
      }
      timerScroll = setTimeout(onHeroChegouNaPosicao, 180);
    };

    window.addEventListener("scroll", monitorarChegadaHero, { passive: true });

    // Fallback de segurança para garantir a execução caso o navegador termine o scroll suave
    setTimeout(() => {
      if (!heroEnquadrada) {
        onHeroChegouNaPosicao();
      }
    }, 1400);
  }

  // API global para encerramento programático seguro
  window.concluirAbertura = finalizarAbertura;

  // Pausar/retomar de forma inteligente caso a aba seja alternada durante a abertura
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !finalizado && !document.documentElement.classList.contains("abertura-ativa")) {
      // Se a aba foi escondida durante a abertura, finaliza de forma silenciosa para não prender o usuário
      finalizarAbertura(true);
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializarAbertura);
  } else {
    inicializarAbertura();
  }
})();
