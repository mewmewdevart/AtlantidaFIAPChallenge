/**
 * Cursor Interativo Submarino - Atlântida
 */

const deepCursorRight = "url(https://drive.google.com/thumbnail?id=14ZwyOC0zZQLJwVVwNjAo-m4F7E44-bV5&sz=w96) 48 48, auto";
const deepCursorLeft = "url(https://drive.google.com/thumbnail?id=10YhiKqpHFCt7N84wPOdLOGF4emd6JP6l&sz=w96) 48 48, auto";
const speciesCursorRight = "url(https://drive.google.com/thumbnail?id=1zg6mXLnh_Tm472WTTp7wk3hTDQKV9UF8&sz=w96) 48 48, auto";
const speciesCursorLeft = "url(https://drive.google.com/thumbnail?id=10xq6gcbC3EjEYwEOzqcTPqgQXq9ifEfV&sz=w96) 48 48, auto";

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
      "./assets/media/cursor-submarino-dir-1.png",
      "./assets/media/cursor-submarino-dir-2.png"
    ],
    esquerda: [
      "./assets/media/cursor-submarino-esq-1.png",
      "./assets/media/cursor-submarino-esq-2.png"
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
