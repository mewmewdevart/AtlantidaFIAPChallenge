/* ==========================================================================
   ABERTURA E TELA DE CARREGAMENTO (PORTAL KHIPU)
   - Exibe 80vh da abertura e 20vh da seção hero abaixo na carga inicial.
   - Coordenador de Prontidão Real: aguarda fontes tipográficas (document.fonts)
     e decodificação de imagem crítica da Hero com teto máximo seguro (timeout cap).
   - Animações dos peixes e fauna permanecem pausadas durante a abertura
     para não consumir CPU desnecessariamente.
   - Encerramento acessível: tecla Esc, botão Pular e skip-link transferem foco
     de forma estável para a seção Hero (WCAG 2.4.3 / 2.4.7).
   - Anúncio sonoro acessível para leitores de tela via aria-live (WCAG 4.1.3).
   - Transição suave acelerada por GPU, sem quebra de scroll nem saltos de layout (CLS = 0).
   ========================================================================== */

(function () {
  "use strict";

  let finalizado = false;
  let timerMinimo = null;
  let timerTetoMaximo = null;
  let timerDescidaLogo = null;
  let animacaoFlutuacaoLogo = null;
  let descidaConcluida = false;

  function animarDescidaLogo(onConcluido) {
    if (descidaConcluida) {
      if (typeof onConcluido === "function") onConcluido();
      return;
    }

    if (animacaoFlutuacaoLogo) {
      animacaoFlutuacaoLogo.kill();
      animacaoFlutuacaoLogo = null;
    }

    const abertura = document.getElementById("aberturaCarregamento");
    const logo = document.getElementById("aberturaLogo") || (abertura ? abertura.querySelector("img") : null);

    if (!logo || typeof window.gsap === "undefined") {
      descidaConcluida = true;
      if (typeof onConcluido === "function") onConcluido();
      return;
    }

    // Desliza suavemente para baixo passando por trás do Khipu, do slogan e dos prédios
    gsap.to(logo, {
      y: 280,
      opacity: 0,
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        descidaConcluida = true;
        if (typeof onConcluido === "function") onConcluido();
      }
    });
  }

  function inicializarAbertura() {
    const abertura = document.getElementById("aberturaCarregamento");
    if (!abertura) return;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const btnPular = document.getElementById("btnPularAbertura");
    const linkPular = document.getElementById("linkPularConteudo");
    const mediaQueryReduzido = window.matchMedia("(prefers-reduced-motion: reduce)");
    const salvoDesativado = (() => {
      try {
        return localStorage.getItem("atlantida_animacoes_desativadas") === "true";
      } catch (_) {
        return false;
      }
    })();
    const semAnimacoes =
      salvoDesativado ||
      document.body.classList.contains("sem-animacoes") ||
      document.documentElement.classList.contains("sem-animacoes") ||
      mediaQueryReduzido.matches;

    // Se o usuário pausou as animações ou prefere movimento reduzido, finaliza imediatamente sem exibir abertura
    if (semAnimacoes) {
      document.body.classList.add("sem-animacoes");
      finalizarAbertura(true);
      return;
    }

    // Ouvinte dinâmico para quando o usuário pausar as animações a qualquer momento
    window.addEventListener("animacoes:alteradas", (evento) => {
      const pausadas = evento.detail ? evento.detail.pausadas : false;
      if (pausadas && !finalizado) {
        finalizarAbertura(true);
      }
    });

    // Ouvinte para botão Pular da abertura
    if (btnPular) {
      btnPular.addEventListener("click", () => {
        finalizarAbertura(false);
      });
    }

    // Integrar com o skip-link nativo da página
    if (linkPular) {
      linkPular.addEventListener("click", (evento) => {
        if (!finalizado) {
          evento.preventDefault();
          finalizarAbertura(false);
        }
      });
    }

    // Tecla Escape para pular a abertura a qualquer momento
    document.addEventListener("keydown", (evento) => {
      if (evento.key === "Escape" && !finalizado) {
        finalizarAbertura(false);
      }
    });

    // Ouvir alterações dinâmicas na preferência de movimento reduzido
    if (mediaQueryReduzido.addEventListener) {
      mediaQueryReduzido.addEventListener("change", (e) => {
        if (e.matches && !finalizado) {
          finalizarAbertura(true);
        }
      });
    }

    const logoAbertura = document.getElementById("aberturaLogo") || abertura.querySelector("img");
    if (logoAbertura && typeof window.gsap !== "undefined") {
      gsap.set(logoAbertura, { y: 0, opacity: 1 });
      animacaoFlutuacaoLogo = gsap.to(logoAbertura, {
        y: -6,
        duration: 1.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    }

    // Inicia a descida suave do logo antes do término estético da abertura (a 3.6s dos 5s)
    timerDescidaLogo = setTimeout(() => {
      animarDescidaLogo();
    }, 3600);

    // ========================================================================
    // COORDENADOR DE PRONTIDÃO DE ASSETS REAIS
    // Aguarda fontes prontas + imagem crítica da Hero, com tempo mínimo estético
    // de 5s (5000ms) e teto máximo de segurança de 5s
    // ========================================================================
    const promessaFontes =
      document.fonts && typeof document.fonts.ready === "object"
        ? document.fonts.ready.catch(() => {})
        : Promise.resolve();

    const imgHero = document.querySelector(".livro-3d__imagem-ilustracao");
    const promessaImagem =
      imgHero && typeof imgHero.decode === "function"
        ? imgHero.decode().catch(() => {})
        : Promise.resolve();

    let tempoMinimoConcluido = false;
    timerMinimo = setTimeout(() => {
      tempoMinimoConcluido = true;
      verificarProntidao();
    }, 5000);

    let assetsProntos = false;
    Promise.all([promessaFontes, promessaImagem]).then(() => {
      assetsProntos = true;
      verificarProntidao();
    });

    function verificarProntidao() {
      if (tempoMinimoConcluido && assetsProntos && !finalizado) {
        finalizarAbertura(false);
      }
    }

    // Teto máximo de segurança (5s) para conexões lentas ou assets travados
    timerTetoMaximo = setTimeout(() => {
      if (!finalizado) {
        finalizarAbertura(false);
      }
    }, 5000);
  }

  function finalizarAbertura(imediato = false) {
    if (finalizado) return;
    finalizado = true;

    // Cancela o timeout de emergência global se ainda ativo
    if (window.__timeoutSegurancaAbertura) {
      clearTimeout(window.__timeoutSegurancaAbertura);
      window.__timeoutSegurancaAbertura = null;
    }
    if (timerMinimo) clearTimeout(timerMinimo);
    if (timerTetoMaximo) clearTimeout(timerTetoMaximo);
    if (timerDescidaLogo) clearTimeout(timerDescidaLogo);

    const abertura = document.getElementById("aberturaCarregamento");
    const hero = document.getElementById("inicio");
    const statusTexto = document.getElementById("aberturaStatusTexto");
    const logoAbertura = document.getElementById("aberturaLogo") || (abertura ? abertura.querySelector("img") : null);

    // Atualiza anúncio acessível para tecnologias assistivas
    if (statusTexto) {
      statusTexto.textContent = "Portal pronto para navegação.";
    }

    // Transição imediata (modo sem animações, skip acessível ou erro de nós)
    if (imediato || !abertura || !hero) {
      if (animacaoFlutuacaoLogo) {
        animacaoFlutuacaoLogo.kill();
        animacaoFlutuacaoLogo = null;
      }
      if (logoAbertura && typeof window.gsap !== "undefined") {
        gsap.killTweensOf(logoAbertura);
      }
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

    const executarTransicaoHero = () => {
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
    };

    // Garante que o logo termine a descida antes de iniciar a transição para a hero
    if (!descidaConcluida && logoAbertura && typeof window.gsap !== "undefined") {
      animarDescidaLogo(executarTransicaoHero);
    } else {
      executarTransicaoHero();
    }
  }

  // API global para encerramento programático seguro
  window.concluirAbertura = finalizarAbertura;

  // Pausar/retomar de forma inteligente caso a aba seja alternada durante a abertura
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !finalizado) {
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

