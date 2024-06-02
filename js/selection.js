const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// Check if there's a saved state in localStorage
const savedState = localStorage.getItem('pageState');

// If there's a saved state, apply it
if (savedState === 'register') {
    container.classList.add("active");
} else if (savedState === 'login') {
    container.classList.remove("active");
}

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
    // Save the state to localStorage
    localStorage.setItem('pageState', 'register');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
    // Save the state to localStorage
    localStorage.setItem('pageState', 'login');
});


document.getElementById("clndr-btn").addEventListener("click", function() {
    window.location.href = "../pages/calender.html";
});

document.getElementById("aam-btn").addEventListener("click", function() {
    window.location.href = "../pages/todo-list.html";
});