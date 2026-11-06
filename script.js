gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById("hero-canvas");
const context = canvas.getContext("2d");

// Define a resolução nativa do canvas (Full HD para acompanhar a qualidade do seu vídeo)
canvas.width = 1920;
canvas.height = 1080;

// VEJA AQUI: Coloque a quantidade exata de imagens que vieram dentro do seu ZIP
const frameCount = 250; 

// Função que monta o caminho correto de cada imagem baseado no índice
const currentFrame = index => (
  `assets/scroll-video-frame/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`
  // Ajuste o "boat-garage_" acima caso o nome do seu arquivo seja diferente!
);

// Objeto virtual que o GSAP usará para animar os números dos frames
let boatAnimation = { frame: 0 };
let images = [];
let imagesLoaded = 0;

// Loop para pré-carregar todas as imagens na memória do navegador (evita piscadas em branco)
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  img.onload = () => {
    imagesLoaded++;
    // Inicia a animação assim que a primeira imagem estiver pronta
    if (imagesLoaded === 1) render(); 
  };
  images.push(img);
}

// Cria a linha do tempo amarrada ao ScrollTrigger
gsap.to(boatAnimation, {
  frame: frameCount - 1,
  snap: "frame", // Força o GSAP a arredondar para números inteiros (frame 1, frame 2...)
  ease: "none",  // Mantém a velocidade linear com o scroll
  scrollTrigger: {
    trigger: ".scroll-animation",
    start: "top top",
    end: "+=4000", // Aumente esse valor se quiser que o scroll do vídeo dure mais tempo na tela
    scrub: 0.5,    // Suavização ultra leve para dar o aspecto de cinema
    pin: true,     // Trava a seção na tela
    invalidateOnRefresh: true
  },
  onUpdate: render // Executa a função de desenhar a imagem a cada movimento do scroll
});

// Desenha a imagem atual no Canvas
function render() {
  if (images[boatAnimation.frame]) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[boatAnimation.frame], 0, 0, canvas.width, canvas.height);
  }
}
