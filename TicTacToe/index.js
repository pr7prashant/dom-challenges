function TicTacToe() {
  this.turn = "X";
  this.state = [];
  this.winner = "-";
}

TicTacToe.prototype.init = function () {
  this.state = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ];
  this.bindEventListeners();
};

TicTacToe.prototype.bindEventListeners = function () {
  const grid = document.querySelector("#grid");
  grid.addEventListener("click", this.playMove.bind(this));

  const restartBtn = document.querySelector("#restart");
  restartBtn.addEventListener("click", this.restart.bind(this));
};

TicTacToe.prototype.render = function (parent) {
  parent.innerHTML = `
      <div class="game-container">
        <div class="header">
          <h2>Result : <span id="result"></span></h2>
          <h2>Turn : <span id="turn">Player X</span></h2>
          <button id="restart">Restart</button>
        </div>
        <div class="grid" id="grid">
          <div class="row">
            <div id="box-00" class="box" data-row="0" data-col="0">-</div>
            <div id="box-01" class="box" data-row="0" data-col="1">-</div>
            <div id="box-02" class="box" data-row="0" data-col="2">-</div>
          </div>
          <div class="row">
            <div id="box-10" class="box" data-row="1" data-col="0">-</div>
            <div id="box-11" class="box" data-row="1" data-col="1">-</div>
            <div id="box-12" class="box" data-row="1" data-col="2">-</div>
          </div>
          <div class="row">
            <div id="box-20" class="box" data-row="2" data-col="0">-</div>
            <div id="box-21" class="box" data-row="2" data-col="1">-</div>
            <div id="box-22" class="box" data-row="2" data-col="2">-</div>
          </div>
        </div>
      </div>
    `;
};

TicTacToe.prototype.playMove = function (e) {
  const row = +e.target.dataset.row;
  const col = +e.target.dataset.col;
  console.log(row, col);

  // Game Ended (Restart to play again)
  if (this.isFinished() || this.winner !== "-") return;

  // Box already selected
  if (this.state[row][col] !== "-") return;

  // Play player move
  this.state[row][col] = this.turn;
  if (this.isWinner(this.turn)) this.winner = this.turn;
  this.update(row, col);
};

TicTacToe.prototype.isWinner = function (player) {
  // Check Rows
  for (let i = 0; i < 3; i++) {
    let count = 0;
    for (let j = 0; j < 3; j++) {
      if (this.state[i][j] === player) count++;
    }
    if (count === 3) return true;
  }
  // Check Cols
  for (let i = 0; i < 3; i++) {
    let count = 0;
    for (let j = 0; j < 3; j++) {
      if (this.state[j][i] === player) count++;
    }
    if (count === 3) return true;
  }
  // Check First Diagonals
  let count = 0;
  for (let i = 0; i < 3; i++) {
    if (this.state[i][i] === player) count++;
  }
  if (count === 3) return true;
  // Check Second Diagonal
  count = 0;
  for (let i = 0; i < 3; i++) {
    if (this.state[i][2 - i] === player) count++;
  }
  if (count === 3) return true;
};

TicTacToe.prototype.isFinished = function () {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (this.state[i][j] === "-") return false;
    }
  }
  return true;
};

TicTacToe.prototype.update = function (row, col) {
  const box = document.querySelector(`#box-${row}${col}`);
  box.innerHTML = this.turn;
  if (this.winner !== "-") {
    const result = document.querySelector("#result");
    switch (this.winner) {
      case "X":
        result.innerHTML = "Player X Won";
        break;
      case "O":
        result.innerHTML = "Player O Won";
        break;
      case "-":
        result.innerHTML = "Draw";
        break;
    }
  }
  this.turn = this.turn === "X" ? "O" : "X";
  const turn = document.querySelector("#turn");
  turn.innerHTML = `Player ${this.turn}`;
};

TicTacToe.prototype.restart = function () {
  this.reset();
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const box = document.querySelector(`#box-${i}${j}`);
      box.innerHTML = "-";
    }
  }
};

TicTacToe.prototype.reset = function () {
  this.state = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ];
  this.turn = "X";
  this.winner = "-";
  const result = document.querySelector("#result");
  result.innerHTML = "";
  const turn = document.querySelector("#turn");
  turn.innerHTML = this.turn;
};

const init = () => {
  const container = document.querySelector("#container");
  const tickTackToe = new TicTacToe();
  tickTackToe.render(container);
  tickTackToe.init();
};

init();
