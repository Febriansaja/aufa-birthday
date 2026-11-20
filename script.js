
const letterText = `Selamat ulang tahun yang ke-19, Aufa Syakhima Hutabarat.

Di hari spesialmu ini, aku menyiapkan halaman kecil penuh bunga, hati, lagu, dan kenangan sebagai bentuk rasa sayang yang mungkin sering kali tidak terucap sempurna.

Terima kasih sudah hadir dan mewarnai hari-hariku dengan begitu banyak cerita indah. Semoga di usia sembilan belas ini, langkahmu selalu dimudahkan, hatimu selalu dipenuhi kebahagiaan, dan setiap impianmu perlahan menemukan jalannya.

Aku selalu di sini, mendukung dan menyayangimu.`;

const $ = (id) => document.getElementById(id);

let typingTimer = null;
let letterShown = false;

function toast(message) {
  const el = $('toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove('show'), 2600);
}

function createHeart(x, y) {
  const heart = document.createElement('span');
  heart.className = 'heart-float';
  heart.textContent = ['♡', '♥', '✧'][Math.floor(Math.random() * 3)];
  heart.style.left = x + 'px';
  heart.style.top = y + 'px';
  heart.style.fontSize = (13 + Math.random() * 15) + 'px';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1900);
}

function burstHearts() {
  for (let i = 0; i < 18; i++) {
    setTimeout(() => {
      createHeart(
        window.innerWidth * (.25 + Math.random() * .5),
        window.innerHeight * (.35 + Math.random() * .3)
      );
    }, i * 65);
  }
}

function startPetals() {
  const holder = $('petals');

  setInterval(() => {
    if (document.hidden) return;

    const p = document.createElement('span');
    p.className = 'petal';
    p.textContent = ['✿', '❀', '♡', '✧'][Math.floor(Math.random() * 4)];
    p.style.left = Math.random() * 100 + 'vw';
    p.style.fontSize = (10 + Math.random() * 15) + 'px';
    p.style.animationDuration = (7 + Math.random() * 7) + 's';
    p.style.setProperty('--drift', (Math.random() * 180 - 90) + 'px');

    holder.appendChild(p);
    setTimeout(() => p.remove(), 15000);
  }, 850);
}

function showLetter() {
  if (letterShown) return;

  letterShown = true;
  const target = $('typedLetter');
  let i = 0;

  target.textContent = '';

  typingTimer = setInterval(() => {
    target.textContent = letterText.slice(0, i++);
    if (i > letterText.length) {
      clearInterval(typingTimer);
    }
  }, 24);
}

function updateMusicUI(playing) {
  $('musicLabel').textContent = playing
    ? 'About You · Pause'
    : 'About You · Play';

  $('equalizer')?.classList.toggle('playing', playing);
  document.querySelector('.vinyl')?.classList.toggle('spinning', playing);
}

async function toggleMusic() {
  const audio = $('backgroundMusic');

  if (audio.paused) {
    try {
      await audio.play();
      updateMusicUI(true);
    } catch (error) {
      toast('Musik belum bisa diputar. Coba tekan tombol musik sekali lagi ♡');
    }
  } else {
    audio.pause();
    updateMusicUI(false);
  }
}

$('backgroundMusic').addEventListener('play', () => updateMusicUI(true));
$('backgroundMusic').addEventListener('pause', () => updateMusicUI(false));

$('startBtn').addEventListener('click', () => {
  $('envelope').classList.add('open');
  toggleMusic();
  burstHearts();

  setTimeout(() => {
    $('birthday').scrollIntoView({ behavior: 'smooth' });
    showLetter();
  }, 750);
});

$('envelope').addEventListener('click', () => {
  $('startBtn').click();
});

$('showLetterBtn').addEventListener('click', () => {
  showLetter();
  $('typedLetter').scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
});

// Galeri delapan foto Aufa
document.querySelectorAll('.photo-uploaded').forEach((card) => {
  const image = card.querySelector('img');

  card.addEventListener('click', () => openPhoto(image.src));
});

function openPhoto(url) {
  const overlay = document.createElement('div');
  overlay.className = 'photo-lightbox';
  overlay.innerHTML = '<button type="button" aria-label="Tutup">×</button><img alt="Foto Aufa">';

  overlay.querySelector('img').src = url;
  overlay.addEventListener('click', () => overlay.remove());

  document.body.appendChild(overlay);
}

// Musik About You
$('musicToggle').addEventListener('click', toggleMusic);

// Kejutan terakhir dan lilin ulang tahun ke-19
$('blowBtn').addEventListener('click', () => {
  if ($('finalMessage').classList.contains('show')) return;

  $('flame').classList.add('out');

  $('wishInstruction').textContent =
    'A wish made with all my heart, just for you.';

  $('blowBtn').textContent = 'A wish for you ♡';
  $('finalMessage').classList.add('show');

  burstHearts();

  setTimeout(() => {
    $('finalMessage').scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }, 250);
});

// Animasi saat bagian website terlihat
const observer = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      if (entry.target.id === 'letter') {
        showLetter();
      }

      observer.unobserve(entry.target);
    }
  }),
  { threshold: .12 }
);

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

startPetals();

document.addEventListener('click', (e) => {
  if (Math.random() > .45) {
    createHeart(e.clientX, e.clientY);
  }
});
