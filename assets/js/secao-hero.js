/* Anima a abertura do livro 3D ao carregar a página, usando GSAP para rotacionar capas e revelar conteúdo */

let timelineLivro = null;

// Abaixo desta largura o livro vira uma coluna simples (mesmo valor do @media em style.css)
const MAX_LARGURA_LIVRO_PLANO = 1100;

function definirLivroAbertoSemAnimacao(callbackConclusao) {
  const livro = document.getElementById("livro3D");
  const capaFrontal = document.getElementById("capaFrontal");
  const folhaEsquerda = document.getElementById("folhaEsquerda");
  const folhaDireita = document.getElementById("folhaDireita");
  const imagensIlustracao = document.querySelectorAll(".livro-3d__imagem-ilustracao");

  if (!livro || !capaFrontal || !folhaEsquerda || typeof gsap === "undefined") {
    if (typeof callbackConclusao === "function") callbackConclusao();
    return;
  }

  if (timelineLivro) {
    timelineLivro.kill();
    timelineLivro = null;
  }

  gsap.killTweensOf([livro, capaFrontal, folhaEsquerda, folhaDireita, imagensIlustracao]);

  const ehLivroPlano = window.matchMedia(`(max-width: ${MAX_LARGURA_LIVRO_PLANO}px)`).matches;

  if (ehLivroPlano) {
    gsap.set([livro, capaFrontal, folhaEsquerda, folhaDireita, imagensIlustracao], { clearProps: "all" });
    const paginaConteudoContainer = document.getElementById("paginaConteudoContainer");
    if (paginaConteudoContainer) gsap.set(paginaConteudoContainer, { clearProps: "all" });

    window.livroAbertoConcluido = true;
    const logoCentralizado = document.querySelector(".logo-centralizado");
    if (logoCentralizado) {
      logoCentralizado.classList.add("logo-centralizado--visivel");
    }

    if (typeof callbackConclusao === "function") callbackConclusao();
    return;
  }

  gsap.set(livro, { xPercent: 0, opacity: 1 });
  gsap.set(capaFrontal, { rotateY: -180, zIndex: 2 });
  gsap.set(folhaEsquerda, { rotateY: -180, zIndex: 35 });
  if (folhaDireita) gsap.set(folhaDireita, { zIndex: 20 });
  if (imagensIlustracao.length > 0) gsap.set(imagensIlustracao, { opacity: 1 });

  window.livroAbertoConcluido = true;
  const logoCentralizado = document.querySelector(".logo-centralizado");
  if (logoCentralizado) {
    logoCentralizado.classList.add("logo-centralizado--visivel");
  }

  if (typeof callbackConclusao === "function") {
    callbackConclusao();
  }
}

window.definirLivroAberto = definirLivroAbertoSemAnimacao;
window.executarAnimacaoAberturaLivro = executarAnimacaoAberturaLivro;

