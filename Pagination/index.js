function Pagination(totalPages, currPage, onChange) {
  this.totalPages = totalPages;
  this.currPage = currPage;
  this.onChange = onChange;
}

Pagination.prototype.render = function (container) {
  container.innerHTML = `
      <div id="pagination" class="pagination">
        <div id="first" class="btn btn-text">First</div>
        <div id="prev" class="btn btn-sm">&lt;&lt;</div>
        <div id="btn-1" class="btn btn-sm selected">1</div>
        <div id="btn-2" class="btn btn-sm">2</div>
        <div id="btn-3" class="btn btn-sm">3</div>
        <div id="next" class="btn btn-sm">&gt;&gt;</div>
        <div id="last" class="btn btn-text">Last</div>
      </div>
    `;
};

Pagination.prototype.bindEventListeners = function () {
  const first = document.getElementById("first");
  first.addEventListener("click", this.goToFirst.bind(this));

  const last = document.getElementById("last");
  last.addEventListener("click", this.goToLast.bind(this));

  const prev = document.getElementById("prev");
  prev.addEventListener("click", this.previous.bind(this));

  const next = document.getElementById("next");
  next.addEventListener("click", this.next.bind(this));

  const btn1 = document.getElementById("btn-1");
  btn1.addEventListener("click", this.clickPage.bind(this));

  const btn2 = document.getElementById("btn-2");
  btn2.addEventListener("click", this.clickPage.bind(this));

  const btn3 = document.getElementById("btn-3");
  btn3.addEventListener("click", this.clickPage.bind(this));
};

Pagination.prototype.goToFirst = function () {
  this.currPage = 0;
  this.update();
  this.onChange();
};

Pagination.prototype.goToLast = function () {
  this.currPage = this.totalPages - 1;
  this.update();
  this.onChange();
};

Pagination.prototype.update = function () {
  const start = Math.floor(this.currPage / 3);
  for (let i = 1; i <= 3; i++) {
    const btn = document.getElementById(`btn-${i}`);
    btn.classList.remove("selected");
    const page = start * 3 + i;
    btn.innerText = btn.dataset.page = page;
    if (page == this.currPage + 1) btn.classList.add("selected");
  }
};

Pagination.prototype.next = function () {
  this.currPage = Math.min(this.totalPages - 1, this.currPage + 1);
  this.update();
  this.onChange();
};

Pagination.prototype.previous = function () {
  this.currPage = Math.max(0, this.currPage - 1);
  this.update();
  this.onChange();
};

Pagination.prototype.clickPage = function (e) {
  const newPage = e.target.dataset.page;
  this.currPage = newPage - 1;
  this.update();
  this.onChange();
};

function init() {
  const container = document.getElementById("container");
  const onChange = () => console.log("Page Changed");
  const pagination = new Pagination(50, 0, onChange);
  pagination.render(container);
  pagination.bindEventListeners();
  pagination.update();
}

init();
