/**
 * RÁDIO COMUNAL — FREQUÊNCIA 12
 * Script minimalista para tocar/pausar o áudio em loop.
 */
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('radioAudio');
  const btnPlay = document.getElementById('radioBtnPlay');
  const iconePlay = document.getElementById('radioIconePlay');
  const btnMute = document.getElementById('radioBtnMute');
  const iconeMute = document.getElementById('radioIconeMute');
  const radio = document.getElementById('radio-comunal');

  if (!audio || !btnPlay) return;

  // 1. Alterna entre Play e Pause
  btnPlay.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  });

  // 2. Atualiza estado visual quando o áudio toca ou pausa
  audio.addEventListener('play', () => {
    radio.classList.add('tocando');
    iconePlay.className = 'fa-solid fa-pause';
  });

  audio.addEventListener('pause', () => {
    radio.classList.remove('tocando');
    iconePlay.className = 'fa-solid fa-play';
  });

  // 3. Mudo / Desmudo
  btnMute?.addEventListener('click', () => {
    audio.muted = !audio.muted;
    iconeMute.className = audio.muted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
  });

  // 4. Se o usuário clicar no link da Rádio Comunal no rodapé, aciona o áudio
  document.querySelectorAll('a[href="#radio-comunal"], a[data-i18n="footer.channel_radio"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      audio.play().catch(() => {});
    });
  });
});
