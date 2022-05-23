function Stopwatch(container, state = "Stopped", time = 0) {
  this.time = time;
  this.state = state;
  this.container = container;
  this.interval = null;
}

Stopwatch.prototype.init = function () {
  this.render();
  this.bindEventListeners();
};

Stopwatch.prototype.render = function () {
  const template = `
      <div id="stopwatch" class="stopwatch">
        <div class="timer">
          <span id="time" class="time">${this.time}</span>
        </div>
        <div class="controls">
          <button id="start-stop-btn">Start</button>
          <button id="reset-btn">Reset</button>
        </div>
      </div>
    `;
  this.container.innerHTML = template;
};

Stopwatch.prototype.bindEventListeners = function () {
  const startStopBtn = document.querySelector("#start-stop-btn");
  startStopBtn.addEventListener("click", this.startStopTimer.bind(this));

  const resetBtn = document.querySelector("#reset-btn");
  resetBtn.addEventListener("click", this.reset.bind(this));
};

Stopwatch.prototype.startStopTimer = function () {
  if (this.state === "Stopped") {
    this.start();
  } else if (this.state === "Started") {
    this.stop();
  }
};

Stopwatch.prototype.start = function () {
  this.interval = setInterval(() => {
    this.time += 1;
    this.updateTime();
  }, 1000);
  this.state = "Started";
  const startStopBtn = document.querySelector("#start-stop-btn");
  startStopBtn.textContent = "Stop";
};

Stopwatch.prototype.stop = function () {
  clearInterval(this.interval);
  this.interval = null;
  this.state = "Stopped";
  const startStopBtn = document.querySelector("#start-stop-btn");
  startStopBtn.textContent = "Start";
};

Stopwatch.prototype.updateTime = function () {
  const timeEl = document.querySelector("#time");
  timeEl.innerHTML = this.time;
};

Stopwatch.prototype.reset = function () {
  this.stop();
  this.time = 0;
  this.updateTime();
};

const init = () => {
  const container = document.querySelector("#container");
  const stopwatch = new Stopwatch(container);
  stopwatch.init();
};

init();
