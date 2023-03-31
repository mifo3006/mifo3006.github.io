const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
let tasks = [];

// Checks if there are any saved tasks in Local Storage.
if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  renderTasks();
}

// Funksjon for å loade tasksene på siden.
function renderTasks() {
  // Tømmer den gjeldene tasklisten.
  taskList.innerHTML = '';
  // Loader hver oppgave i tasksarrayet.
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const li = document.createElement('li');
    li.innerText = task.name;
    if (task.completed) {
      li.classList.add('completed');
    }
    const actions = document.createElement('div');
    actions.classList.add('actions');
    const completeButton = document.createElement('button');
    completeButton.innerText = 'Complete';
    completeButton.classList.add('complete-btn');
    completeButton.addEventListener('click', () => {
      completeTask(i);
    });
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteTask(i);
    });
    actions.appendChild(completeButton);
    actions.appendChild(deleteButton);
    li.appendChild(actions);
    taskList.appendChild(li);
  }
}

// Funksjon for å legge til ny oppgave.
function addTask(name) {
  tasks.push({ name: name, completed: false });
  renderTasks();
  saveTasks();
}

// Funksjon for å gjøre ferdig en task.
function completeTask(index) {
  tasks[index].completed = true;
  renderTasks();
  saveTasks();
}

// Funksjon for å slette en task.
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
  saveTasks();
}

// Funksjon for å lagre tasks i local storage.
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for å submitte tasks kjema.
taskForm.addEventListener('submit', event => {
  event.preventDefault();
  const taskName = taskInput.value.trim();
  if (taskName !== '') {
    addTask(taskName);
    taskInput.value = '';
  }
});

// Legger til border på input fieldet.
taskInput.classList.add('border');

