// src/storage.js
let n = 1
function saveToLocalStorage(n, data) {
  localStorage.setItem(n, JSON.stringify(data));
}

function loadFromLocalStorage(n) {
  const data = localStorage.getItem(1);
  return data ? JSON.parse(data) : null;
}

export { saveToLocalStorage, loadFromLocalStorage };
