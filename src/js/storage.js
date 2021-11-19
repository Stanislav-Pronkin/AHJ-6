import { addTask } from './action';

export function saveList() {
  const toDoList = document.querySelectorAll('#todo .item-task');
  const inProgressList = document.querySelectorAll('#in-progress .item-task');
  const doneList = document.querySelectorAll('#done .item-tasks .item-task');
  const tasksCollection = {
    todo: [],
    inprogress: [],
    done: [],
  };
  for (const item of toDoList) {
    tasksCollection.todo.push(item.textContent.replace(' ✖', ''));
  }

  for (const item of inProgressList) {
    tasksCollection.inprogress.push(item.textContent.replace(' ✖', ''));
  }

  for (const item of doneList) {
    tasksCollection.done.push(item.textContent.replace(' ✖', ''));
  }

  localStorage.setItem('tasks', JSON.stringify(tasksCollection));
}

export function loadList(toDo, inProgress, done) {
  const localStorageData = JSON.parse(localStorage.getItem('tasks'));
  if (localStorageData) {
    for (let i = 0; i < localStorageData.todo.length; i += 1) {
      addTask(toDo, localStorageData.todo[i]);
    }
    for (let i = 0; i < localStorageData.inprogress.length; i += 1) {
      addTask(inProgress, localStorageData.inprogress[i]);
    }
    for (let i = 0; i < localStorageData.done.length; i += 1) {
      addTask(done, localStorageData.done[i]);
    }
  }
}
