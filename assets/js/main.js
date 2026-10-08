/**
 * Script Principal - Interações da Interface (Menu e Alternância de Idioma)
 */

document.addEventListener("DOMContentLoaded", () => {
  const menuNavegacao = document.getElementById("menuNavegacao");
  const seletorIdiomaSwitch = document.getElementById("seletorIdiomaSwitch");
  const rotuloPt = document.querySelector(".seletor-idioma__rotulo--pt");
  const rotuloAtlantida = document.querySelector(".seletor-idioma__rotulo--atlantida") || document.querySelector(".seletor-idioma__rotulo--asteca");

  if (menuNavegacao) {
    menuNavegacao.addEventListener("click", (evento) => {
      if (evento.target.closest(".seletor-idioma")) {
        evento.stopPropagation();
        return;
      }
      menuNavegacao.classList.toggle("menu-navegacao--expandido");
    });

    document.addEventListener("click", (evento) => {
      if (!menuNavegacao.contains(evento.target)) {
        menuNavegacao.classList.remove("menu-navegacao--expandido");
      }
    });
  }

  if (seletorIdiomaSwitch) {
    seletorIdiomaSwitch.addEventListener("change", () => {
      if (seletorIdiomaSwitch.checked) {
        rotuloPt?.classList.remove("seletor-idioma__rotulo--ativo");
        rotuloAtlantida?.classList.add("seletor-idioma__rotulo--ativo");
        document.body.setAttribute("data-lang", "atlantida");
        window.i18n?.changeLanguage("ptBrAtlantida");
      } else {
        rotuloAtlantida?.classList.remove("seletor-idioma__rotulo--ativo");
        rotuloPt?.classList.add("seletor-idioma__rotulo--ativo");
        document.body.setAttribute("data-lang", "pt-br");
        window.i18n?.changeLanguage("ptBr");
      }
    });
  }

  // Inicialização do menu vertical lateral
  inicializarMenuLateral();
});

/**
 * Menu Lateral Fixo com Indicador de Profundidade Temático (Submarino & Régua).
 * - Sincronização contínua com as seções via GSAP e interpolação de scroll.
 * - Animação de propulsão (hélice girando) e flutuação hidrodinâmica (idle bobbing).
 * - Régua de profundidade náutica com marcações pontilhadas e cotas das seções.
 */
