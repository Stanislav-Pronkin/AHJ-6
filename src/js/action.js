export function closeInput(inputField, addButton) {
  inputField.classList.add('hidden');
  addButton.classList.remove('hidden');
}

export function addTask(destination, text) {
  const task = document.createElement('div');

  task.innerHTML = `${text} <div class="delete button hidden">&#x2716;</div>`;
  task.className = 'item-task';
  destination.appendChild(task);
}

export function grabTask(event, draggedEl, ghostEl, elementPosTop, elementPosLeft) {
  const elementWidth = draggedEl.offsetWidth;
  const elementHeight = draggedEl.offsetHeight;
  const ghost = ghostEl;
  const dragged = draggedEl;

  ghost.classList.add('ghost');
  ghost.style.backgroundColor = '#dee2e5';
  ghost.innerHTML = '';
  ghost.style.width = `${elementWidth}px`;
  ghost.style.height = `${elementHeight}px`;
  event.target.parentNode.insertBefore(ghostEl, event.target.nextElementSibling);
  dragged.classList.add('dragged');
  dragged.style.width = `${elementWidth}px`;
  dragged.style.height = `${elementHeight}px`;
  dragged.style.left = `${event.pageX - elementPosLeft}px`;
  dragged.style.top = `${event.pageY - elementPosTop}px`;
}

export function confirmAddTask(element) {
  const input = element.closest('.input-task').querySelector('.text-task');

  if (input.value) {
    const destination = element.closest('.tasks').querySelector('.item-tasks');

    addTask(destination, input.value);
    input.value = '';
  }
}

export function moveTask(event, draggedEl, ghostEl, elementPosLeft, elementPosTop) {
  if (!draggedEl) {
    return;
  }

  const dragged = draggedEl;
  const dropPoint = document.elementFromPoint(event.clientX, event.clientY);
  const { top } = dropPoint.getBoundingClientRect();

  dragged.style.left = `${event.pageX - elementPosLeft}px`;
  dragged.style.top = `${event.pageY - elementPosTop}px`;
  if (dropPoint.classList.contains('tasks')) {
    const addPoint = dropPoint.querySelector('.item-tasks');

    addPoint.appendChild(ghostEl);
  }

  if (dropPoint.classList.contains('item-task')) {
    if (event.pageY > window.scrollY + top + dropPoint.offsetHeight / 2) {
      dropPoint.closest('.item-tasks').insertBefore(ghostEl, dropPoint.nextElementSibling);
    } else {
      dropPoint.closest('.item-tasks').insertBefore(ghostEl, dropPoint);
    }
  }
}

export function dropTask(draggedEl, ghostEl) {
  if (!draggedEl) {
    return;
  }
  const replaced = ghostEl.parentNode;
  const dragged = draggedEl;

  dragged.classList.remove('dragged');
  dragged.style = '';
  replaced.replaceChild(draggedEl, ghostEl);
}
