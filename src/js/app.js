import {
  closeInput, confirmAddTask, dropTask, grabTask, moveTask,
} from './action';
import { loadList, saveList } from './storage';

const container = document.getElementById('container');
const toDo = document.querySelector('#todo .item-tasks');
const inProgress = document.querySelector('#in-progress .item-tasks');
const done = document.querySelector('#done .item-tasks');
let inputField;
let addButton;
let draggedEl = null;
let ghostEl = null;
let elementPosTop;
let elementPosLeft;

container.addEventListener('mousedown', (event) => {
  const element = event.target;

  if (element.classList.contains('add-task')) {
    inputField = element.closest('.tasks').querySelector('.input-task');
    addButton = element.closest('.tasks').querySelector('.add-task');
    inputField.classList.remove('hidden');
    addButton.classList.add('hidden');
  } else if (element.classList.contains('confirm')) {
    confirmAddTask(element);
    closeInput(inputField, addButton);
  } else if (element.classList.contains('cancel')) {
    closeInput(inputField, addButton);
  } else if (element.classList.contains('delete')) {
    const deleteTask = element.parentNode;

    deleteTask.parentNode.removeChild(deleteTask);
  } else if (element.classList.contains('item-task')) {
    container.classList.add('haveGrab');
    draggedEl = event.target;
    ghostEl = event.target.cloneNode(true);
    const { top, left } = event.target.getBoundingClientRect();
    elementPosTop = event.pageY - top;
    elementPosLeft = event.pageX - left;

    grabTask(event, draggedEl, ghostEl, elementPosTop, elementPosLeft);
  }
});

container.addEventListener('mousemove', (event) => {
  event.preventDefault();
  const element = event.target;

  if (!container.classList.contains('haveGrab')) {
    if (element.classList.contains('button')) {
      element.style.cursor = 'pointer';
    } else if (element.classList.contains('item-task')) {
      element.style.cursor = 'grab';
    } else {
      element.style.cursor = 'default';
    }
  } else if (container.classList.contains('haveGrab')) {
    element.style.cursor = 'grabbing';
  }

  moveTask(event, draggedEl, ghostEl, elementPosLeft, elementPosTop);
});

container.addEventListener('mouseup', () => {
  container.classList.remove('haveGrab');
  dropTask(draggedEl, ghostEl);
  draggedEl = null;
  ghostEl = null;
  saveList();
});

container.addEventListener('mouseleave', () => {
  if (!draggedEl) {
    return;
  }
  ghostEl.parentNode.removeChild(ghostEl);
  draggedEl.classList.remove('dragged');
  draggedEl.style = '';
  draggedEl = null;
  ghostEl = null;
});

document.addEventListener('DOMContentLoaded', () => {
  loadList(toDo, inProgress, done);
});
