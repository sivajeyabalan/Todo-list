// src/project.js

import createTodo from './todo';

function createProject(name) {
    const todos = [];

    return {
        name,
        todos,
        addTodo(todo) {
            todos.push(todo);
        },
        removeTodo(index) {
            todos.splice(index, 1);
        },
        getTodos() {
            return todos;
        }
    };
}

export default createProject;
