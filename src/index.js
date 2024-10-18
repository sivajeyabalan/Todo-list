// src/index.js

import createProject from './project';
import createTodo from './todo';
import { saveToLocalStorage, loadFromLocalStorage } from './storage';
import './style.css';

const defaultProject = createProject("Inbox");
const projectsContainer = document.getElementById("projects");
const todosContainer = document.getElementById("todos");

// Load saved project data
const savedProject = loadFromLocalStorage("project");
if (savedProject) {
    defaultProject.todos = savedProject.todos;
}

function renderProjects() {
    projectsContainer.innerHTML = '';  // Clear current list
    const projectItem = document.createElement("li");
    projectItem.textContent = defaultProject.name;
    projectItem.addEventListener("click", () => renderTodos(defaultProject));
    projectsContainer.appendChild(projectItem);
}

function renderTodos(project) {
    todosContainer.innerHTML = '';  // Clear current list
    project.getTodos().forEach((todo, index) => {
        const todoItem = document.createElement("li");
        todoItem.textContent = `${todo.title} - Due: ${todo.dueDate}`;
        todoItem.addEventListener("click", () => showTodoDetails(todo, index));
        todosContainer.appendChild(todoItem);
    });
}

function showTodoDetails(todo, index) {
    alert(`Title: ${todo.title}\nDescription: ${todo.description}\nPriority: ${todo.priority}`);
}

// Add event listeners for buttons
document.getElementById("add-todo").addEventListener("click", () => {
    const newTodo = createTodo("New Task", "Description", "2024-10-25", "Low");
    defaultProject.addTodo(newTodo);
    saveToLocalStorage("project", defaultProject);
    renderTodos(defaultProject);
});

renderProjects();
renderTodos(defaultProject);
