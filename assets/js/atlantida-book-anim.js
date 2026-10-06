/**
 * Animação e controle tridimensional do Livro de Atlântida.
 * Utiliza GreenSock (GSAP) para orquestrar a rotação e abertura em camadas (profundidade 3D).
 */

function executarAnimacaoAberturaLivro() {
    // Referências aos elementos pelas camadas de profundidade em PT-BR
    const livro = document.getElementById("livro3D");
    const capaFrontal = document.getElementById("capaFrontal");
    const folhaEsquerda = document.getElementById("folhaEsquerda");
    const folhaDireita = document.getElementById("folhaDireita");
    const imagensIlustracao = document.querySelectorAll(".livro-3d__imagem-ilustracao");

    // Verifica se os elementos essenciais e o GSAP estão presentes
    if (!livro || !capaFrontal || !folhaEsquerda || typeof gsap === "undefined") {
        return;
    }

    // Suporte à acessibilidade: se o usuário prefere movimentos reduzidos
    const prefereMovimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefereMovimentoReduzido) {
        gsap.set(livro, { xPercent: 0, opacity: 1 });
        gsap.set(capaFrontal, { rotateY: -180, zIndex: 2 });
        gsap.set(folhaEsquerda, { rotateY: -180, zIndex: 20 });
        if (folhaDireita) gsap.set(folhaDireita, { zIndex: 30 });
        if (imagensIlustracao.length > 0) gsap.set(imagensIlustracao, { opacity: 1 });
        return;
    }

    // Configurações iniciais antes da abertura (livro fechado e posicionado à esquerda)
    gsap.set(livro, { xPercent: -25, opacity: 0 });
    gsap.set(capaFrontal, { rotateY: 0, zIndex: 30 });
    gsap.set(folhaEsquerda, { rotateY: 0, zIndex: 20 });
    if (folhaDireita) gsap.set(folhaDireita, { zIndex: 10 });
    if (imagensIlustracao.length > 0) gsap.set(imagensIlustracao, { opacity: 0 });

    // Linha do tempo (timeline) orquestrada de animação
    const linhaDoTempo = gsap.timeline({
        defaults: { ease: "sine.inOut" }
    });

    linhaDoTempo
        // 1. Surgimento suave do livro
        .to(livro, {
            opacity: 1,
            duration: 0.4
        })
        // 2. Centralização do livro na tela
        .to(livro, {
            xPercent: 0,
            duration: 1.8
        }, 0.2)
        // 3. Abertura da capa frontal (gira -180 graus no eixo Y)
        .to(capaFrontal, {
            rotateY: -180,
            duration: 1.8,
            onUpdate() {
                // Alterna o zIndex para garantir que a capa não sobreponha a folha aberta
                const rotacao = gsap.getProperty(capaFrontal, "rotateY");
                capaFrontal.style.zIndex = rotacao < -90 ? 2 : 30;
            }
        }, 0.2)
        // 4. Virada da primeira folha (conteúdo de texto gira e se posiciona à esquerda)
        .to(folhaEsquerda, {
            rotateY: -180,
            duration: 1.4,
            onUpdate() {
                const rotacao = gsap.getProperty(folhaEsquerda, "rotateY");
                folhaEsquerda.style.zIndex = rotacao < -90 ? 20 : 25;
            },
            onComplete() {
                // Folha direita fica com zIndex superior para sobrepor a folha esquerda aberta
                if (folhaDireita) {
                    gsap.set(folhaDireita, { zIndex: 30 });
                }
                // Fade-in sincronizado das ilustrações submarinas
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

// Inicializa a animação assim que o documento HTML estiver carregado
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", executarAnimacaoAberturaLivro);
} else {
    executarAnimacaoAberturaLivro();
}