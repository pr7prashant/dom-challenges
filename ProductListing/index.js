import {
  getAllCategories,
  getAllProducts,
  getProductsByCategories,
} from "./services.js";

let state = {
  filters: [],
  categories: [],
  products: [],
};

const filterCategory = async (e) => {
  const id = +e.target.dataset.id;
  if (!id) return;

  const category = state.categories.find((c) => c.id === id);

  const chkbox = document.querySelector(`#chkbox-${id}`);
  if (chkbox.checked) state.filters.push(category.label);
  else state.filters = state.filters.filter((f) => f !== category.label);

  const res = await getProductsByCategories(state.filters);
  state.products = res;
  renderProducts(state.products);
};

const renderCategories = (categories) => {
  const container = document.querySelector("#categories");
  container.addEventListener("input", filterCategory);
  for (const c of categories) {
    const category = document.createElement("div");
    category.classList.add("category");
    const chkbox = document.createElement("input");
    chkbox.type = "checkbox";
    chkbox.id = `chkbox-${c.id}`;
    chkbox.dataset.id = c.id;
    const label = document.createElement("label");
    label.innerHTML = c.label;
    label.htmlFor = `chkbox-${c.id}`;
    category.appendChild(chkbox);
    category.appendChild(label);
    container.appendChild(category);
  }
};

const renderProducts = (products) => {
  const container = document.querySelector("#products");
  container.innerHTML = "";

  for (const p of products) {
    const card = document.createElement("div");
    card.classList.add("product-card");

    const img = document.createElement("img");
    img.src = p.image;
    img.alt = p.description;
    img.classList.add("img");
    card.appendChild(img);

    const desc = document.createElement("div");
    desc.classList.add("desc");
    const price = document.createElement("div");
    price.innerHTML = `₹${p.price}`;
    price.classList.add("info");
    const title = document.createElement("div");
    title.innerHTML = p.title;
    title.title = p.title;
    title.classList.add("info");
    desc.appendChild(price);
    desc.appendChild(title);
    card.appendChild(desc);

    container.appendChild(card);
  }
};

const init = async () => {
  const p1 = getAllCategories();
  const p2 = getAllProducts();
  const res = await Promise.all([p1, p2]);
  const categories = res[0];
  const products = res[1];

  state.categories = [...categories];
  renderCategories(state.categories);

  state.products = [...products];
  renderProducts(state.products);
};

init();
