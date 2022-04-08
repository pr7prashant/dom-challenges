import config from "./config.js";

function Form(config) {
  this.config = config;
}

Form.prototype.render = function (parent) {
  const form = document.createElement("form");
  form.id = this.config.id;
  form.classList.add("form");
  form.addEventListener("submit", this.config.submitHandler);
  for (const el of this.config.elements) {
    switch (el.type) {
      case "input": {
        const input = this.createInput(el);
        form.appendChild(input);
        break;
      }
      case "button": {
        const button = this.createButton(el);
        form.appendChild(button);
        break;
      }
      case "dropdown": {
        const dropdown = this.createDropdown(el);
        form.appendChild(dropdown);
        break;
      }
      case "radio": {
        const radio = this.createRadio(el);
        form.appendChild(radio);
        break;
      }
      default:
        break;
    }
  }

  parent.appendChild(form);
};

Form.prototype.createInput = function (el) {
  const container = document.createElement("div");
  container.classList.add("input-group");
  const input = document.createElement("input");
  input.id = el.id;
  input.type = el.inputType;
  input.placeholder = el.placeholder;
  input.required = el.required;
  input.name = el.name;
  const label = document.createElement("label");
  label.innerHTML = el.label;
  label.attributes.for = el.id;
  container.appendChild(label);
  container.appendChild(input);

  return container;
};

Form.prototype.createButton = function (el) {
  const container = document.createElement("div");
  container.classList.add("input-group");
  const button = document.createElement("button");
  button.id = el.id;
  button.innerHTML = el.text;
  container.appendChild(button);

  return container;
};

Form.prototype.createDropdown = function (el) {
  const container = document.createElement("div");
  container.classList.add("input-group");
  const select = document.createElement("select");
  select.id = el.id;
  select.name = el.name;
  for (let o of el.options) {
    const option = document.createElement("option");
    option.value = o.value;
    option.innerHTML = o.label;
    select.appendChild(option);
  }

  const label = document.createElement("label");
  label.innerHTML = el.label;
  label.attributes.for = el.id;
  container.appendChild(label);
  container.appendChild(select);

  return container;
};

Form.prototype.createRadio = function (el) {
  const container = document.createElement("div");
  container.classList.add("input-group");
  const label = document.createElement("label");
  label.innerHTML = el.label;
  label.attributes.for = el.id;
  container.appendChild(label);

  const radioContainer = document.createElement("div");
  for (let o of el.options) {
    const input = document.createElement("input");
    input.id = o.id;
    input.type = "radio";
    input.value = o.value;
    input.name = el.name;
    const l = document.createElement("label");
    l.innerHTML = o.label;
    l.for = o.id;
    radioContainer.appendChild(input);
    radioContainer.appendChild(l);
  }
  container.appendChild(radioContainer);

  return container;
};

const init = function () {
  const parent = document.querySelector("#container");
  const form = new Form(config);
  form.render(parent);
};

init();
