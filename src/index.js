// src/index.js

import createProject from './project';
import createTodo from './todo';
import { saveToLocalStorage, loadFromLocalStorage } from './storage';
import './style.css';

const pContainer = document.getElementById("project-list");
const proj = document.getElementById("projects");
const tContainer = document.getElementById("todo-list");
const tod = document.getElementById("todos");
const addTodoButton = document.getElementById("add-todo");

// Check if the elements exist
if (!pContainer || !proj || !tContainer || !tod || !addTodoButton) {
    console.error("One or more required DOM elements are missing");
    
}
console.log(pContainer, proj, tContainer, tod, addTodoButton);

const defaultP = createProject("Index")

const savedProject = loadFromLocalStorage(1);
if ( savedProject){
    defaultP.todos = savedProject.todos ;
}

function renderProjects() {
    pContainer.innerHTML = '';  // Clear current list
    const projectItem = document.createElement("li");
    projectItem.textContent = defaultP.name;
    projectItem.addEventListener("click", () => renderTodos(defaultP));
    pContainer.appendChild(projectItem);
}

function renderTodos(project) {
    tContainer.innerHTML = '';  // Clear current list
    project.getTodos().forEach((todo, index) => {
        const todoItem = document.createElement("li");
        todoItem.textContent = `${todo.title} - Due: ${todo.dueDate}`;
        todoItem.addEventListener("click", () => showTodoDetails(todo, index));
        tContainer.appendChild(todoItem);
    });
}



function showTodoDetails(todo, index) {
    alert(`Title: ${todo.title}\nDescription: ${todo.description}\nPriority: ${todo.priority}`);
}

document.addEventListener('DOMContentLoaded', () => {
    // Your code here


document.getElementById("add-todo").addEventListener("click", () => {
    const tname = String(prompt("enter task name "))
    const tdes= String(prompt("enter task description "))

    const tdate = new Date(prompt("Enter task due date (yyyy-mm-dd)"));
if (isNaN(tdate.getTime())) {
    alert("Invalid date. Please enter a valid date.");
    return;
}

    const tpri = String(prompt("enter task priority "))

    const newTodo = createTodo(tname, tdes, tdate, tpri);
    defaultP.addTodo(newTodo);
    saveToLocalStorage(1, defaultP);
    renderTodos(defaultP);
});

});
renderProjects();
renderTodos(defaultP);
