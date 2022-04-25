import './style.scss';

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

// Bottom Section
const botSec = document.createElement('div');
botSec.classList.add('botSec');
const title2 = document.createElement('h2');
title2.textContent = 'Clear all completed';

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

// Tasks Array
const listArray = [
  {
    description: 'Task 1',
    completed: 'false',
    index: '0',
  },
  {
    description: 'Task 2',
    completed: 'false',
    index: '1',
  },
  {
    description: 'Task 2',
    completed: 'false',
    index: '2',
  },
  {
    description: 'Task 3',
    completed: 'false',
    index: '3',
  },
  {
    description: 'Task 4',
    completed: 'false',
    index: '4',
  },
  {
    description: 'Task 5',
    completed: 'false',
    index: '5',
  },
  {
    description: 'Task 6',
    completed: 'false',
    index: '6',
  },
  {
    description: 'Task 7',
    completed: 'false',
    index: '7',
  },
  {
    description: 'Task 8',
    completed: 'false',
    index: '8',
  },
];

// Dynamically Created List of Tasks Function
const loopTask = () => {
  const listContainer = document.querySelector('.listContainer');
  const sorted = listArray.sort((a, b) => (a.index < b.index ? 1 : -1));
  sorted.forEach((el) => {
    const li = [];
    const input = [];
    const button = [];
    li[el.index] = document.createElement('li');
    li[el.index].setAttribute('id', el.index);
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
};

// On Page Load
window.onload = () => {
  listContainer.innerHTML = '';
  loopTask();
};