// src/todo.js

function createTodo(title, description, dueDate, priority, notes = '', checklist = []) {
  return {
      title,
      description,
      dueDate,
      priority,
      notes,
      checklist,
      isComplete: false,
      toggleComplete() {
          this.isComplete = !this.isComplete;
      },
      update(details) {
          Object.assign(this, details);
      }
  };
}

export default createTodo;
