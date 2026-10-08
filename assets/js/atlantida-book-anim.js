/* Anima a abertura do livro 3D ao carregar a página, usando GSAP para rotacionar capas e revelar conteúdo */

function executarAnimacaoAberturaLivro() {
  const livro = document.getElementById("livro3D");
  const capaFrontal = document.getElementById("capaFrontal");
  const folhaEsquerda = document.getElementById("folhaEsquerda");
  const folhaDireita = document.getElementById("folhaDireita");
  const imagensIlustracao = document.querySelectorAll(".livro-3d__imagem-ilustracao");

  if (!livro || !capaFrontal || !folhaEsquerda || typeof gsap === "undefined") {
    return;
  }

  const prefereMovimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefereMovimentoReduzido) {
    gsap.set(livro, { xPercent: 0, opacity: 1 });
    gsap.set(capaFrontal, { rotateY: -180, zIndex: 2 });
    gsap.set(folhaEsquerda, { rotateY: -180, zIndex: 20 });
    if (folhaDireita) gsap.set(folhaDireita, { zIndex: 30 });
    if (imagensIlustracao.length > 0) gsap.set(imagensIlustracao, { opacity: 1 });
    return;
  }

  gsap.set(livro, { xPercent: -25, opacity: 0 });
  gsap.set(capaFrontal, { rotateY: 0, zIndex: 30 });
  gsap.set(folhaEsquerda, { rotateY: 0, zIndex: 20 });
  if (folhaDireita) gsap.set(folhaDireita, { zIndex: 10 });
  if (imagensIlustracao.length > 0) gsap.set(imagensIlustracao, { opacity: 0 });

  const linhaDoTempo = gsap.timeline({
    defaults: { ease: "sine.inOut" }
  });

  linhaDoTempo
    .to(livro, {
      opacity: 1,
      duration: 0.4
    })
    .to(livro, {
      xPercent: 0,
      duration: 1.8
    }, 0.2)
    .to(capaFrontal, {
      rotateY: -180,
      duration: 1.8,
      onUpdate() {
        const rotacao = gsap.getProperty(capaFrontal, "rotateY");
        capaFrontal.style.zIndex = rotacao < -90 ? 2 : 30;
      }
    }, 0.2)
    .to(folhaEsquerda, {
      rotateY: -180,
      duration: 1.4,
      onUpdate() {
        const rotacao = gsap.getProperty(folhaEsquerda, "rotateY");
        folhaEsquerda.style.zIndex = rotacao < -90 ? 20 : 25;
      },
      onComplete() {
        if (folhaDireita) {
          gsap.set(folhaDireita, { zIndex: 30 });
        }
        if (imagensIlustracao.length > 0) {
          gsap.to(imagensIlustracao, {
            opacity: 1,
            duration: 1,
            ease: "sine.inOut"
          });
        }
      }
    }, 1.1);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", executarAnimacaoAberturaLivro);
} else {
  executarAnimacaoAberturaLivro();
}
