function Todo(todos, parent) {
  this.todos = todos;
  this.filteredTodos = todos;
  this.parent = parent;
  this.counter = 1;
  this.tab = "All";
}

Todo.prototype.init = function () {
  this.render();
  this.bindEventListeners();
};

Todo.prototype.render = function () {
  const todoContainer = document.createElement("div");
  todoContainer.id = "todo-container";
  todoContainer.classList.add("todo-container");

  const todoHead = document.createElement("div");
  todoHead.classList.add("todo-head");
  const input = document.createElement("input");
  input.id = "input";
  input.type = "text";
  const addBtn = document.createElement("button");
  addBtn.id = "add-btn";
  addBtn.innerHTML = "Add Todo";
  todoHead.appendChild(input);
  todoHead.appendChild(addBtn);

  const todoBody = document.createElement("div");
  todoBody.classList.add("todo-body");

  const remaining = document.createElement("div");
  remaining.id = "remaining";
  remaining.classList.add("remaining");
  remaining.classList.add("label");
  remaining.classList.add("row");
  remaining.innerHTML = `${this.getActiveCount()} items left`;

  const tabs = document.createElement("div");
  tabs.id = "tabs";
  tabs.classList.add("btn-container");
  tabs.classList.add("row");
  const allTab = document.createElement("div");
  allTab.id = "All";
  allTab.innerHTML = "All";
  allTab.classList.add("label");
  allTab.classList.add("btn");
  allTab.classList.add("selected");
  const activeTab = document.createElement("div");
  activeTab.id = "Active";
  activeTab.innerHTML = "Active";
  activeTab.classList.add("label");
  activeTab.classList.add("btn");
  const completedTab = document.createElement("div");
  completedTab.id = "Completed";
  completedTab.innerHTML = "Completed";
  completedTab.classList.add("label");
  completedTab.classList.add("btn");
  tabs.appendChild(allTab);
  tabs.appendChild(activeTab);
  tabs.appendChild(completedTab);

  const list = document.createElement("div");
  list.classList.add("list");
  const ul = document.createElement("ul");
  ul.id = "todo-list";
  list.appendChild(ul);

  todoBody.appendChild(remaining);
  todoBody.appendChild(tabs);
  todoBody.appendChild(list);

  todoContainer.appendChild(todoHead);
  todoContainer.appendChild(todoBody);

  this.parent.appendChild(todoContainer);
};

Todo.prototype.bindEventListeners = function () {
  const addTodoBtn = document.querySelector("#add-btn");
  addTodoBtn.addEventListener("click", this.addTodo.bind(this));

  const list = document.querySelector("#todo-list");
  list.addEventListener("click", this.clickHandler.bind(this));

  const tabs = document.querySelector("#tabs");
  tabs.addEventListener("click", this.changeTab.bind(this));
};

Todo.prototype.changeTab = function (e) {
  const id = e.target.id;
  if (!id) return;

  const currTab = document.querySelector(`#${this.tab}`);
  currTab.classList.remove("selected");

  const tab = document.querySelector(`#${id}`);
  tab.classList.add("selected");
  this.tab = id;

  this.filterTodos();
  this.updateView();
};

Todo.prototype.filterTodos = function () {
  if (this.tab === "All") {
    this.filteredTodos = this.todos;
  } else if (this.tab === "Active") {
    this.filteredTodos = this.todos.filter((todo) => todo.completed === false);
  } else if (this.tab === "Completed") {
    this.filteredTodos = this.todos.filter((todo) => todo.completed === true);
  }
};

Todo.prototype.clickHandler = function (e) {
  const id = e.target.dataset.id;
  if (!id) return;

  if (e.target.tagName === "INPUT") {
    this.toggleTodo(+e.target.dataset.id, e.target.checked);
  }

  if (e.target.tagName === "SPAN") {
    this.deleteTodo(+id);
  }
};

Todo.prototype.updateView = function () {
  remaining.innerHTML = `${this.getActiveCount()} items left`;

  const list = document.querySelector("#todo-list");
  list.innerHTML = "";
  for (const todo of this.filteredTodos) {
    const li = document.createElement("li");
    li.classList.add("row");
    const chkbox = document.createElement("input");
    chkbox.type = "checkbox";
    chkbox.checked = todo.completed;
    chkbox.dataset.id = todo.id;
    const text = document.createElement("span");
    text.classList.add("todo-text");
    text.innerHTML = todo.text;
    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("delete");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.dataset.id = todo.id;
    li.appendChild(chkbox);
    li.appendChild(text);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  }
};

Todo.prototype.addTodo = function () {
  const input = document.querySelector("#input");
  this.todos.push({ id: this.counter++, text: input.value, completed: false });
  input.value = "";
  this.filterTodos();
  this.updateView();
};

Todo.prototype.toggleTodo = function (id, checked) {
  const todo = this.todos.find((todo) => todo.id === id);
  todo.completed = !todo.completed;
  const remaining = document.querySelector("#remaining");
  remaining.innerHTML = `${this.getActiveCount()} items left`;
};

Todo.prototype.deleteTodo = function (id) {
  this.todos = this.todos.filter((todo) => todo.id !== id);
  this.filteredTodos = this.todos;
  this.filterTodos();
  this.updateView();
};

Todo.prototype.getActiveCount = function () {
  return this.todos.filter((todo) => todo.completed === false).length;
};

const init = function () {
  const container = document.querySelector("#container");
  const todo = new Todo([], container);
  todo.init();
};

init();
