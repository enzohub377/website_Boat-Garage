const videoAnimation = document.getElementById('animation');

videoAnimation.addEventListener('ended', function () {
  videoAnimation.classList.add('animation-transition');
});
