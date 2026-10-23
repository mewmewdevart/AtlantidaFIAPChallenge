/* Abertura de 10 s (veja abertura.css). Este arquivo só: dá a largada, mostra a profundidade,
   permite pular e avisa a página (evento "abertura:fim") para o livro do hero abrir. */
(function () {
  const el = document.getElementById("abertura");
  if (!el) return;
  const raiz = document.documentElement;

  if (!raiz.classList.contains("abertura-ativa")) {
    el.remove();
    return;
  }

  window.__aberturaAtiva = true;       // o secao-hero.js espera o evento "abertura:fim"

  const PROFUNDIDADE_FINAL = 3400;     // m (fundo abissal, como no resto do site)
  const INICIO_MERGULHO = 2.6;         // s  — mesmos valores do CSS
  const DURACAO_MERGULHO = 4.0;        // s
  const FIM = 9.2;                     // s  — quando o livro do hero começa a abrir
  const LIMITE_ESPERA_CARGA = 4;       // s  — no máximo isso esperando o site carregar

  const prof = document.getElementById("abProf");
  const zona = document.getElementById("abZona");
  let decorrido = 0;                   // segundos de animação
  let ultimo = null;
  let pausado = false;
  let terminou = false;

  // Bolhas: criadas aqui só para o HTML não ficar enorme
  const bolhas = document.getElementById("abBolhas");
  if (bolhas) {
    for (let i = 0; i < 18; i++) {
      const b = document.createElement("span");
      const t = 6 + Math.random() * 16;
      b.className = "ab__bolha";
      b.style.cssText = `left:${Math.random() * 100}%;width:${t}px;height:${t}px;` +
        `animation-duration:${3 + Math.random() * 3}s;animation-delay:-${Math.random() * 5}s`;
      bolhas.appendChild(b);
    }
  }

  // Peixes (desenhos de assets/media, recortados em assets/media/abertura). Coreografia fixa, sem sorteio.
  // dir: "dir" = nada para a direita, "esq" = para a esquerda. olha: para onde o desenho olha ("dir" ou "esq").
  // Peixes olham para a direita; o tubarão olha para a esquerda. Se o sentido não bate com o desenho, espelha.
  const peixes = document.getElementById("abPeixes");
  const PEIXES = [
    { f: "peixe-1",   dir: "dir", olha: "dir", y: 30, w: 7,  t: 3.4, d: 5.0, c: "255,179,71" },
    { f: "peixe-5",   dir: "esq", olha: "dir", y: 46, w: 6,  t: 3.7, d: 4.8, c: "15,244,204" },
    { f: "cardume-1", dir: "dir", olha: "dir", y: 58, w: 14, t: 4.0, d: 6.5, c: "255,179,71" },
    { f: "peixe-3",   dir: "dir", olha: "dir", y: 24, w: 8,  t: 4.4, d: 5.2, c: "255,122,89" },
    { f: "tubarao",   dir: "esq", olha: "esq", y: 38, w: 24, t: 5.0, d: 8.0, c: "15,244,204" },
    { f: "peixe-9",   dir: "esq", olha: "dir", y: 66, w: 9,  t: 5.4, d: 5.0, c: "255,179,71" },
    { f: "cardume-3", dir: "esq", olha: "dir", y: 52, w: 15, t: 5.8, d: 6.5, c: "214,243,238" },
    { f: "peixe-12",  dir: "dir", olha: "dir", y: 70, w: 10, t: 6.4, d: 5.5, c: "15,244,204" },
    { f: "peixe-10",  dir: "esq", olha: "dir", y: 28, w: 9,  t: 6.8, d: 5.0, c: "255,122,89" },
    { f: "peixe-7",   dir: "dir", olha: "dir", y: 62, w: 8,  t: 7.4, d: 4.6, c: "214,243,238" },
    { f: "peixe-1",   dir: "esq", olha: "dir", y: 42, w: 6,  t: 7.9, d: 4.0, c: "255,179,71" }
  ];
  if (peixes) {
    PEIXES.forEach((p) => {
      const el = document.createElement("div");
      el.className = "ab__peixe" + (p.dir !== p.olha ? " ab__peixe--vira" : "");
      el.style.cssText = `--y:${p.y}%;--w:${p.w}vw;--t:${p.t}s;--dur:${p.d}s;--anim:ab-cruza-${p.dir};--brilho:rgba(${p.c},0.55)`;
      el.innerHTML = `<img src="./assets/media/abertura/${p.f}.svg" alt="" width="200" height="100">`;
      peixes.appendChild(el);
    });
  }

  function formatar(n) {
    return Math.round(n).toLocaleString("pt-BR");
  }

  function terminar(rapido) {
    if (terminou) return;
    terminou = true;
    try { sessionStorage.setItem("abertura-vista", "1"); } catch (e) {}
    window.dispatchEvent(new Event("abertura:fim"));
    if (rapido) el.classList.add("ab--saindo");
    const encerrar = () => {
      raiz.classList.remove("abertura-ativa");
      el.remove();
    };
    setTimeout(encerrar, rapido ? 380 : 750);
  }

  function quadro(agora) {
    if (terminou) return;
    if (ultimo !== null && !pausado) decorrido += (agora - ultimo) / 1000;
    ultimo = agora;

    const p = Math.min(1, Math.max(0, (decorrido - INICIO_MERGULHO) / DURACAO_MERGULHO));
    const suave = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    const m = PROFUNDIDADE_FINAL * suave;
    if (prof) prof.textContent = formatar(m);
    if (zona) zona.textContent = m < 200 ? "Zona Fótica" : m < 1000 ? "Zona Crepuscular" : m < 2000 ? "Zona Batipelágica" : m < 3400 ? "Zona Abissal" : "Fundo Abissal";

    // Se a página ainda estiver carregando perto do fim, segura o livro flutuando
    if (!pausado && decorrido >= FIM - 1.4 && document.readyState !== "complete") {
      pausado = true;
      el.classList.remove("ab--rodando");
      const retomar = () => { if (pausado) { pausado = false; el.classList.add("ab--rodando"); } };
      window.addEventListener("load", retomar, { once: true });
      setTimeout(retomar, LIMITE_ESPERA_CARGA * 1000);
    }

    if (decorrido >= FIM) { terminar(false); return; }
    requestAnimationFrame(quadro);
  }

  document.getElementById("abPular")?.addEventListener("click", () => terminar(true));
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") terminar(true); });

  requestAnimationFrame(() => {
    el.classList.add("ab--rodando");
    requestAnimationFrame(quadro);
  });
})();
