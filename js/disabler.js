document.addEventListener('DOMContentLoaded', (event) => {
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        alert("Right-click is disabled on this page.");
    });
});

document.body.style.userSelect = 'none';
document.body.style.webkitUserSelect = 'none'; // Safari
document.body.style.mozUserSelect = 'none';    // Firefox
document.body.style.msUserSelect = 'none';     // Internet Explorer/Edge

// Prevent dragging of elements
document.body.style.webkitUserDrag = 'none'; // Safari

// Prevent copying
document.addEventListener('copy', function(e) {
    e.preventDefault();
    alert('Copying is not allowed on this webpage.');
});

// Prevent dragging
document.addEventListener('dragstart', function(e) {
    e.preventDefault();
});

// Optionally prevent context menu (right-click) if you want to add extra security
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});