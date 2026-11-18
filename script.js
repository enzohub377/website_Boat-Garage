gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById('boatAnimation');
const context = canvas.getContext('2d');

canvas.width = 1920;
canvas.height = 1080;

const frameCount = 250;

const currentFrame = (index) =>
  `assets/scroll-XOcruiser-frame/scroll-frame${(index + 1).toString().padStart(3, '0')}.webp`;

let boatAnimation = { frame: 0 };
let images = [];
let imagesLoaded = 0;

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  img.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === 1) render();
  };
  images.push(img);
}

// Cria uma linha do tempo única controlada pelo ScrollTrigger
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.scroll-animation',
    start: 'top top',
    end: '+=4500', // Aumentei um pouco para dar tempo confortável de leitura nos 3 cards
    scrub: 1.5,
    pin: true,
    invalidateOnRefresh: true,
  },
});

// 1. Animação principal dos 250 frames (dura toda a timeline: do 0 ao 10)
tl.to(
  boatAnimation,
  {
    frame: frameCount - 1,
    snap: 'frame',
    ease: 'none',
    duration: 10,
    onUpdate: render,
  },
  0,
);

// 2. CARD 1: Aparece no início (1.0) e some antes do meio (3.5)
tl.fromTo(
  '.card-1',
  { opacity: 0, y: 40 },
  { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
  1.0, // Momento de entrada (10% do scroll)
).to(
  '.card-1',
  { opacity: 0, y: -40, duration: 0.8, ease: 'power2.in' },
  3.2, // Momento de saída (32% do scroll)
);

// 3. CARD 2: Aparece no meio (4.2) e some em (6.8)
tl.fromTo(
  '.card-2',
  { opacity: 0, y: 40 },
  { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
  4.2, // Momento de entrada (42% do scroll)
).to(
  '.card-2',
  { opacity: 0, y: -40, duration: 0.8, ease: 'power2.in' },
  6.5, // Momento de saída (65% do scroll)
);

// 4. CARD 3: Aparece na reta final (7.5) e fica até quase o fim (9.5)
tl.fromTo(
  '.card-3',
  { opacity: 0, y: 40 },
  { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
  7.5, // Momento de entrada (75% do scroll)
).to(
  '.card-3',
  { opacity: 0, y: -40, duration: 0.8, ease: 'power2.in' },
  9.2, // Momento de saída (92% do scroll)
);

function render() {
  if (images[boatAnimation.frame]) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(
      images[boatAnimation.frame],
      0,
      0,
      canvas.width,
      canvas.height,
    );
  }
}
