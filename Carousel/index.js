function Carousel(container, width, height, images, curr, delay) {
  this.container = container;
  this.width = width;
  this.height = height;
  this.images = images;
  this.curr = curr;
  this.delay = delay;
  this.interval = null;
}

Carousel.prototype.init = function () {
  this.preloadImages();
  this.render();
  this.setImage();
  this.startSlideShow();
  this.bindEventListeners();
};

Carousel.prototype.bindEventListeners = function () {
  const left = document.getElementById("left");
  left.addEventListener("click", this.changeImage.bind(this, true));
  const right = document.getElementById("right");
  right.addEventListener("click", this.changeImage.bind(this, false));
};

Carousel.prototype.preloadImages = function () {
  let count = 0;
  const images = this.images;
  new Promise((resolve, reject) => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = function () {
        count++;
        if (count === images.length) resolve(count);
      };
      img.onerror = function () {
        reject(`Failed to load image ${src}`);
      };
    });
  });
};

Carousel.prototype.render = function () {
  this.container.innerHTML = `
      <div class="carousel" id="carousel">
        <div class="arrow" id="left">&lt;</div>
        <div class="arrow" id="right">&gt;</div>
      </div>
    `;
};

Carousel.prototype.setImage = function () {
  const carousel = document.getElementById("carousel");
  carousel.style.backgroundImage = `url(${this.images[this.curr]})`;
};

Carousel.prototype.startSlideShow = function () {
  this.interval = setInterval(() => {
    this.curr = (this.curr + 1) % this.images.length;
    this.setImage();
  }, this.delay);
};

Carousel.prototype.changeImage = function (isPrev) {
  if (isPrev) {
    this.curr = this.curr - 1 < 0 ? this.images.length - 1 : this.curr - 1;
  } else {
    this.curr = (this.curr + 1) % this.images.length;
  }
  this.setImage();
};

const init = () => {
  const images = [
    "https://picsum.photos/id/237/500/200",
    "https://picsum.photos/id/238/500/200",
    "https://picsum.photos/id/239/500/200",
    "https://picsum.photos/id/240/500/200",
    "https://picsum.photos/id/241/500/200",
  ];

  const container = document.getElementById("container");
  const carousel = new Carousel(container, 500, 200, images, 0, 4000);
  carousel.init();
};

init();
