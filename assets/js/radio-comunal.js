/**
 * RÁDIO COMUNAL — FREQUÊNCIA 12
 * Reprodução acessível, controle de foco WCAG 2.2 e contingência sonora com Web Audio API.
 */
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('radioAudio');
  const btnPlay = document.getElementById('radioBtnPlay');
  const iconePlay = document.getElementById('radioIconePlay');
  const btnMute = document.getElementById('radioBtnMute');
  const iconeMute = document.getElementById('radioIconeMute');
  const radio = document.getElementById('radio-comunal');
  const statusAviso = document.getElementById('radioStatusAviso');

  if (!radio || !btnPlay) return;

  // Notícias narradas: jingle -> notícia -> pausa -> jingle -> próxima notícia...
  if (audio) audio.loop = false;
  const listaNoticias = document.querySelectorAll('#radioNoticias li');
  const legenda = document.getElementById('radioLegenda');
  const PAUSA_ENTRE_BLOCOS_MS = 3500;
  let indiceNoticia = 0;
  let timerNoticia = null;
  let noticiaNoAr = false;

  function emAtlante() {
    return document.body.getAttribute('data-lang') === 'atlantida';
  }

  function encerrarNoticia() {
    noticiaNoAr = false;
    clearTimeout(timerNoticia);
    timerNoticia = null;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if (legenda) legenda.hidden = true;
  }

  function proximoBloco() {
    // Depois da pausa, volta o jingle (o próximo "ended" dispara a notícia seguinte).
    timerNoticia = setTimeout(() => {
      if (!radio.classList.contains('tocando')) return;
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => falarNoticia());
      } else {
        falarNoticia();
      }
    }, PAUSA_ENTRE_BLOCOS_MS);
  }

  function falarNoticia() {
    if (!listaNoticias.length || noticiaNoAr || !radio.classList.contains('tocando')) return;
    noticiaNoAr = true;
    const item = listaNoticias[indiceNoticia % listaNoticias.length];
    indiceNoticia += 1;
    const texto = item.textContent.replace(/\s+/g, ' ').trim();

    if (legenda) {
      legenda.textContent = texto;
      legenda.setAttribute('data-rotulo', emAtlante() ? 'Willakuy' : 'Notícia da rádio');
      legenda.hidden = false;
    }

    let concluida = false;
    const concluir = () => {
      if (concluida) return;
      concluida = true;
      clearTimeout(timerNoticia);
      noticiaNoAr = false;
      if (legenda) legenda.hidden = true;
      if (radio.classList.contains('tocando')) proximoBloco();
    };

    // Sem voz disponível (ou mudo): a legenda fica na tela pelo tempo de uma leitura calma.
    const tempoLeituraMs = Math.max(5000, texto.length * 75);
    const mudo = !!(audio && audio.muted);

    let vozNavegadorUsada = false;
    // Se a notícia tiver um arquivo gravado (data-audio / data-audio-atl), ele tem prioridade sobre a voz do navegador.
    const arquivo = emAtlante() ? (item.dataset.audioAtl || item.dataset.audio) : item.dataset.audio;
    if (arquivo && !mudo) {
      const gravada = new Audio(arquivo);
      gravada.onended = concluir;
      gravada.onerror = () => { falarComVozDoNavegador(); };
      gravada.play().catch(() => { falarComVozDoNavegador(); });
      timerNoticia = setTimeout(concluir, 60000);
      return;
    }
    falarComVozDoNavegador();

    function falarComVozDoNavegador() {
    if (concluida || vozNavegadorUsada) return;
    vozNavegadorUsada = true;
    if ('speechSynthesis' in window && !mudo) {
      try {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        // Não existe voz em Atlante: a voz em espanhol é a que mais se aproxima da fonética quéchua.
        fala.lang = emAtlante() ? 'es-ES' : 'pt-BR';
        fala.rate = 0.95;
        fala.pitch = 0.9;
        fala.onend = concluir;
        fala.onerror = concluir;
        window.speechSynthesis.speak(fala);
        // Rede de segurança caso o navegador nunca dispare "onend".
        timerNoticia = setTimeout(concluir, tempoLeituraMs * 2 + 4000);
        return;
      } catch (_) {}
    }
    timerNoticia = setTimeout(concluir, tempoLeituraMs);
    }
  }

  // Faixa única (jingle + notícia gravada): a legenda da notícia 1 aparece quando a voz entra
  // (segundo indicado em data-noticia-embutida) e, no fim, a faixa recomeça depois de uma pausa.
  const inicioVozEmbutida = audio ? parseFloat(audio.dataset.noticiaEmbutida) : NaN;
  if (audio && !Number.isNaN(inicioVozEmbutida)) {
    const textoEmbutido = listaNoticias[0] ? listaNoticias[0].textContent.replace(/\s+/g, ' ').trim() : '';
    audio.addEventListener('timeupdate', () => {
      if (!legenda || !textoEmbutido) return;
      const naVoz = audio.currentTime >= inicioVozEmbutida && !audio.paused;
      if (naVoz && legenda.hidden) {
        legenda.textContent = textoEmbutido;
        legenda.setAttribute('data-rotulo', emAtlante() ? 'Willakuy' : 'Notícia da rádio');
        legenda.hidden = false;
      } else if (!naVoz && !legenda.hidden) {
        legenda.hidden = true;
      }
    });
    audio.addEventListener('ended', () => {
      if (legenda) legenda.hidden = true;
      if (radio.classList.contains('tocando')) proximoBloco();
    });
  } else {
    audio?.addEventListener('ended', falarNoticia);
  }

  // Fallback com Web Audio API para simular ambiente oceânico/sonar caso o arquivo falhe
  let audioCtx = null;
  let synthGain = null;
  let synthOsc = null;
  let sonarTimer = null;

  function anunciarStatus(mensagem) {
    if (statusAviso) {
      statusAviso.textContent = mensagem;
    }
  }

  function iniciarSintetizadorOceano() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioCtx) {
        audioCtx = new AudioContextClass();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      if (!synthOsc) {
        // Drone abissal suave (60Hz)
        synthOsc = audioCtx.createOscillator();
        synthGain = audioCtx.createGain();

        synthOsc.type = 'sine';
        synthOsc.frequency.setValueAtTime(60, audioCtx.currentTime);

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(120, audioCtx.currentTime);

        synthGain.gain.setValueAtTime(0.04, audioCtx.currentTime);

        synthOsc.connect(filter);
        filter.connect(synthGain);
        synthGain.connect(audioCtx.destination);
        synthOsc.start();

        // Pulso sonar periódico suave a cada 6 segundos
        sonarTimer = setInterval(() => {
          if (!radio.classList.contains('tocando') || (audio && audio.muted)) return;
          try {
            const sonarOsc = audioCtx.createOscillator();
            const sonarGain = audioCtx.createGain();
            sonarOsc.type = 'sine';
            sonarOsc.frequency.setValueAtTime(920, audioCtx.currentTime);
            sonarGain.gain.setValueAtTime(0.02, audioCtx.currentTime);
            sonarGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
            sonarOsc.connect(sonarGain);
            sonarGain.connect(audioCtx.destination);
            sonarOsc.start();
            sonarOsc.stop(audioCtx.currentTime + 1.2);
          } catch (_) {}
        }, 6000);
        // Sem arquivo de áudio, a primeira notícia entra depois de alguns segundos de ambiente.
        setTimeout(falarNoticia, 6000);
      } else if (synthGain) {
        synthGain.gain.setValueAtTime(audio?.muted ? 0 : 0.04, audioCtx.currentTime);
      }
    } catch (_) {}
  }

  function pararSintetizadorOceano() {
    if (synthGain && audioCtx) {
      try {
        synthGain.gain.setValueAtTime(0, audioCtx.currentTime);
      } catch (_) {}
    }
    if (sonarTimer) {
      clearInterval(sonarTimer);
      sonarTimer = null;
    }
  }

  function setEstadoTocando(tocando) {
    if (tocando) {
      radio.classList.add('tocando');
      btnPlay.setAttribute('aria-pressed', 'true');
      btnPlay.setAttribute('aria-label', 'Pausar Rádio Comunal');
      btnPlay.setAttribute('title', 'Pausar');
      if (iconePlay) iconePlay.className = 'fa-solid fa-pause';
      anunciarStatus('Rádio Comunal conectada na frequência 12. Transmissão ativa.');
    } else {
      radio.classList.remove('tocando');
      btnPlay.setAttribute('aria-pressed', 'false');
      btnPlay.setAttribute('aria-label', 'Tocar Rádio Comunal');
      btnPlay.setAttribute('title', 'Tocar');
      if (iconePlay) iconePlay.className = 'fa-solid fa-play';
      anunciarStatus('Rádio Comunal pausada.');
      pararSintetizadorOceano();
      encerrarNoticia();
    }
  }

  // 1. Alterna entre Play e Pause
  btnPlay.addEventListener('click', () => {
    const estaTocando = radio.classList.contains('tocando');

    if (estaTocando) {
      if (audio) audio.pause();
      setEstadoTocando(false);
    } else {
      if (audio) {
        audio.play().then(() => {
          setEstadoTocando(true);
        }).catch((erro) => {
          console.warn('Aviso: Reprodução via elemento audio indisponível; ativando sintetizador de frequência.', erro);
          iniciarSintetizadorOceano();
          setEstadoTocando(true);
        });
      } else {
        iniciarSintetizadorOceano();
        setEstadoTocando(true);
      }
    }
  });

  // 2. Atualiza estado visual vinculado aos eventos nativos do áudio
  if (audio) {
    audio.addEventListener('play', () => setEstadoTocando(true));
    audio.addEventListener('pause', () => setEstadoTocando(false));
  }

  // 3. Mudo / Desmudo com persistência e acessibilidade
  btnMute?.addEventListener('click', () => {
    const novoMudo = audio ? !audio.muted : !(btnMute.getAttribute('aria-pressed') === 'true');
    if (audio) audio.muted = novoMudo;

    btnMute.setAttribute('aria-pressed', novoMudo ? 'true' : 'false');
    btnMute.setAttribute('aria-label', novoMudo ? 'Desmutar som da rádio' : 'Mutar som da rádio');
    btnMute.setAttribute('title', novoMudo ? 'Desmutar' : 'Mudo');

    if (iconeMute) {
      iconeMute.className = novoMudo ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
    }

    if (synthGain && audioCtx) {
      synthGain.gain.setValueAtTime(novoMudo ? 0 : 0.04, audioCtx.currentTime);
    }

    anunciarStatus(novoMudo ? 'Áudio da rádio silenciado.' : 'Áudio da rádio ativado.');
  });

  // 4. Se o usuário clicar no link da Rádio Comunal no rodapé, move o foco e inicia reprodução (WCAG 2.4.4 & 4.1.2)
  document.querySelectorAll('a[href="#radio-comunal"], a[data-i18n="footer.channel_radio"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      radio.scrollIntoView({ behavior: 'smooth' });
      btnPlay.focus();

      if (!radio.classList.contains('tocando')) {
        if (audio) {
          audio.play().then(() => {
            setEstadoTocando(true);
          }).catch((erro) => {
            console.warn('Aviso: Reprodução bloqueada pelo navegador; iniciando canal de contingência.', erro);
            iniciarSintetizadorOceano();
            setEstadoTocando(true);
          });
        } else {
          iniciarSintetizadorOceano();
          setEstadoTocando(true);
        }
      }
    });
  });
});
