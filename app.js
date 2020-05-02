// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions

function generateRamdomId() {
  return Math.random().toString(20).slice(2);
}

// Add todo
function addTodo(e) {
  // Prevent form from submitting
  e.preventDefault();
  const inputValue = todoInput.value;
  const ramdomId = generateRamdomId();

  if (inputValue === "") return;

  // Create Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create li
  const newList = document.createElement("li");
  newList.innerText = inputValue;
  newList.classList.add("todo-item");
  todoDiv.appendChild(newList);

  // Create span with display: none for id
  const id = document.createElement("span");
  id.innerText = ramdomId;
  id.style.display = "none";
  todoDiv.appendChild(id);

  // Add Todo to localStorage
  saveLocalTodos(ramdomId, inputValue);

  // Create a mark btn
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // Create a trash btn
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // Append todoDiv to todoList
  todoList.appendChild(todoDiv);

  // Clear todoInput value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  // Delete Todo
  if (item.classList[0] === "trash-btn") {
    const parent = item.parentElement;

    // Animation
    parent.classList.add("fall");
    removeLocalTodo(parent);

    // Will wait till the transition end then remove the parent
    parent.addEventListener("transitionend", function () {
      parent.remove();
    });
  }

  // Check Mark
  if (item.classList[0] === "complete-btn") {
    const parent = item.parentElement;
    parent.classList.toggle("completed");

    let id = parent.children[1].innerText;
    let value = parent.children[0].innerText;

    // Check if parent has a classname of completed
    if (parent.classList.contains("completed")) {
      saveCompletedTodos(id);
    } else if (!parent.classList.contains("completed")) {
      removeCompletedFromLocal(id);
    }
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;

  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// Check if local storage has a todos
function checkLocalTodos() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    // if there is todos parse it to become an array
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

// Save todo to localStorage
function saveLocalTodos(id, value) {
  let todos = checkLocalTodos();
  const obj = {
    id,
    value,
    completed: false,
  };
  // Push obj to todos[]
  todos.push(obj);
  // Set it back to localStorage
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Get todos
function getTodos() {
  let todos = checkLocalTodos();

  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    if (todo.completed) {
      todoDiv.classList.add("completed");
    }

    // Create li
    const newList = document.createElement("li");
    newList.innerText = todo.value;
    newList.classList.add("todo-item");
    todoDiv.appendChild(newList);

    const id = document.createElement("span");
    id.innerText = todo.id;
    id.style.display = "none";
    todoDiv.appendChild(id);

    // Add Todo to localStorage
    // Create a mark btn
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Create a trash btn
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append todoDiv to todoList
    todoList.appendChild(todoDiv);
  });
}

// Remove todos in local
function removeLocalTodo(todo) {
  let todos = checkLocalTodos();
  let newTodos = [];

  // Get the innerText of the todo's 2nd child -> span
  const id = todo.children[1].innerText;

  // Filtered out array not matched id
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id !== id) {
      newTodos.push(todos[i]);
    }
  }

  // Remove completed todos
  removeCompletedFromLocal(id);

  // Set it back
  localStorage.setItem("todos", JSON.stringify(newTodos));
}

// COMPLETED

// Save Completed todos in localStorage
function saveCompletedTodos(id) {
  let todos = checkLocalTodos();

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos[i].completed = true;
    }
  }

  localStorage.setItem("todos", JSON.stringify(todos));
}

// Remove completed todo
function removeCompletedFromLocal(id) {
  let todos = checkLocalTodos();

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos[i].completed = false;
    }
  }

  localStorage.setItem("todos", JSON.stringify(todos));
}
