export const storageService = {
  saveToStorage,
  loadFromStorage
  
}

const DB_KEY = 'locsDB'

function saveToStorage(val) {
  localStorage.setItem(DB_KEY, JSON.stringify(val));
}

function loadFromStorage() {
  var val = localStorage.getItem(DB_KEY);
  return JSON.parse(val);
}