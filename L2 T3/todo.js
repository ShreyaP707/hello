const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const pendingTasksList = document.getElementById('pendingTasks');
const completedTasksList = document.getElementById('completedTasks');

let tasks = [];

addTaskButton.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        dateAdded: new Date().toLocaleString(),
    };

    tasks.push(task);
    taskInput.value = '';
    renderTasks();
}

function renderTasks() {
    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = `${task.text} (Added: ${task.dateAdded})`;

        if (task.completed) {
            taskItem.classList.add('completed');
            taskItem.innerHTML += `
                <button class="delete-button" onclick="deleteTask(${task.id})">Delete</button>
            `;
            completedTasksList.appendChild(taskItem);
        } else {
            taskItem.innerHTML += `
                <button class="edit-button" onclick="editTask(${task.id})">Edit</button>
                <button class="delete-button" onclick="deleteTask(${task.id})">Delete</button>
                <button class="complete-button" onclick="completeTask(${task.id})">Complete</button>
            `;
            pendingTasksList.appendChild(taskItem);
        }
    });
}

function completeTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = true;
        renderTasks();
    }
}

function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        const newText = prompt("Edit your task:", task.text);
        if (newText !== null && newText.trim() !== '') {
            task.text = newText.trim();
            renderTasks();
        }
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    renderTasks();
}