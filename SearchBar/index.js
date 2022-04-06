import { getSuggestions, debounce } from "./services.js";

function SearchBar(parent) {
  this.parent = parent;
  this.value = "";
  this.suggestions = [];
  this.init();
}

SearchBar.prototype.init = function () {
  this.render(this.parent);
  this.bindEventListeners();
};

SearchBar.prototype.bindEventListeners = function () {
  const suggestions = document.querySelector("#suggestions");
  suggestions.addEventListener("click", this.handleSelection.bind(this));

  const input = document.querySelector("#input");
  input.addEventListener("input", debounce(this.handleChange.bind(this), 500));
  input.addEventListener("blur", () => {
    setTimeout(() => {
      this.hideSuggestions();
    }, 200);
  });
};

SearchBar.prototype.handleChange = async function (e) {
  const value = e.target.value;
  this.value = value;

  const res = await getSuggestions(value);
  this.suggestions = res;
  this.showSuggestions();
};

SearchBar.prototype.showSuggestions = function () {
  const suggestions = document.querySelector("#suggestions");
  suggestions.innerHTML = "";
  for (const s of this.suggestions) {
    const suggestion = document.createElement("div");
    suggestion.id = `suggestion-${s.id}`;
    suggestion.dataset.id = s.id;
    suggestion.classList.add("suggestion");
    suggestion.innerHTML = s.name;
    suggestions.appendChild(suggestion);
  }
  suggestions.classList.remove("hide");
};

SearchBar.prototype.hideSuggestions = function () {
  const suggestions = document.querySelector("#suggestions");
  suggestions.innerHTML = "";
  suggestions.classList.add("hide");
};

SearchBar.prototype.handleSelection = function (e) {
  const sId = e.target.dataset.id;
  if (!sId) return;

  const suggestion = this.suggestions.find((s) => s.id === +sId);
  this.value = suggestion.name;
  this.suggestions = [];

  const input = document.querySelector("#input");
  input.value = this.value;
  this.hideSuggestions();
};

SearchBar.prototype.render = function (parent) {
  const container = document.createElement("div");
  container.classList.add("search-bar");

  const input = document.createElement("input");
  input.type = "text";
  input.id = "input";

  const suggestions = document.createElement("div");
  suggestions.id = "suggestions";
  suggestions.classList.add("suggestions");
  suggestions.classList.add("hide");

  container.appendChild(input);
  container.appendChild(suggestions);
  parent.appendChild(container);
};

const init = function () {
  const parent = document.querySelector("#container");
  new SearchBar(parent);
};

init();
