/* Controla a lógica principal da página, incluindo menu de navegação, troca de idioma e inicialização de animações */

document.addEventListener("DOMContentLoaded", () => {
  const cabecalhoTopo = document.getElementById("cabecalhoTopo") || document.getElementById("menuNavegacao");
  const seletorIdiomaSwitch = document.getElementById("seletorIdiomaSwitch");
  const rotuloPt = document.querySelector(".seletor-idioma__rotulo--pt");
  const rotuloAtlantida = document.querySelector(".seletor-idioma__rotulo--atlantida");

  if (cabecalhoTopo) {
    const gatilho = cabecalhoTopo.querySelector(".cabecalho-topo__gatilho, .menu-navegacao__gatilho");

    cabecalhoTopo.addEventListener("click", (evento) => {
      // Ignora cliques no seletor de idioma ou botão de animações para não fechar acidentalmente
      if (evento.target.closest(".seletor-idioma") || evento.target.closest(".cabecalho-topo__botao-animacoes, .menu-navegacao__botao-animacoes")) {
        evento.stopPropagation();
        return;
      }

      // Ao clicar em um link de navegação do menu responsivo, rola suavemente e fecha o menu
      const linkClicado = evento.target.closest(".cabecalho-topo__link, .menu-navegacao__link");
      if (linkClicado) {
        const alvoId = linkClicado.getAttribute("href")?.replace("#", "");
        if (alvoId && alvoId !== "login") {
          evento.preventDefault();
          const elementoAlvo = document.getElementById(alvoId);
          if (elementoAlvo) {
            elementoAlvo.scrollIntoView({ behavior: "smooth" });
          }
        }
        cabecalhoTopo.classList.remove("cabecalho-topo--expandido");
        cabecalhoTopo.classList.remove("menu-navegacao--expandido");
        if (gatilho) gatilho.setAttribute("aria-expanded", "false");
        return;
      }

      // Alterna abertura/fechamento ao clicar no gatilho ou no cabeçalho fechado
      if (evento.target.closest(".cabecalho-topo__gatilho, .menu-navegacao__gatilho") || !cabecalhoTopo.classList.contains("cabecalho-topo--expandido")) {
        const expandido = cabecalhoTopo.classList.toggle("cabecalho-topo--expandido");
        cabecalhoTopo.classList.toggle("menu-navegacao--expandido", expandido);
        if (gatilho) gatilho.setAttribute("aria-expanded", String(expandido));
      }
    });

    // Esc fecha o menu e devolve o foco ao botão que o abriu
    document.addEventListener("keydown", (evento) => {
      if (evento.key !== "Escape" || (!cabecalhoTopo.classList.contains("cabecalho-topo--expandido") && !cabecalhoTopo.classList.contains("menu-navegacao--expandido"))) return;
      cabecalhoTopo.classList.remove("cabecalho-topo--expandido");
      cabecalhoTopo.classList.remove("menu-navegacao--expandido");
      if (gatilho) {
        gatilho.setAttribute("aria-expanded", "false");
        gatilho.focus();
      }
    });

    document.addEventListener("click", (evento) => {
      if (!cabecalhoTopo.contains(evento.target)) {
        cabecalhoTopo.classList.remove("cabecalho-topo--expandido");
        cabecalhoTopo.classList.remove("menu-navegacao--expandido");
        if (gatilho) gatilho.setAttribute("aria-expanded", "false");
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

  
  inicializarMural();
  inicializarFormularioContato();
  inicializarMenuLateral();
  inicializarControleAnimacoes();
});

function inicializarFormularioContato() {
  // Localiza o formulário e seus controles para conectar validação e confirmação ao envio.
  const formulario = document.getElementById("formularioContato");
  if (!formulario) return;

  // Só os controles obrigatórios são validados; as mensagens vêm do dicionário ativo.
  const campos = Array.from(formulario.querySelectorAll("[required]"));
  const confirmacao = document.getElementById("confirmacaoContato");
  const mensagensErro = {
    contatoNome: { required: "contact.error_name", tooShort: "contact.error_name_short" },
    contatoSetor: { required: "contact.error_sector" },
    contatoAssunto: { required: "contact.error_reason" },
    contatoPrioridade: { required: "contact.error_priority" },
    contatoRetorno: { required: "contact.error_reply", tooShort: "contact.error_reply_short" },
    contatoMensagem: { required: "contact.error_message", tooShort: "contact.error_message_short" }
  };

  function obterTexto(chave) {
    // Respeita o idioma atual para manter erros e confirmação coerentes com a interface.
    const idioma = document.body.dataset.lang === "atlantida" ? "ptBrAtlantida" : "ptBr";
    const dicionario = window.i18n?.dictionaries[idioma] || window.i18n?.getFallbackDictionary(idioma);
    return dicionario?.[chave] || "Verifique este campo e tente novamente.";
  }

  function obterErro(campo) {
    // Complementa required com limites mínimos legíveis, inclusive para texto com espaços.
    const mensagens = mensagensErro[campo.id];
    if (!mensagens) return null;

    if (!campo.value.trim()) return obterTexto(mensagens.required);
    if (campo.minLength > 0 && campo.value.trim().length < campo.minLength) {
      return obterTexto(mensagens.tooShort);
    }
    return null;
  }

  function validarCampo(campo) {
    // Sincroniza a validade visual do controle com seu texto acessível de erro.
    const erro = obterErro(campo);
    const elementoErro = formulario.querySelector(`[data-erro-para="${campo.id}"]`);
    campo.setAttribute("aria-invalid", String(Boolean(erro)));

    if (elementoErro) {
      elementoErro.textContent = erro || "";
      elementoErro.hidden = !erro;
    }

    return !erro;
  }

  campos.forEach((campo) => {
    // Revalida um campo após erro assim que a pessoa volta a editá-lo.
    const evento = campo.tagName === "SELECT" ? "change" : "input";
    campo.addEventListener(evento, () => {
      if (campo.getAttribute("aria-invalid") === "true") validarCampo(campo);
    });
  });

  formulario.addEventListener("submit", (evento) => {
    // A demonstração não envia dados à rede: impede o submit padrão e valida localmente.
    evento.preventDefault();
    const camposInvalidos = campos.filter((campo) => !validarCampo(campo));

    if (camposInvalidos.length > 0) {
      // Leva o foco ao primeiro problema para orientar teclado e tecnologia assistiva.
      camposInvalidos[0].focus();
      return;
    }

    if (confirmacao) {
      // Exibe a confirmação somente quando todos os campos passaram pela validação.
      confirmacao.textContent = obterTexto("contact.success");
      confirmacao.hidden = false;
      formulario.reset();
      confirmacao.focus();
    }
  });

  window.addEventListener("app:language-changed", () => {
    // Atualiza erros e confirmação já visíveis após uma troca de idioma.
    campos.forEach((campo) => {
      if (campo.getAttribute("aria-invalid") === "true") validarCampo(campo);
    });
    if (confirmacao && !confirmacao.hidden) {
      confirmacao.textContent = obterTexto("contact.success");
    }
  });
}

function inicializarMural() {
  // O mural depende dos cartões do HTML; se a seção não existir, não há atualização a executar.
  const mural = document.getElementById("muralMensagens");
  if (!mural) return;

  const mensagens = Array.from(mural.querySelectorAll(".mural__mensagem"));
  const contadorMensagens = document.getElementById("muralQuantidade");
  const proximaExpiracao = document.getElementById("muralProximaExpiracao");
  const avisoMuralVazio = mural.querySelector(".mural__vazio");
  const publicacoesEmMemoria = new Map();
  const horaMs = 60 * 60 * 1000;

  function atualizarDataPublicacao(elemento, publicadaEm) {
    // Mantém o valor semântico ISO para máquinas e um formato local legível para visitantes.
    const horaTransmissao = elemento.querySelector(".mural__hora");
    if (!horaTransmissao) return;

    const data = new Date(publicadaEm);
    horaTransmissao.dateTime = data.toISOString();
    horaTransmissao.textContent = data.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  }

  const mensagensAtivas = mensagens.map((mensagem) => {
    // O HTML fornece a idade e validade iniciais; localStorage mantém datas consistentes entre visitas.
    const id = mensagem.dataset.mensagemId;
    const duracaoMs = Number(mensagem.dataset.ttlHoras) * horaMs;
    const idadeInicialMs = Number(mensagem.dataset.publicadaHaHoras) * horaMs;
    const chave = `atlantida:mural:v3:${id}:publicadaEm`;
    let publicadaEm;

    try {
      const publicadaEmSalva = localStorage.getItem(chave);
      const timestampSalvo = publicadaEmSalva === null ? NaN : Number(publicadaEmSalva);

      if (Number.isFinite(timestampSalvo) && timestampSalvo > 0) {
        publicadaEm = timestampSalvo;
      } else {
        if (publicadaEmSalva !== null) {
          console.warn(`A data de publicação salva para a mensagem "${id}" é inválida; uma nova data será definida.`);
          localStorage.removeItem(chave);
        }
        publicadaEm = Date.now() - idadeInicialMs;
        localStorage.setItem(chave, String(publicadaEm));
      }
    } catch (erro) {
      console.warn(`Não foi possível salvar a publicação da mensagem "${id}" neste navegador. A ordem e o prazo valerão apenas nesta visita.`, erro);
      publicadaEm = publicacoesEmMemoria.get(chave) || Date.now() - idadeInicialMs;
      publicacoesEmMemoria.set(chave, publicadaEm);
    }

    atualizarDataPublicacao(mensagem, publicadaEm);

    return {
      elemento: mensagem,
      id,
      chave,
      duracaoMs,
      publicadaEm,
      expiracao: publicadaEm + duracaoMs,
      contador: mensagem.querySelector(".mural__contador")
    };
  });

  function formatarContagem(ms) {
    // Converte o intervalo restante para a apresentação usada nos cartões e no resumo.
    const segundos = Math.max(0, Math.floor(ms / 1000));
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;
    return `${horas}h ${String(minutos).padStart(2, "0")}m ${String(segundosRestantes).padStart(2, "0")}s`;
  }

  function atualizarMural() {
    // Renova avisos vencidos em vez de removê-los, mantendo os cartões de demonstração disponíveis.
    const agora = Date.now();
    let proximidade = Infinity;
    let quantidadeAtiva = 0;

    mensagensAtivas.forEach((publicacao) => {
      let restante = publicacao.expiracao - agora;

      if (restante <= 0) {
        // Reinicia publicação e prazo; autor e texto permanecem no cartão original.
        publicacao.publicadaEm = agora;
        publicacao.expiracao = agora + publicacao.duracaoMs;
        restante = publicacao.duracaoMs;
        atualizarDataPublicacao(publicacao.elemento, publicacao.publicadaEm);

        try {
          localStorage.setItem(publicacao.chave, String(publicacao.publicadaEm));
        } catch (erro) {
          console.warn(`Não foi possível renovar a publicação "${publicacao.id}" neste navegador. A renovação valerá apenas nesta visita.`, erro);
        }
        publicacoesEmMemoria.set(publicacao.chave, publicacao.publicadaEm);
      }

      quantidadeAtiva += 1;
      proximidade = Math.min(proximidade, restante);
      if (publicacao.contador) publicacao.contador.textContent = formatarContagem(restante);
    });

    if (contadorMensagens) contadorMensagens.textContent = String(quantidadeAtiva);
    if (proximaExpiracao) {
      proximaExpiracao.textContent = Number.isFinite(proximidade) ? formatarContagem(proximidade) : "--:--:--";
    }
    if (avisoMuralVazio) avisoMuralVazio.hidden = quantidadeAtiva > 0;
  }

  // Inicializa o estado de imediato e atualiza contagens a cada segundo.
  atualizarMural();
  window.setInterval(atualizarMural, 1000);
}


function inicializarMenuLateral() {
  const menuLateral = document.getElementById("menuLateral");
  if (!menuLateral) return;

  const links = menuLateral.querySelectorAll(".menu-lateral__link");
  const btnScrollHero = document.querySelector(".secao-scroll-btn");
  const submarinoWrapper = document.getElementById("submarinoWrapper");
  const submarinoImg = document.getElementById("submarinoImg");

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

  const framesSubmarino = [
    "./assets/media/submarino-esq-1.png",
    "./assets/media/submarino-esq-2.png"
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

  function calcularPosicoesItens() {
    
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
    });
    return posicoes;
  }

  function atualizarEstadoMenu() {
    const scrollY = window.scrollY || window.pageYOffset;
    const secaoMundo = document.getElementById("o-mundo");
    const limiarSegundaSecao = secaoMundo
      ? (secaoMundo.offsetTop - (window.innerHeight * 0.4))
      : (window.innerHeight * 0.6);

    
    if (scrollY >= limiarSegundaSecao) {
      menuLateral.classList.add("menu-lateral--visivel");
      menuLateral.setAttribute("aria-hidden", "false");
      menuLateral.inert = false;
    } else {
      menuLateral.classList.remove("menu-lateral--visivel");
      menuLateral.setAttribute("aria-hidden", "true");
      menuLateral.inert = true;           // escondido = fora do alcance do Tab
    }

    const posicoes = calcularPosicoesItens();
    if (posicoes.length === 0) return;

    let targetSubmarinoY = posicoes[0].targetY;
    let secaoAtivaId = posicoes[0].id;

    
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

    if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 60) {
      targetSubmarinoY = posicoes[posicoes.length - 1].targetY;
      secaoAtivaId = posicoes[posicoes.length - 1].id;
    }

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

    // Sincroniza também o estado ativo nos links do menu responsivo superior
    const linksTopo = document.querySelectorAll(".cabecalho-topo__link, .menu-navegacao__link");
    linksTopo.forEach((link) => {
      const alvoId = link.getAttribute("href")?.replace("#", "");
      if (alvoId === secaoAtivaId) {
        link.classList.add("cabecalho-topo__link--ativo");
        link.setAttribute("aria-current", "true");
      } else {
        link.classList.remove("cabecalho-topo__link--ativo");
        link.removeAttribute("aria-current");
      }
    });
  }
  
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
  calcularPosicoesItens();
  atualizarEstadoMenu();
}

function inicializarControleAnimacoes() {
  const botaoAnimacoes = document.getElementById("botaoAnimacoes");
  if (!botaoAnimacoes) return;

  const icone = botaoAnimacoes.querySelector(".cabecalho-topo__icone-animacoes, .menu-navegacao__icone-animacoes");
  const CHAVE_STORAGE = "atlantida_animacoes_desativadas";

  const atualizarEstado = (pausadas) => {
    document.body.classList.toggle("sem-animacoes", pausadas);
    botaoAnimacoes.classList.toggle("cabecalho-topo__botao-animacoes--pausado", pausadas);
    botaoAnimacoes.classList.toggle("menu-navegacao__botao-animacoes--pausado", pausadas);
    botaoAnimacoes.setAttribute("aria-pressed", String(pausadas));

    if (icone) {
      icone.className = pausadas
        ? "fa-solid fa-play cabecalho-topo__icone-animacoes menu-navegacao__icone-animacoes"
        : "fa-solid fa-pause cabecalho-topo__icone-animacoes menu-navegacao__icone-animacoes";
    }

    const ehAtlante = document.body.getAttribute("data-lang") === "atlantida";
    const titulo = pausadas ? "Ativar animações" : "Pausar animações";
    botaoAnimacoes.setAttribute("title", titulo);

    const labelPt = pausadas ? "Ativar animações da página" : "Pausar animações da página";
    const labelAtl = pausadas ? "Kuyuyta qallariy" : "Kuyuyta sayachiy";
    botaoAnimacoes.setAttribute("aria-label", ehAtlante ? labelAtl : labelPt);
    botaoAnimacoes.setAttribute("data-atl-aria-label", labelAtl);

    if (pausadas && typeof window.definirLivroAberto === "function") {
      window.definirLivroAberto();
    }
    window.dispatchEvent(new CustomEvent("animacoes:alteradas", { detail: { pausadas } }));
  };

  let pausadas = false;
  try {
    const salvo = localStorage.getItem(CHAVE_STORAGE);
    if (salvo !== null) {
      pausadas = salvo === "true";
    } else {
      pausadas = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
  } catch (_) {}

  atualizarEstado(pausadas);

  botaoAnimacoes.addEventListener("click", (evento) => {
    evento.stopPropagation();
    const novoEstado = !document.body.classList.contains("sem-animacoes");
    atualizarEstado(novoEstado);
    try {
      localStorage.setItem(CHAVE_STORAGE, String(novoEstado));
    } catch (_) {}
  });
}