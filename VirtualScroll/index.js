const init = async () => {
  const data = await fetchData();

  new VirtualScroll(data, 500, 74, 10, createList, document.body);
};

function VirtualScroll(data, height, rowHeight, buffer, template, parent) {
  this.data = data;
  this.height = height;
  this.rowHeight = rowHeight;
  this.template = template;
  this.parent = parent;
  this.buffer = buffer;
  this.visibleNodes = Math.ceil(height / rowHeight) + 2 * buffer;
  this.scrollTop = 0;

  this.init();
}

VirtualScroll.prototype.init = function () {
  const scrollContainer = document.createElement("div");
  scrollContainer.id = "scroll-container";
  scrollContainer.classList.add("scroll-container");
  const listContainer = document.createElement("div");
  listContainer.id = "list-container";
  listContainer.classList.add("list-container");
  listContainer.style.height = `${this.rowHeight * this.data.length}px`;
  const visibleItems = document.createElement("div");
  visibleItems.id = "visible-items";
  visibleItems.classList.add("visible-items");
  listContainer.appendChild(visibleItems);
  scrollContainer.appendChild(listContainer);
  this.parent.appendChild(scrollContainer);

  const data = this.data.slice(0, this.visibleNodes);
  this.render(data);

  this.bindEventListeners();
};

VirtualScroll.prototype.render = function (data, offsetY = 0) {
  const visibleItems = document.querySelector("#visible-items");
  const list = createList(data);
  visibleItems.innerHTML = "";
  visibleItems.appendChild(list);
  visibleItems.style.transform = `translateY(${offsetY}px)`;
};

VirtualScroll.prototype.bindEventListeners = function () {
  const scrollContainer = document.querySelector("#scroll-container");
  scrollContainer.addEventListener("scroll", (e) => {
    const cb = () => {
      this.scrollTop = e.target.scrollTop;
      this.scrollHandler();
    };
    requestAnimationFrame(cb);
  });
};

VirtualScroll.prototype.scrollHandler = function () {
  let start = Math.floor(this.scrollTop / this.rowHeight) - this.buffer;
  start = Math.max(0, start);
  const data = this.data.slice(start, start + this.visibleNodes);
  this.render(data, start * this.rowHeight);
};

const fetchData = () => {
  return fetch("https://jsonplaceholder.typicode.com/photos")
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(`Failed to fetch data : ${err}`));
};

const createList = (data) => {
  const fragment = document.createDocumentFragment();

  for (const item of data) {
    const row = createListItem(item);
    fragment.appendChild(row);
  }

  return fragment;
};

const createListItem = (item) => {
  const row = document.createElement("div");
  row.classList.add("row");

  const img = document.createElement("img");
  img.classList.add("thumbnail");
  img.alt = "Thumbnail";
  img.src = item.url;
  row.appendChild(img);

  const album = document.createElement("div");
  album.classList.add("album");
  const title = document.createElement("div");
  title.classList.add("title");
  title.innerHTML = item.title;
  album.appendChild(title);
  const link = document.createElement("a");
  link.classList.add("link");
  link.href = item.thumbnailUrl;
  link.innerHTML = "Link";
  album.appendChild(link);
  row.appendChild(album);

  return row;
};

init();
