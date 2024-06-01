document.getElementById('name').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        var name = document.getElementById('name').value;
        if (name === '') {
            alert('Please enter your name!');
        } else {
            localStorage.setItem('userName', name);
            document.getElementById('a-btn').click();
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('name');
    const agreeButton = document.getElementById('a-btn');

    // Disable the link initially
    agreeButton.classList.add('disabled');
    agreeButton.style.pointerEvents = 'none';

    nameInput.addEventListener('input', function() {
        if (nameInput.value.trim() !== '') {
            agreeButton.classList.remove('disabled');
            agreeButton.style.pointerEvents = 'auto';
        } else {
            agreeButton.classList.add('disabled');
            agreeButton.style.pointerEvents = 'none';
        }
    });
});
