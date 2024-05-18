const micBtn = document.querySelector('.mic-btn');
let recognition;
let isListening = false;

micBtn.addEventListener('click', toggleSpeechRecognition);

function toggleSpeechRecognition() {
    if (isListening) {
        stopSpeechRecognition(); // Stop speech recognition when button is clicked
    } else {
        startSpeechRecognition();
    }
    isListening = !isListening;

    // Toggle the active class to change button color
    micBtn.classList.toggle('active', isListening);
}

function stopSpeechRecognition() {
    if (recognition) {
        recognition.stop(); // Stop speech recognition
    }
}

function startSpeechRecognition() {
    if (recognition) {
        recognition.stop(); // Stop previous instance if any
    }

    recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false; // Set continuous to false to process only one result
    recognition.interimResults = false;

    recognition.onresult = function(event) {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();

        if (transcript.includes('sunlight remove recent task')) {
            removeMostRecentToDo();
        } else if (transcript.startsWith('sunlight create a new task')) {
            const taskText = transcript.replace('sunlight create a new task', '').trim();
            if (taskText) {
                toDoInput.value = taskText;
                setTimeout(() => {
                    addToDoFromSpeech(taskText);
                }, 3000);
            }
            else {
                alert("You must specify a task after Command: 'sunlight create new task'!");
            }
        } else if (transcript.includes('hey sunlight turn off the mic')) {
            stopSpeechRecognition(); // Stop speech recognition when user says "turn off the mic"
            toggleSpeechRecognition(); // Toggle the button to visually indicate that the mic is off
        }

        // Restart recognition after processing the result
        restartRecognition();
    };

    recognition.onend = function() {
        if (isListening) {
            restartRecognition(); // Automatically restart recognition when it ends
        }
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
        if (isListening) {
            restartRecognition(); // Restart recognition on error
        }
    };

    recognition.start(); // Initial start of recognition
}

function restartRecognition() {
    recognition.stop();
    recognition.start();
}

function addToDoFromSpeech(todoText) {
    const timestamp = new Date().toLocaleString();
    todosList.push({ text: todoText, completed: false, timestamp: timestamp });
    savelocal();
    renderTodos();
    toDoInput.value = ''; // Clear the input after adding the task
}

function removeMostRecentToDo() {
    if (todosList.length === 0) {
        alert("There are no tasks to remove!");
    } else {
        todosList.pop();
        savelocal();
        renderTodos();
    }
}
