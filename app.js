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
function addTodo(e) {
  // Prevent form from submitting
  e.preventDefault();
  const inputValue = todoInput.value;

  if (inputValue === "") return;

  // Create Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create li
  const newList = document.createElement("li");
  newList.innerText = inputValue;
  newList.classList.add("todo-item");
  todoDiv.appendChild(newList);

  // Add Todo to localStorage
  saveLocalTodos(inputValue);

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
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  console.log(todos);
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

function checkLocalTodos() {
  let todos;
  // Check if local storage has a todos
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    // if there is to todos parse it to become an array
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function saveLocalTodos(todo) {
  let todos = checkLocalTodos();
  // Push todo to todos[]
  todos.push(todo);
  // Set it back to localStorage
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Get todos
function getTodos() {
  let todos = checkLocalTodos();

  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create li
    const newList = document.createElement("li");
    newList.innerText = todo;
    newList.classList.add("todo-item");
    todoDiv.appendChild(newList);

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

function removeLocalTodo(todo) {
  let todos = checkLocalTodos();

  // Get the innerText of the todo's 1st child
  // Then get the index of the matched todo from todos
  const todoText = todo.children[0].innerText;
  const todoIndex = todos.indexOf(todoText);

  // Remove the todo
  todos.splice(todoIndex, 1);
  // Set it back
  localStorage.setItem("todos", JSON.stringify(todos));
}