function executarAnimacaoAberturaLivro(callbackConclusao) {
  const livro = document.getElementById("livro3D");
  const capaFrontal = document.getElementById("capaFrontal");
  const folhaEsquerda = document.getElementById("folhaEsquerda");
  const folhaDireita = document.getElementById("folhaDireita");
  const imagensIlustracao = document.querySelectorAll(".livro-3d__imagem-ilustracao");

  if (!livro || !capaFrontal || !folhaEsquerda || typeof gsap === "undefined") {
    if (typeof callbackConclusao === "function") callbackConclusao();
    return;
  }

  const ehLivroPlano = window.matchMedia(`(max-width: ${MAX_LARGURA_LIVRO_PLANO}px)`).matches;

  if (ehLivroPlano) {
    if (timelineLivro) {
      timelineLivro.kill();
      timelineLivro = null;
    }
    gsap.killTweensOf([livro, capaFrontal, folhaEsquerda, folhaDireita, imagensIlustracao]);
    gsap.set([livro, capaFrontal, folhaEsquerda, folhaDireita, imagensIlustracao], { clearProps: "all" });

    window.livroAbertoConcluido = true;
    const logoCentralizado = document.querySelector(".logo-centralizado");
    if (logoCentralizado) {
      logoCentralizado.classList.add("logo-centralizado--visivel");
    }

    if (typeof callbackConclusao === "function") callbackConclusao();
    return;
  }

  const semAnimacoes = document.body.classList.contains("sem-animacoes") ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (semAnimacoes) {
    definirLivroAbertoSemAnimacao(callbackConclusao);
    return;
  }

  gsap.set(livro, { xPercent: -25, opacity: 0 });
  gsap.set(capaFrontal, { rotateY: 0, zIndex: 30 });
  gsap.set(folhaEsquerda, { rotateY: 0, zIndex: 20 });
  if (folhaDireita) gsap.set(folhaDireita, { zIndex: 10 });
  if (imagensIlustracao.length > 0) gsap.set(imagensIlustracao, { opacity: 0 });

  timelineLivro = gsap.timeline({
    defaults: { ease: "sine.inOut" },
    onComplete() {
      gsap.set(capaFrontal, { rotateY: -180, zIndex: 2 });
      gsap.set(folhaEsquerda, { rotateY: -180, zIndex: 35 });
      if (folhaDireita) gsap.set(folhaDireita, { zIndex: 20 });
      if (imagensIlustracao.length > 0) gsap.set(imagensIlustracao, { opacity: 1 });

      // Revela o logo centralizado no topo após o livro ter a animação concluída/estar aberto
      window.livroAbertoConcluido = true;
      const logoCentralizado = document.querySelector(".logo-centralizado");
      if (logoCentralizado) {
        logoCentralizado.classList.add("logo-centralizado--visivel");
      }

      if (typeof callbackConclusao === "function") {
        callbackConclusao();
      }
    }
  });

  timelineLivro
    .to(livro, {
      opacity: 1,
      duration: 0.4
    })
    .to(livro, {
      xPercent: 0,
      duration: 2
    }, 0.2)
    .to(capaFrontal, {
      rotateY: -180,
      duration: 2,
      onUpdate() {
        const rotacao = gsap.getProperty(capaFrontal, "rotateY");
        capaFrontal.style.zIndex = rotacao < -90 ? 2 : 30;
      },
      onComplete() {
        gsap.set(capaFrontal, { rotateY: -180, zIndex: 2 });
      }
    }, 0.2)
    .to(folhaEsquerda, {
      rotateY: -180,
      duration: 2.4,
      onUpdate() {
        const rotacao = gsap.getProperty(folhaEsquerda, "rotateY");
        folhaEsquerda.style.zIndex = rotacao < -90 ? 35 : 25;
      },
      onComplete() {
        if (folhaDireita) {
          gsap.set(folhaDireita, { zIndex: 20 });
        }
        if (folhaEsquerda) {
          gsap.set(folhaEsquerda, { zIndex: 35 });
        }
      }
    }, 1.7)
    .to(imagensIlustracao, {
      opacity: 1,
      duration: 0.9,
      ease: "power2.out"
    }, ">");
}

const mediaQueryLivroPlano = window.matchMedia(`(max-width: ${MAX_LARGURA_LIVRO_PLANO}px)`);
mediaQueryLivroPlano.addEventListener("change", () => {
  executarAnimacaoAberturaLivro();
});

/* ==========================================================================
   ANIMAÇÕES SUBMARINAS DO HERO (GSAP ACESSÍVEL & SUAVE)
   Fauna marinha navegando em ciclo contínuo sem cortes, com velocidade
   calibrada para acessibilidade e posicionada estritamente da altura do
   livro para baixo (abaixo da superfície das ondas), mantendo todo o
   cenário submarino (ondas, raios e fundo) intacto e contínuo.
   ========================================================================== */
let animacoesSubmarinas = [];

