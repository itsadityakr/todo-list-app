// Selectors
const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');
const lightTheme = document.querySelector('.light-theme');
const darkerTheme = document.querySelector('.darker-theme');

// Array for todos
let todosList = [];

// Event Listeners
toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', deleteCheck);
document.addEventListener("DOMContentLoaded", getTodos);
lightTheme.addEventListener('click', () => changeTheme('light'));
darkerTheme.addEventListener('click', () => changeTheme('darker'));

// Check if one theme has been set previously and apply it (or light theme if not found):
let savedTheme = localStorage.getItem('savedTheme');
savedTheme === null ? changeTheme('light') : changeTheme(localStorage.getItem('savedTheme'));

// Functions
function addToDo(event) {
    event.preventDefault();

    const todoText = toDoInput.value;
    if (todoText === '') {
        alert("You must write something!");
    } else {
        // Get current date and time
        const timestamp = new Date().toLocaleString();

        // Add todo to array with completed status set to false along with timestamp
        todosList.push({ text: todoText, completed: false, timestamp: timestamp });

        // Adding to local storage
        savelocal();

        // Render todos
        renderTodos();

        // Clear the input field after adding a task
        toDoInput.value = '';
    }
}

function deleteCheck(event) {
    const item = event.target;

    if (item.classList[0] === 'delete-btn') {
        const todoIndex = item.parentElement.getAttribute('data-index');
        todosList.splice(todoIndex, 1);

        // Removing local todos
        removeLocalTodos();

        renderTodos();
    }

    if (item.classList[0] === 'check-btn') {
        const todoIndex = item.parentElement.getAttribute('data-index');
        todosList[todoIndex].completed = !todosList[todoIndex].completed;

        // Update completed status in local storage
        savelocal();

        renderTodos();
    }
}

function renderTodos() {
    // Clear existing todos
    toDoList.innerHTML = '';

    // Render todos from array
    todosList.forEach((todo, index) => {
        const toDoDiv = createToDoElement(todo, index);

        // Check if the todo is completed and apply the appropriate class
        if (todo.completed) {
            toDoDiv.classList.add("completed");
        }

        toDoList.appendChild(toDoDiv);
    });
}

function createToDoElement(todoObject, index) {
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo", `${savedTheme}-todo`);
    toDoDiv.setAttribute('data-index', index);

    const newToDo = document.createElement('li');
    newToDo.innerText = `${todoObject.text}`; // Displaying todo text
    newToDo.classList.add('todo-item');
    toDoDiv.appendChild(newToDo);

    const timestampPara = document.createElement('p');
    const timestamp = new Date(todoObject.timestamp); // Convert timestamp string to Date object
    const options = { day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTimestamp = timestamp.toLocaleDateString('en-US', options);
    timestampPara.innerText = `Added: ${formattedTimestamp}`; // Displaying formatted timestamp
    timestampPara.classList.add('todo-timestamp');
    timestampPara.style.fontSize = '16px'; // Set font size to 30px
    toDoDiv.appendChild(timestampPara);

    const checked = document.createElement('button');
    checked.innerHTML = '<i class="fas fa-check"></i>';
    checked.classList.add('check-btn', `${savedTheme}-button`);
    toDoDiv.appendChild(checked);

    const deleted = document.createElement('button');
    deleted.innerHTML = '<i class="fas fa-trash"></i>';
    deleted.classList.add('delete-btn', `${savedTheme}-button`);
    toDoDiv.appendChild(deleted);

    return toDoDiv;
}

function savelocal() {
    localStorage.setItem('todos', JSON.stringify(todosList));
}

function getTodos() {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Load todos from local storage
    todosList = todos;

    // Render todos
    renderTodos();
}

function removeLocalTodos() {
    localStorage.setItem('todos', JSON.stringify(todosList));
}

function changeTheme(color) {
    localStorage.setItem('savedTheme', color);
    savedTheme = localStorage.getItem('savedTheme');

    document.body.className = color;

    // Change blinking cursor for darker theme
    if (color === 'darker') {
        document.getElementById('title').classList.add('darker-title');
    } else {
        document.getElementById('title').classList.remove('darker-title');
    }

    document.querySelector('input').className = `${color}-input`;

    // Change todo color without changing their status (completed or not)
    document.querySelectorAll('.todo').forEach(todo => {
        Array.from(todo.classList).some(item => item === 'completed') ?
            todo.className = `todo ${color}-todo completed` :
            todo.className = `todo ${color}-todo`;
    });

    // Change buttons color according to their type (todo, check or delete)
    document.querySelectorAll('button').forEach(button => {
        Array.from(button.classList).some(item => {
            if (item === 'check-btn') {
                button.className = `check-btn ${color}-button`;
            } else if (item === 'delete-btn') {
                button.className = `delete-btn ${color}-button`;
            } else if (item === 'todo-btn') {
                button.className = `todo-btn ${color}-button`;
            }
        });
    });
    document.getElementById("clrBtn").onclick = function() {
        window.location.href = '../pages/rating.html';
    };
}
document.getElementById("backBtn").onclick = function() {
    window.location.href = '../pages/selection.html';
};