/* Implementa o cursor interativo em forma de submarino, trocando sprites conforme movimento do mouse */


const deepCursorRight = "url(./assets/media/submarino-dir-1.png) 48 48, auto";
const deepCursorLeft = "url(./assets/media/submarino-dir-2.png) 48 48, auto";
const speciesCursorRight = "url(./assets/media/submarino-esq-1.png) 48 48, auto";
const speciesCursorLeft = "url(./assets/media/submarino-esq-2.png) 48 48, auto";

function extrairUrl(cursorStr) {
  const match = cursorStr.match(/url\((['"]?)(.*?)\1\)/);
  return match ? match[2] : cursorStr;
}

function inicializarCursorSubmarino() {
  const sprites = {
    direita: [
      extrairUrl(deepCursorRight),
      extrairUrl(speciesCursorRight)
    ],
    esquerda: [
      extrairUrl(deepCursorLeft),
      extrairUrl(speciesCursorLeft)
    ]
  };

  const fallbackLocal = {
    direita: [
      "./assets/media/submarino-dir-1.png",
      "./assets/media/submarino-dir-2.png"
    ],
    esquerda: [
      "./assets/media/submarino-esq-1.png",
      "./assets/media/submarino-esq-2.png"
    ]
  };

  let usarFallback = false;
  let direcaoAtual = "direita";
  let indiceFrame = 0;
  let ultimoX = 0;
  let mouseVisivel = false;

  let cursorSeguidor = document.getElementById("cursorSubmarino");
  if (!cursorSeguidor) {
    cursorSeguidor = document.createElement("div");
    cursorSeguidor.id = "cursorSubmarino";
    cursorSeguidor.className = "cursor-submarino";
    cursorSeguidor.setAttribute("aria-hidden", "true");
    document.body.appendChild(cursorSeguidor);
  }

  function atualizarSprite() {
    const listaSprites = usarFallback ? fallbackLocal[direcaoAtual] : sprites[direcaoAtual];
    const urlSprite = listaSprites[indiceFrame];
    cursorSeguidor.style.backgroundImage = `url("${urlSprite}")`;
  }

  [...sprites.direita, ...sprites.esquerda].forEach((src) => {
    const img = new Image();
    img.onerror = () => {
      usarFallback = true;
      atualizarSprite();
    };
    img.src = src;
  });

  setInterval(() => {
    indiceFrame = (indiceFrame + 1) % 2;
    atualizarSprite();
  }, 150);

  window.addEventListener("mousemove", (evento) => {
    const x = evento.clientX;
    const y = evento.clientY;

    if (!mouseVisivel) {
      mouseVisivel = true;
      cursorSeguidor.style.opacity = "1";
    }

    cursorSeguidor.style.left = `${x}px`;
    cursorSeguidor.style.top = `${y}px`;

    const deltaX = x - ultimoX;
    if (deltaX > 2) {
      if (direcaoAtual !== "direita") {
        direcaoAtual = "direita";
        atualizarSprite();
      }
      ultimoX = x;
    } else if (deltaX < -2) {
      if (direcaoAtual !== "esquerda") {
        direcaoAtual = "esquerda";
        atualizarSprite();
      }
      ultimoX = x;
    }
  });

  document.addEventListener("mouseleave", () => {
    mouseVisivel = false;
    cursorSeguidor.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    mouseVisivel = true;
    cursorSeguidor.style.opacity = "1";
  });

  atualizarSprite();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarCursorSubmarino);
} else {
  inicializarCursorSubmarino();
}