function iniciarAnimacoesSubmarinas() {
  if (typeof gsap === "undefined") {
    setTimeout(iniciarAnimacoesSubmarinas, 100);
    return;
  }

  const svgContainer =
    document.querySelector(".secao-apresentacao .cenario-submarino") ||
    document.querySelector(".secao-apresentacao .underwater-container");
  if (!svgContainer) return;

  // Limpa animações anteriores caso seja uma reinicialização (ex: redimensionamento)
  animacoesSubmarinas.forEach((anim) => {
    if (anim && typeof anim.kill === "function") {
      anim.kill();
    }
  });
  animacoesSubmarinas = [];

  // Limites fora da tela no sistema de coordenadas do SVG (viewBox 0 0 750 500)
  const FORA_ESQUERDA = -240;
  const FORA_DIREITA = 980;

  // Ajuste vertical responsivo:
  // No desktop, peixes que estavam na parte superior do SVG são deslocados 200px a 300px
  // abaixo do topo para nadarem da altura do livro para baixo, NUNCA acima da superfície das ondas.
  // No mobile, o deslocamento é menor e proporcional à tela compacta.
  const ehMobile = window.matchMedia("(max-width: 768px)").matches;

  // Configuração acessível:
  // - duracao: tempos mais lentos e serenos (42s a 65s) para nado contemplativo
  // - baseY: posiciona peixes e tubarão estritamente abaixo da superfície das ondas
  // - oscilacaoY: suave flutuação vertical em ritmo orgânico (3.5s a 4.5s)
  const faunaConfig = [
    { id: "tubarao",  origX: 328, direcao: "rtl", duracao: 65, progressoInicial: 0.15, baseY: ehMobile ? 65 : 110, oscilacaoY: 10, tempoOscilacao: 4.5 },
    { id: "peixe-1",  origX: 185, direcao: "ltr", duracao: 42, progressoInicial: 0.40, baseY: ehMobile ? 105 : 175, oscilacaoY: 5,  tempoOscilacao: 3.5 },
    { id: "peixe-2",  origX: 116, direcao: "ltr", duracao: 46, progressoInicial: 0.70, baseY: ehMobile ? 90 : 160, oscilacaoY: 6,  tempoOscilacao: 3.8 },
    { id: "peixe-3",  origX: 50,  direcao: "ltr", duracao: 44, progressoInicial: 0.20, baseY: ehMobile ? 100 : 170, oscilacaoY: 4,  tempoOscilacao: 3.6 },
    { id: "peixe-4",  origX: 29,  direcao: "ltr", duracao: 49, progressoInicial: 0.55, baseY: ehMobile ? 95 : 165, oscilacaoY: 5,  tempoOscilacao: 4.0 },
    { id: "peixe-5",  origX: 726, direcao: "ltr", duracao: 45, progressoInicial: 0.90, baseY: ehMobile ? 105 : 175, oscilacaoY: 6,  tempoOscilacao: 3.7 },
    { id: "peixe-6",  origX: 657, direcao: "ltr", duracao: 50, progressoInicial: 0.30, baseY: ehMobile ? 85 : 150, oscilacaoY: 5,  tempoOscilacao: 3.9 },
    { id: "peixe-7",  origX: 591, direcao: "ltr", duracao: 43, progressoInicial: 0.75, baseY: ehMobile ? 95 : 165, oscilacaoY: 4,  tempoOscilacao: 3.5 },
    { id: "peixe-8",  origX: 536, direcao: "ltr", duracao: 52, progressoInicial: 0.10, baseY: ehMobile ? 95 : 165, oscilacaoY: 6,  tempoOscilacao: 4.2 },
    { id: "cardume-1", origX: 546, direcao: "ltr", duracao: 54, progressoInicial: 0.65, baseY: 0,  oscilacaoY: 6,  tempoOscilacao: 3.8 },
    { id: "cardume-2", origX: 231, direcao: "ltr", duracao: 48, progressoInicial: 0.35, baseY: 0,  oscilacaoY: 7,  tempoOscilacao: 3.5 },
    { id: "cardume-3", origX: 65,  direcao: "ltr", duracao: 58, progressoInicial: 0.85, baseY: 0,  oscilacaoY: 8,  tempoOscilacao: 4.2 },
    { id: "peixe-9",  origX: 120, direcao: "ltr", duracao: 47, progressoInicial: 0.50, baseY: 0,  oscilacaoY: 5,  tempoOscilacao: 3.8 },
    { id: "peixe-10", origX: 288, direcao: "ltr", duracao: 55, progressoInicial: 0.80, baseY: 0,  oscilacaoY: 7,  tempoOscilacao: 4.4 },
    { id: "peixe-11", origX: 712, direcao: "ltr", duracao: 46, progressoInicial: 0.25, baseY: 0,  oscilacaoY: 4,  tempoOscilacao: 3.6 },
    { id: "peixe-12", origX: 499, direcao: "ltr", duracao: 51, progressoInicial: 0.60, baseY: 0,  oscilacaoY: 5,  tempoOscilacao: 4.0 }
  ];

  faunaConfig.forEach((item) => {
    const el =
      document.getElementById(item.id) ||
      document.getElementById(
        item.id
          .replace("cardume-", "School-")
          .replace("peixe-", "Fish-")
          .replace("tubarao", "Shark")
      );
    if (!el) return;

    let startX, endX;
    if (item.direcao === "ltr") {
      // Esquerda para a direita: inicia totalmente fora à esquerda e conclui fora à direita
      startX = FORA_ESQUERDA - item.origX;
      endX = FORA_DIREITA - item.origX;
    } else {
      // Direita para a esquerda (tubarão): inicia totalmente fora à direita e conclui fora à esquerda
      startX = FORA_DIREITA - item.origX;
      endX = FORA_ESQUERDA - item.origX;
    }

    // Posiciona Y base para que peixes nadem estritamente da altura do livro para baixo
    gsap.set(el, { y: item.baseY || 0 });

    // 1. Travessia horizontal contínua e suave
    const tweenX = gsap.fromTo(
      el,
      { x: startX },
      {
        x: endX,
        duration: item.duracao,
        repeat: -1,
        ease: "none",
        force3D: true
      }
    );

    // Distribui os peixes na tela suavemente ao carregar (sem tela vazia)
    if (item.progressoInicial) {
      tweenX.progress(item.progressoInicial);
    }
    animacoesSubmarinas.push(tweenX);

    // 2. Flutuação vertical de nado em ritmo calmo
    if (item.oscilacaoY) {
      const tweenY = gsap.to(el, {
        y: `+=${item.oscilacaoY}`,
        duration: item.tempoOscilacao,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      animacoesSubmarinas.push(tweenY);
    }
  });

  // Algas e cenário do recife permanecem estáticos (apenas os peixes são animados)

  // Verifica preferências de acessibilidade
  const prefereReduzido =
    document.body.classList.contains("sem-animacoes") ||
    (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  if (prefereReduzido) {
    pausarAnimacoesSubmarinas(true);
  }
}

function pausarAnimacoesSubmarinas(pausar) {
  animacoesSubmarinas.forEach((anim) => {
    if (anim) {
      pausar ? anim.pause() : anim.play();
    }
  });
}

window.addEventListener("animacoes:alteradas", (evento) => {
  const pausar = evento.detail ? evento.detail.pausadas : false;
  if (pausar) {
    definirLivroAbertoSemAnimacao();
  }
  pausarAnimacoesSubmarinas(pausar);
});

const mediaQueryMobileSubmarino = window.matchMedia("(max-width: 768px)");
window.iniciarAnimacoesSubmarinas = iniciarAnimacoesSubmarinas;
window.pausarAnimacoesSubmarinas = pausarAnimacoesSubmarinas;

// Inicialização segura ao carregar a página
function inicializarHero() {
  const estaEmAbertura =
    document.body.classList.contains("em-abertura") &&
    document.getElementById("aberturaCarregamento");

  if (!estaEmAbertura) {
    executarAnimacaoAberturaLivro();
    iniciarAnimacoesSubmarinas();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarHero);
} else {
  inicializarHero();
}
