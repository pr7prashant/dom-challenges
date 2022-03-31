function ProgressBar() {
  this.progress = 0;
}

ProgressBar.prototype.render = function (parent) {
  const container = document.createElement("div");
  container.classList.add("progress-container");

  const progress = document.createElement("div");
  progress.id = "progress";
  progress.classList.add("progress");
  progress.style.width = "0";
  container.appendChild(progress);

  const button = document.createElement("button");
  button.innerHTML = "Run";
  button.addEventListener("click", this.animateProgressBar.bind(this));

  parent.appendChild(container);
  parent.appendChild(button);
};

ProgressBar.prototype.animateProgressBar = function () {
  const progress = document.querySelector("#progress");
  for (let i = 1; i <= 10; i++) {
    setTimeout(() => {
      this.progress = i * 10;
      progress.style.width = `${this.progress}%`;
    }, i * 1000);
  }
};

const init = () => {
  const container = document.querySelector("#container");
  const pb = new ProgressBar();
  pb.render(container);
};

init();