function inicializarMenuLateral() {
  const menuLateral = document.getElementById("menuLateral");
  if (!menuLateral) return;

  const links = menuLateral.querySelectorAll(".menu-lateral__link");
  const btnScrollHero = document.querySelector(".secao-scroll-btn");
  const submarinoWrapper = document.getElementById("submarinoWrapper");
  const submarinoImg = document.getElementById("submarinoImg");
  // const reguaMarcas = document.getElementById("reguaMarcas");

  const secoes = [
    document.getElementById("inicio"),
    document.getElementById("o-mundo"),
    document.getElementById("habitantes"),
    document.getElementById("mural"),
    document.getElementById("contato")
  ].filter(Boolean);

  const profundidades = [
    { id: "inicio", label: "0 M" },
    { id: "o-mundo", label: "200 M" },
    { id: "habitantes", label: "1000 M" },
    { id: "mural", label: "2000 M" },
    { id: "contato", label: "4000 M" }
  ];

  const prefereMovimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. Criação das marcas da régua de profundidade
  // if (reguaMarcas) {
  //   reguaMarcas.innerHTML = "";
  //   profundidades.forEach((item) => {
  //     const marca = document.createElement("div");
  //     marca.className = "menu-lateral__regua-marca";
  //     marca.dataset.secao = item.id;
  //     marca.innerHTML = `
  //       <span class="menu-lateral__regua-texto">${item.label}</span>
  //       <span class="menu-lateral__regua-traco"></span>
  //     `;
  //     reguaMarcas.appendChild(marca);
  //   });
  // }

  // 2. Animação de propulsão (hélice do submarino alternando frames)
  const framesSubmarino = [
    "./assets/media/submarino-dir-1.png",
    "./assets/media/submarino-dir-2.png"
  ];
  let frameAtual = 0;

  framesSubmarino.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  if (submarinoImg && !prefereMovimentoReduzido) {
    setInterval(() => {
      frameAtual = (frameAtual + 1) % framesSubmarino.length;
      submarinoImg.src = framesSubmarino[frameAtual];
    }, 740);
  }

  // 3. Flutuação hidrodinâmica (idle bobbing) no sprite interno
  if (submarinoImg && typeof gsap !== "undefined" && !prefereMovimentoReduzido) {
    gsap.to(submarinoImg, {
      y: 3,
      rotation: 1.2,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  // 4. Cálculo geométrico das posições dos itens em relação ao container
  function calcularPosicoesItens() {
    // const marcas = reguaMarcas ? reguaMarcas.querySelectorAll(".menu-lateral__regua-marca") : [];
    const posicoes = [];
    const submarinoHeight = submarinoWrapper ? submarinoWrapper.offsetHeight : 44;

    links.forEach((link, idx) => {
      const alvoId = link.getAttribute("href")?.replace("#", "");
      const itemEl = link.closest(".menu-lateral__item");
      if (!itemEl) return;

      const centerY = itemEl.offsetTop + (itemEl.offsetHeight / 2);
      const targetY = centerY - (submarinoHeight / 2);

      posicoes.push({
        id: alvoId,
        centerY,
        targetY
      });

      // if (marcas[idx]) {
      //   marcas[idx].style.top = `${centerY}px`;
      // }
    });

    return posicoes;
  }

  // 5. Atualização contínua de estado e posição conforme o scroll da página
  function atualizarEstadoMenu() {
    const scrollY = window.scrollY || window.pageYOffset;
    const secaoMundo = document.getElementById("o-mundo");
    const limiarSegundaSecao = secaoMundo
      ? (secaoMundo.offsetTop - (window.innerHeight * 0.4))
      : (window.innerHeight * 0.6);

    // O menu só deve aparecer da segunda seção em diante (oculto na apresentação)
    if (scrollY >= limiarSegundaSecao) {
      menuLateral.classList.add("menu-lateral--visivel");
      menuLateral.setAttribute("aria-hidden", "false");
    } else {
      menuLateral.classList.remove("menu-lateral--visivel");
      menuLateral.setAttribute("aria-hidden", "true");
    }

    const posicoes = calcularPosicoesItens();
    if (posicoes.length === 0) return;

    let targetSubmarinoY = posicoes[0].targetY;
    let secaoAtivaId = posicoes[0].id;

    // Interpolação linear do progresso entre as seções
    for (let i = 0; i < secoes.length; i++) {
      const secaoAtual = secoes[i];
      const proximaSecao = secoes[i + 1];
      const topAtual = secaoAtual.offsetTop;

      if (proximaSecao) {
        const topProxima = proximaSecao.offsetTop;
        if (scrollY >= topAtual && scrollY < topProxima) {
          const progresso = (scrollY - topAtual) / Math.max(1, topProxima - topAtual);
          const yAtual = posicoes[i]?.targetY ?? posicoes[0].targetY;
          const yProximo = posicoes[i + 1]?.targetY ?? yAtual;
          targetSubmarinoY = yAtual + (progresso * (yProximo - yAtual));
          secaoAtivaId = progresso >= 0.5 ? posicoes[i + 1]?.id || posicoes[i].id : posicoes[i].id;
          break;
        }
      } else {
        if (scrollY >= topAtual) {
          targetSubmarinoY = posicoes[i]?.targetY ?? posicoes[posicoes.length - 1].targetY;
          secaoAtivaId = secaoAtual.id;
        }
      }
    }

    // Se estiver no final da página, alinha com a última seção
    if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 60) {
      targetSubmarinoY = posicoes[posicoes.length - 1].targetY;
      secaoAtivaId = posicoes[posicoes.length - 1].id;
    }

    // Animação fluida do submarino no eixo Y mirando o item ativo
    if (submarinoWrapper) {
      if (typeof gsap !== "undefined" && !prefereMovimentoReduzido) {
        gsap.to(submarinoWrapper, {
          y: targetSubmarinoY,
          duration: 0.38,
          ease: "power2.out",
          overwrite: "auto"
        });
      } else {
        submarinoWrapper.style.transform = `translateY(${targetSubmarinoY}px)`;
      }
    }

    // Atualiza destaque visual dos links
    links.forEach((link) => {
      const alvoId = link.getAttribute("href")?.replace("#", "");
      if (alvoId === secaoAtivaId) {
        link.classList.add("menu-lateral__link--ativo");
        link.setAttribute("aria-current", "true");
      } else {
        link.classList.remove("menu-lateral__link--ativo");
        link.removeAttribute("aria-current");
      }
    });

    // Atualiza destaque da régua de profundidade
    // if (reguaMarcas) {
    //   const marcas = reguaMarcas.querySelectorAll(".menu-lateral__regua-marca");
    //   marcas.forEach((marca) => {
    //     if (marca.dataset.secao === secaoAtivaId) {
    //       marca.classList.add("menu-lateral__regua-marca--ativa");
    //     } else {
    //       marca.classList.remove("menu-lateral__regua-marca--ativa");
    //     }
    //   });
    // }
  }

  // 6. Rolagem suave ao clicar nas opções do menu lateral
  links.forEach((link) => {
    link.addEventListener("click", (evento) => {
      evento.preventDefault();
      const alvoId = link.getAttribute("href")?.replace("#", "");
      const elementoAlvo = document.getElementById(alvoId);
      if (elementoAlvo) {
        elementoAlvo.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // 7. Botão submarino de scroll da primeira seção
  if (btnScrollHero) {
    btnScrollHero.addEventListener("click", () => {
      const secaoMundo = document.getElementById("o-mundo");
      if (secaoMundo) {
        secaoMundo.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  window.addEventListener("scroll", atualizarEstadoMenu, { passive: true });
  window.addEventListener("resize", () => {
    calcularPosicoesItens();
    atualizarEstadoMenu();
  }, { passive: true });
  window.addEventListener("load", () => {
    calcularPosicoesItens();
    atualizarEstadoMenu();
  });

  // Execução inicial
  calcularPosicoesItens();
  atualizarEstadoMenu();
}


