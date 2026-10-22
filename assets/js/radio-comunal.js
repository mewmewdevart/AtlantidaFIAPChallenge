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
