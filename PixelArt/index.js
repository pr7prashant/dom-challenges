function Board(rows, cols, container) {
  this.rows = rows;
  this.cols = cols;
  this.container = container;
  this.pressed = false;
  this.selectedColor = "#222222";
  this.state = [];
}

Board.prototype.init = function () {
  this.initState();
  this.renderBoard();
  this.attachEventListeners();
};

Board.prototype.initState = function () {
  for (let i = 0; i < this.rows; i++) {
    const row = [];
    for (let j = 0; j < this.cols; j++) {
      row.push("fff");
    }
    this.state.push(row);
  }
};

Board.prototype.renderBoard = function () {
  const board = document.createElement("div");
  board.setAttribute("id", "board");
  board.classList.add("board");

  // Add rows
  for (let i = 0; i < this.rows; i++) {
    const row = document.createElement("div");
    row.setAttribute("id", `row-${i}`);
    row.classList.add("row");

    // Add cells in row
    for (let j = 0; j < this.cols; j++) {
      const cell = document.createElement("div");
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.setAttribute("id", `cell-${i}-${j}`);
      cell.classList.add("cell");
      cell.style.backgroundColor = this.state[i][j];
      row.appendChild(cell);
    }
    board.appendChild(row);
  }

  this.container.appendChild(board);
};

Board.prototype.attachEventListeners = function () {
  const board = document.querySelector("#board");
  board.addEventListener("click", this.handleClick.bind(this));
  board.addEventListener("mousedown", this.handleMouseDown.bind(this));
  board.addEventListener("mouseup", this.handleMouseUp.bind(this));
  board.addEventListener("mouseover", this.handleMouseOver.bind(this));
};

Board.prototype.handleClick = function (e) {
  const cell = e.target;
  const row = +cell.dataset.row;
  const col = +cell.dataset.col;

  // if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) return;
  if (!(row >= 0 && row < this.rows) || !(col >= 0 && col < this.cols)) return;

  let color;
  if (this.state[row][col] === this.selectedColor) {
    color = "#fff";
  } else {
    color = this.selectedColor;
  }
  cell.style.backgroundColor = color;
  this.state[row][col] = color;
};

Board.prototype.handleMouseDown = function (e) {
  this.pressed = true;
  console.log(e);
};

Board.prototype.handleMouseUp = function (e) {
  this.pressed = false;
  console.log(e);
};

Board.prototype.handleMouseOver = function (e) {
  const cell = e.target;
  const row = +cell.dataset.row;
  const col = +cell.dataset.col;

  if (
    !(row >= 0 && row < this.rows) ||
    !(col >= 0 && col < this.cols) ||
    !this.pressed
  )
    return;

  cell.style.backgroundColor = this.selectedColor;
  this.state[row][col] = this.selectedColor;
};

const container = document.querySelector("#board-container");
const b = new Board(10, 10, container);
b.init();

const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "pink",
  "black",
  "blue",
  "brown",
  "purple",
  "cyan",
];

function addColorPanel() {
  const br = document.createElement("br");
  container.appendChild(br);

  const row = document.createElement("div");
  row.setAttribute("id", "color-panel");
  row.classList.add("row");
  // Add cells in color row
  for (let j = 0; j < 10; j++) {
    const cell = document.createElement("div");
    cell.dataset.color = colors[j];
    cell.setAttribute("id", `color-${j}`);
    cell.classList.add("cell");
    cell.style.backgroundColor = colors[j];
    row.appendChild(cell);
  }
  container.appendChild(row);
  row.addEventListener("click", this.handleColorChange.bind(this));
}

function handleColorChange(e) {
  const color = e.target.dataset.color;
  b.selectedColor = color;
}

addColorPanel();
