function ProgressBar(idx, speed, color) {
  this.idx = idx;
  this.progress = 0;
  this.speed = speed;
  this.color = color;
}

ProgressBar.prototype.render = function (parent) {
  const container = document.createElement("div");
  container.classList.add("progress-container");
  container.id = `progress-container-${this.idx}`;

  const progress = document.createElement("div");
  progress.id = `progress-${this.idx}`;
  progress.classList.add("progress");
  progress.style.width = "0";
  container.appendChild(progress);

  parent.appendChild(container);
};

ProgressBar.prototype.animateProgressBar = function () {
  return new Promise((resolve) => {
    const progress = document.querySelector(`#progress-${this.idx}`);
    for (let i = 1; i <= 10; i++) {
      setTimeout(() => {
        this.progress = i * 10;
        progress.style.width = `${this.progress}%`;
        progress.style.background = this.color;
        if (this.progress >= 100) resolve();
      }, (i * 1000) / this.speed);
    }
  });
};

ProgressBar.prototype.reset = function () {
  this.progress = 0;
  const progress = document.querySelector(`#progress-${this.idx}`);
  progress.style.width = 0;
};

const startProgressBars = async (pbList, idx, button) => {
  if (idx >= pbList.length) {
    button.disabled = false;
    return;
  }
  await pbList[idx].animateProgressBar();
  startProgressBars(pbList, idx + 1, button);
};

const resetProgressBars = (pbList) => {
  for (const pb of pbList) {
    pb.reset();
  }
};

const init = () => {
  const container = document.querySelector("#container");
  const pbList = [];
  fetch("./config.json")
    .then((res) => res.json())
    .then(({ data }) => {
      for (let i = 0; i < data.length; i++) {
        const pb = new ProgressBar(i, data[i].speed, data[i].color);
        pbList.push(pb);
        pb.render(container);
      }
      const button = document.createElement("button");
      button.innerHTML = "Run";
      button.addEventListener("click", () => {
        button.disabled = true;
        resetProgressBars(pbList);
        startProgressBars(pbList, 0, button);
      });
      container.appendChild(button);
    })
    .catch((err) => console.log(err));
};

init();
