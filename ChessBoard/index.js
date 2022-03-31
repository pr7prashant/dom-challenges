function Board() {
  this.state = [];
  this.root = undefined;

  this.init();
}

Board.prototype.init = function () {
  const board = document.createElement("div");
  board.classList.add("board");
  for (let i = 0; i < 8; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    this.state.push([]);
    for (let j = 0; j < 8; j++) {
      const col = document.createElement("div");
      col.classList.add("col");
      if ((i % 2 == 0 && j % 2 == 1) || (i % 2 == 1 && j % 2 == 0)) {
        col.classList.add("bg-black");
      }
      col.dataset.row = i;
      col.dataset.col = j;
      row.appendChild(col);
      this.state[i].push(col);
    }
    board.appendChild(row);
  }
  this.root = board;

  this.bindEventListeners();
};

Board.prototype.render = function (container) {
  container.appendChild(this.root);
};

Board.prototype.bindEventListeners = function () {
  this.root.addEventListener("click", this.handleClick.bind(this));
};

Board.prototype.isValid = function (x, y) {
  if (x >= 0 && x < 8 && y >= 0 && y < 8) return true;
  return false;
};

Board.prototype.handleClick = function (e) {
  const row = e.target.dataset.row;
  const col = e.target.dataset.col;

  const dx = [1, 1, -1, -1];
  const dy = [1, -1, 1, -1];

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const cell = this.state[i][j];
      cell.classList.remove("bg-red");
      if ((i % 2 == 0 && j % 2 == 1) || (i % 2 == 1 && j % 2 == 0)) {
        cell.classList.add("bg-black");
      }
    }
  }

  for (let i = 0; i < 4; i++) {
    let x = +row + dx[i];
    let y = +col + dy[i];
    while (this.isValid(x, y)) {
      const cell = this.state[x][y];
      cell.classList.add("bg-red");
      x += dx[i];
      y += dy[i];
    }
  }
};

const init = () => {
  const container = document.querySelector("#container");
  const board = new Board(container);
  board.render(container);
};

init();
