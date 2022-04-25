import Task from './task.js';

export default class TaskList {
  constructor() {
    this.listArray = JSON.parse(localStorage.getItem('todo-list')) || [];
  }

  display() {
    const listContainer = document.querySelector('.listContainer');
    listContainer.innerHTML = '';
    this.listArray.forEach((el) => {
      const li = [];
      const input = [];
      const button = [];
      li[el.index] = document.createElement('li');
      li[el.index].setAttribute('id', el.index);
      li[el.index].contentEditable = true;

      // Edit List Events
      li[el.index].addEventListener('change', () => {
        li[el.index].contentEditable = true;
        button[el.index].innerHTML = '<i class="fa-solid fa-trash-can"></i>';
      });

      // Edit Element
      li[el.index].addEventListener('click', () => {
        li[el.index].contentEditable = true;
        li[el.index].classList.add('edit');
        button[el.index].innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        button[el.index].style.cursor = 'pointer';

        // Remove Element
        button[el.index].addEventListener('click', () => {
          li[el.index].remove();
          this.remove(el.index);
        });
      });

      li[el.index].addEventListener('mouseleave', (e) => {
        li[el.index].contentEditable = false;
        button[el.index].innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';
        this.update(e.target.id, e.target.innerText);
      });

      input[el.index] = document.createElement('input');
      input[el.index].setAttribute('type', 'checkbox');
      input[el.index].classList.add('checkbox');

      const p = document.createElement('p');
      p.textContent = el.description;
      button[el.index] = document.createElement('button');
      button[el.index].setAttribute('id', el.index);
      button[el.index].innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';
      li[el.index].append(input[el.index], p, button[el.index]);
      listContainer.append(li[el.index]);
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
      localStorage.clear();
    } else {
      this.listArray.splice(key, 1);
    }
    this.listArray.forEach((el, index) => {
      el.index = index;
    });
    localStorage.clear();
    localStorage.setItem('todo-list', JSON.stringify(this.listArray));
    this.display();
  }

  update(num, description) {
    if (this.listArray[num].index === num) {
      this.listArray[num].description = description;
    }
    this.listArray.forEach((el, index) => {
      el.index = index;
    });
    localStorage.clear();
    localStorage.setItem('todo-list', JSON.stringify(this.listArray));
    this.display();
  }
}
