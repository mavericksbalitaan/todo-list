/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/modules/task.js
class Task {
  constructor(description, completed = false, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

;// CONCATENATED MODULE: ./src/modules/status.js
class Status {
  constructor() {
    this.completed = false;
  }

  checked = (element) => {
    element.completed = true;
  }

  unchecked = (element) => {
    element.completed = false;
  }
}
;// CONCATENATED MODULE: ./src/modules/taskList.js



class TaskList {
  constructor() {
    this.listArray = [];
  }

  display() {
    const listContainer = document.querySelector('.listContainer');
    if (listContainer) {
      listContainer.innerHTML = '';
    }
    this.listArray.forEach((el) => {
      const li = [];
      const input = [];
      const p = [];
      const button = [];
      // Create List Element
      li[el.index] = document.createElement('li');
      li[el.index].setAttribute('id', el.index);
      li[el.index].contentEditable = true;

      // Create Input Element
      input[el.index] = document.createElement('input');
      input[el.index].setAttribute('type', 'checkbox');
      input[el.index].classList.add('checkbox');
      input[el.index].setAttribute('id', el.index);

      // Create P Element
      p[el.index] = document.createElement('p');
      p[el.index].textContent = el.description;
      p[el.index].setAttribute('id', el.index);

      // Create Button Element
      button[el.index] = document.createElement('button');
      button[el.index].setAttribute('id', el.index);
      button[el.index].innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';
      li[el.index].append(input[el.index], p[el.index], button[el.index]);
      listContainer.append(li[el.index]);

      // Edit P Element
      p[el.index].addEventListener('click', (e) => {
        e.target.nextSibling.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        e.target.nextSibling.style.cursor = 'pointer';

        // Remove List Element
        e.target.nextSibling.addEventListener('click', () => {
          li[el.index].remove();
          this.remove(el.index);
        });
      });

      li[el.index].addEventListener('mouseleave', (e) => {
        button[el.index].innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';
        this.update(e.target.id, e.target.innerText);
      });

      // Checkbox Element
      input[el.index].addEventListener('change', (e) => {
        const status = new Status();
        if (e.target.checked === true) {
          status.checked(this.listArray[el.index]);
        } else {
          status.unchecked(this.listArray[el.index]);
        }
        this.update(e.target.nextSibling.id, e.target.nextSibling.innerText);
      });

      // Update Checkbox
      if (this.listArray[el.index].completed === true) {
        input[el.index].setAttribute('checked', 'checked');
        li[el.index].classList.add('checked');
      } else if (this.listArray[el.index].completed === false) {
        input[el.index].removeAttribute('checked');
        li[el.index].classList.remove('checked');
      }
    });
  }

  add(description, completed, index) {
    const task = new Task(description, completed, index);
    this.listArray.push(task);
    localStorage.setItem('todo-list', JSON.stringify(this.listArray));
  }

  remove(num) {
    const key = num;
    if (this.listArray.length === 1) {
      this.listArray = [];
    } else {
      this.listArray.splice(key, 1);
    }
    this.listArray.forEach((el, index) => {
      el.index = index;
    });
    localStorage.setItem('todo-list', JSON.stringify(this.listArray));
    this.display();
  }

  update(num, description) {
    if (this.listArray[num].index === Number(num)) {
      this.listArray[num].description = description;
    }
    this.listArray.forEach((el, index) => {
      el.index = index;
    });
    localStorage.setItem('todo-list', JSON.stringify(this.listArray));
    this.display();
  }

  clearAll() {
    this.listArray = [];
    localStorage.clear();
    window.location.reload();
  }

  clearAllCompleted = () => {
    this.listArray = this.listArray.filter((element) => element.completed === false);
    this.listArray.forEach((el, index) => {
      el.index = index;
    });
    localStorage.setItem('todo-list', JSON.stringify(this.listArray));
    window.location.reload();
  };
}

;// CONCATENATED MODULE: ./src/index.js



const { body } = document;
// Container Section
const conSec = document.createElement('section');
conSec.classList.add('section');

// Top Section
const topSec = document.createElement('div');
topSec.classList.add('topSec');
const title = document.createElement('h1');
title.textContent = 'Today\'s To Do';
const reloadBtn = document.createElement('button');
reloadBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i>';

// Window Reload
reloadBtn.addEventListener('click', () => {
  const taskList = new TaskList();
  taskList.clearAll();
});

// Bottom Section
const botSec = document.createElement('div');
botSec.classList.add('botSec');
const title2 = document.createElement('h2');
title2.textContent = 'Clear all completed';

// Clear All Event
title2.addEventListener('click', () => {
  const taskList = new TaskList();
  taskList.clearAllCompleted();
});

// Input Section
const inputSec = document.createElement('div');
inputSec.classList.add('inputSec');
const input = document.createElement('input');
input.placeholder = 'Add to your list...';
const addBtn = document.createElement('button');
addBtn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i>';

// List Container
const listContainer = document.createElement('ul');
listContainer.classList.add('listContainer');

// Append Elements
topSec.append(title, reloadBtn);
inputSec.append(input, addBtn);
botSec.append(title2);
conSec.append(topSec, inputSec, listContainer, botSec);
body.append(conSec);

let index = 0;
const completed = false;
const taskList = new TaskList();
// Add Button Event
addBtn.addEventListener('click', () => {
  if (!input.value.trim()) {
    addBtn.setCustomValidity('Please fill in the task to add in the list.');
    addBtn.reportValidity();
  } else {
    taskList.add(input.value, completed, index);
    taskList.display();
    input.value = '';
    index += 1;
  }
});

// Keyboard Support
window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addBtn.click();
  }
});

// On Page Load
window.onload = () => {
  taskList.display();
};

/******/ })()
;