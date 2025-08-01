document.addEventListener("DOMContentLoaded", loadTasks);

function add() {
  const input = document.getElementById("taskInput");
  let text = input.value.trim();

  if (text === "") return;

  let tasks = getTasksFromStorage();
  tasks.push(text);
  saveTasksToStorage(tasks);

  addTaskToDOM(text);
  input.value = "";
}

function addTaskToDOM(text, index = null) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.onclick = function () {
    let updated = prompt("Edit your task:", span.textContent);
    if (updated !== null && updated.trim() !== "") {
      span.textContent = updated.trim();
      updateTaskInStorage(span.textContent, li);
    }
  };

  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.onclick = function () {
    li.remove();
    deleteTaskFromStorage(span.textContent);
  };

  const btns = document.createElement("div");
  btns.className = "btn-group";
  btns.appendChild(editBtn);
  btns.appendChild(delBtn);

  li.appendChild(span);
  li.appendChild(btns);

  document.getElementById("taskList").appendChild(li);
}

function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasksToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = getTasksFromStorage();
  tasks.forEach(task => addTaskToDOM(task));
}

function updateTaskInStorage(updatedText, liElement) {
  const oldText = liElement.querySelector("span").textContent;
  let tasks = getTasksFromStorage();
  let index = tasks.indexOf(oldText);
  if (index !== -1) {
    tasks[index] = updatedText;
    saveTasksToStorage(tasks);
  }
}

function deleteTaskFromStorage(taskText) {
  let tasks = getTasksFromStorage();
  tasks = tasks.filter(t => t !== taskText);
  saveTasksToStorage(tasks);
}

