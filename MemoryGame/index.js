function Game(container, size) {
  this.size = size;
  this.score = 0;
  this.highScore = 0;
  this.level = 1;
  this.container = container;
  this.started = false;
  this.pattern = null;
  this.cells = [];
  this.playerInputLength = 0;

  this.init();
}

Game.prototype.init = function () {
  this.render();
  this.bindEventListeners();
};

Game.prototype.render = function () {
  const highScore = document.createElement("h3");
  highScore.id = "high-score";
  highScore.innerHTML = `High Score : ${this.highScore}`;
  const score = document.createElement("h3");
  score.id = "score";
  score.innerHTML = `Score : ${this.score}`;
  const level = document.createElement("h3");
  level.id = "level";
  level.innerHTML = `Level : ${this.level}`;
  this.container.appendChild(highScore);
  this.container.appendChild(score);
  this.container.appendChild(level);

  const board = document.createElement("div");
  board.id = "board";
  board.classList.add("board");
  for (let i = 0; i < this.size; i++) {
    const cell = document.createElement("div");
    cell.id = `cell-${i}`;
    cell.classList.add("cell");
    cell.dataset.id = i;
    board.appendChild(cell);
    this.cells.push(cell);
  }
  this.container.appendChild(board);

  const btn = document.createElement("button");
  btn.id = "start-btn";
  btn.innerHTML = "Start";
  this.container.appendChild(btn);
};

Game.prototype.bindEventListeners = function () {
  const btn = document.querySelector("#start-btn");
  btn.addEventListener("click", this.startGame.bind(this));

  const board = document.querySelector("#board");
  board.addEventListener("click", this.handlePlayerTurn.bind(this));
};

Game.prototype.handlePlayerTurn = async function (e) {
  if (!this.started) return;

  const id = +e.target.dataset.id;

  if (typeof id !== "number") return;

  if (this.pattern[this.playerInputLength] !== id) {
    await this.shakeBoard();
    this.reset();
    return;
  }

  this.playerInputLength++;
  if (this.playerInputLength === this.level) {
    this.nextLevel();
  }
};

Game.prototype.nextLevel = function () {
  const board = document.querySelector("#board");
  board.classList.remove("shake");
  this.score++;
  if (this.score > this.highScore) this.highScore = this.score;
  this.level++;
  this.update();
};

Game.prototype.reset = function () {
  const board = document.querySelector("#board");
  board.classList.remove("shake");
  this.score = 0;
  this.level = 1;
  this.update();
};

Game.prototype.shakeBoard = function () {
  return new Promise((resolve) => {
    const board = document.querySelector("#board");
    board.classList.add("shake");
    setTimeout(() => {
      resolve();
    }, 1500);
  });
};

Game.prototype.update = function () {
  const highScore = document.querySelector("#high-score");
  highScore.innerHTML = `High Score : ${this.highScore}`;
  const score = document.querySelector("#score");
  score.innerHTML = `Score : ${this.score}`;
  const level = document.querySelector("#level");
  level.innerHTML = `Level : ${this.level}`;
  this.playerInputLength = 0;
  this.started = false;

  const btn = document.querySelector("#start-btn");
  btn.disabled = false;
};

Game.prototype.setPattern = function () {
  const pattern = [];
  for (let i = 0; i < this.level; i++) {
    const rand = Math.ceil(Math.random() * 1000);
    pattern.push(rand % this.size);
  }
  this.pattern = pattern;
};

Game.prototype.showPattern = function () {
  return new Promise((resolve) => {
    let i = 0;
    let interval = setInterval(() => {
      if (i > 0) {
        const prevCell = this.cells[this.pattern[i - 1]];
        prevCell.style.background = "#e1e1e1";
      }

      if (i == this.level) {
        clearInterval(interval);
        resolve();
        return;
      }

      const cell = this.cells[this.pattern[i]];
      cell.style.background = i % 2 ? "blue" : "green";
      i++;
    }, 1000);
  });
};

Game.prototype.startGame = async function (e) {
  e.target.disabled = true;

  this.setPattern();

  await this.showPattern();

  this.started = true;
};

const init = function () {
  const container = document.querySelector("#container");
  new Game(container, 5);
};

init();
