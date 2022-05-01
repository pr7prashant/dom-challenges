import { data } from "./data.js";

function FileTree(data) {
  this.data = data;
}

FileTree.prototype.bindEventListeners = function () {
  const root = document.querySelector("#file-tree");
  root.addEventListener("click", this.clickHandler.bind(this));
};

FileTree.prototype.clickHandler = function (e) {
  const id = e.target.dataset.id;
  if (!id) return;

  const el = document.querySelector(`#${id}`);
  const children = el.getElementsByClassName("children");
  if (children.length) {
    children[0].classList.toggle("collapsed");
  }
};

FileTree.prototype.render = function (container) {
  const t = this.template(this.data);
  container.innerHTML = t;
};

FileTree.prototype.template = function (data) {
  const children = data.reduce((acc, d) => {
    if (d.type === "dir") acc += this.dirTemplate(d);
    else acc += this.fileTemplate(d);
    return acc;
  }, "");

  return `
    <div id="file-tree" class="file-tree">
      ${children}
    </div>
    `;
};

FileTree.prototype.dirTemplate = function (data) {
  return `
    <div id=${data.name} class="dir">
      <div class="head" data-id=${data.name}>
        <i class="fa-solid fa-folder" data-id=${data.name}></i>
        <span class="name" data-id=${data.name}>${data.name}</span>
      </div>
      ${this.childrenTemplate(data.children, data.collapsed)}
    </div>
    `;
};

FileTree.prototype.childrenTemplate = function (data, isCollapsed) {
  if (!data || !data.length) return "";

  const children = data.reduce((acc, d) => {
    if (d.type === "dir") acc += this.dirTemplate(d);
    else acc += this.fileTemplate(d);
    return acc;
  }, "");

  return `
    <div class="children ${isCollapsed ? "collapsed" : ""}">
      ${children}
    </div>
  `;
};

FileTree.prototype.fileTemplate = function (data) {
  return `
    <div class="head">
      <i class="fa-solid fa-file"></i>
      <span class="name">${data.name}</span>
    </div>
 `;
};

const init = () => {
  const ft = new FileTree(data);
  const container = document.querySelector("#container");
  ft.render(container);
  ft.bindEventListeners();
};

init();
