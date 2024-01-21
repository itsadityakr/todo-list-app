// Linked List Node
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// Linked List
class LinkedList {
    constructor() {
        this.head = null;
    }

    // Add a node to the end of the linked list
    addNode(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    // Remove a node from the linked list
    removeNode(data) {
        if (!this.head) {
            return;
        }

        if (this.head.data === data) {
            this.head = this.head.next;
            return;
        }

        let current = this.head;
        let prev = null;

        while (current && current.data !== data) {
            prev = current;
            current = current.next;
        }

        if (!current) {
            return;
        }

        prev.next = current.next;
    }

    // Convert the linked list to an array
    toArray() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.data);
            current = current.next;
        }
        return result;
    }
}

// Selectors
const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');
const standardTheme = document.querySelector('.standard-theme');
const lightTheme = document.querySelector('.light-theme');
const darkerTheme = document.querySelector('.darker-theme');

// Linked list for todos
let todosList = new LinkedList();

// Event Listeners
toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', deleteCheck);
document.addEventListener("DOMContentLoaded", getTodos);
standardTheme.addEventListener('click', () => changeTheme('standard'));
lightTheme.addEventListener('click', () => changeTheme('light'));
darkerTheme.addEventListener('click', () => changeTheme('darker'));

// Check if one theme has been set previously and apply it (or std theme if not found):
let savedTheme = localStorage.getItem('savedTheme');
savedTheme === null ?
    changeTheme('standard')
    : changeTheme(localStorage.getItem('savedTheme'));

// Functions
function addToDo(event) {
    event.preventDefault();

    const todoText = toDoInput.value;
    if (todoText === '') {
        alert("You must write something!");
    } else {
        // Add todo to linked list with completed status set to false
        todosList.addNode({ text: todoText, completed: false });

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
        item.parentElement.classList.add("fall");

        // Removing local todos
        removeLocalTodos(item.parentElement);

        item.parentElement.addEventListener('transitionend', function () {
            item.parentElement.remove();
        });
    }

    if (item.classList[0] === 'check-btn') {
        item.parentElement.classList.toggle("completed");

        // Update completed status in linked list
        updateCompletedStatus(item.parentElement);
    }
}

function renderTodos() {
    // Clear existing todos
    toDoList.innerHTML = '';

    // Render todos from linked list
    todosList.toArray().forEach(todo => {
        const toDoDiv = createToDoElement(todo);

        // Check if the todo is completed and apply the appropriate class
        if (todo.completed) {
            toDoDiv.classList.add("completed");
        }

        toDoList.appendChild(toDoDiv);
    });
}

function createToDoElement(todoObject) {
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo", `${savedTheme}-todo`);

    const newToDo = document.createElement('li');
    newToDo.innerText = todoObject.text;
    newToDo.classList.add('todo-item');
    toDoDiv.appendChild(newToDo);

    const checked = document.createElement('button');
    checked.innerHTML = '<i class="fas fa-check"></i>';
    checked.classList.add('check-btn', `${savedTheme}-button`);
    toDoDiv.appendChild(checked);

    const deleted = document.createElement('button');
    deleted.innerHTML = '<i class="fas fa-trash"></i>';
    deleted.classList.add('delete-btn', `${savedTheme}-button`);
    toDoDiv.appendChild(deleted);

    // Add completed class if the todo is completed
    if (todoObject.completed) {
        toDoDiv.classList.add("completed");
    }

    return toDoDiv;
}

function savelocal() {
    let todos = todosList.toArray();
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Clear the linked list
    todosList = new LinkedList();

    // Add todos to linked list
    todos.forEach(todo => {
        todosList.addNode(todo);
    });

    // Render todos
    renderTodos();
}

function removeLocalTodos(todoElement) {
    let todos = todosList.toArray();
    const todoText = todoElement.children[0].innerText;
    const todoIndex = todos.findIndex(todo => todo.text === todoText);
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateCompletedStatus(todoElement) {
    let todos = todosList.toArray();
    const todoText = todoElement.children[0].innerText;
    const todoIndex = todos.findIndex(todo => todo.text === todoText);
    todos[todoIndex].completed = !todos[todoIndex].completed;
    localStorage.setItem('todos', JSON.stringify(todos));
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
}
