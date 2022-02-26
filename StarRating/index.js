function StarRating(rating, container) {
  this.rating = rating;
  this.container = container;
  this.init();
}

StarRating.prototype.init = function () {
  this.render();
  this.fill(this.rating);
  this.bindEvents();
};

StarRating.prototype.render = function () {
  const fragment = document.createDocumentFragment();
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("i");
    star.classList.add("fa-star");
    star.classList.add("fa-regular");
    star.dataset.id = i;
    fragment.appendChild(star);
  }
  this.container.appendChild(fragment);
};

StarRating.prototype.fill = function (val) {
  const stars = this.container.children;
  if (stars.length === 0) return;
  for (let i = 0; i < 5; i++) {
    stars[i].classList.remove("fa-regular");
    stars[i].classList.remove("fa-solid");
    if (i < val) {
      stars[i].classList.add("fa-solid");
    } else {
      stars[i].classList.add("fa-regular");
    }
  }
};

StarRating.prototype.onClick = function (e) {
  console.log(e);
  const val = e?.target?.dataset?.id;
  if (!val) return;
  this.rating = +val;
  this.fill(this.rating);
};

StarRating.prototype.onMouseOver = function (e) {
  console.log(e);
  const val = e?.target?.dataset?.id;
  if (!val) return;
  this.fill(val);
};

StarRating.prototype.onMouseOut = function (e) {
  console.log(e);
  this.fill(this.rating);
};

StarRating.prototype.bindEvents = function () {
  this.container.addEventListener("click", this.onClick.bind(this));
  this.container.addEventListener("mouseover", this.onMouseOver.bind(this));
  this.container.addEventListener("mouseout", this.onMouseOut.bind(this));
};

const container = document.querySelector("#container");
const starRating = new StarRating(3, container);
