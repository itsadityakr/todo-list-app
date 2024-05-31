const micBtn = document.querySelector('.mic-btn');
let recognition;
let isListening = false;

micBtn.addEventListener('click', toggleSpeechRecognition);

function toggleSpeechRecognition() {
    if (isListening) {
        stopSpeechRecognition();
    } else {
        startSpeechRecognition();
    }
    isListening = !isListening;
    micBtn.classList.toggle('active', isListening);
}

function stopSpeechRecognition() {
    if (recognition) {
        recognition.stop();
        recognition.onend = null; // Remove the onend event to prevent restart
    }
}

function startSpeechRecognition() {
    if (recognition) {
        recognition.stop();
    }

    recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = function(event) {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();

        if (transcript.includes('remove recent task')) {
            removeMostRecentToDo();
        } else if (transcript.startsWith('create a task')) {
            const taskText = transcript.replace('create a task', '').trim();
            if (taskText) {
                toDoInput.value = taskText;
                setTimeout(() => {
                    addToDoFromSpeech(taskText);
                }, 3000);
            } else {
                alert("You must specify a task after Command: 'sunlight create new task'!");
            }
        } else if (transcript.includes('turn off the mic')) {
            stopSpeechRecognition();
            isListening = false;
            micBtn.classList.remove('active');
        }

        // Only restart recognition if still listening
        if (isListening) {
            restartRecognition();
        }
    };

    recognition.onend = function() {
        if (isListening) {
            restartRecognition();
        }
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
        if (isListening) {
            restartRecognition();
        }
    };

    recognition.start();
}

function restartRecognition() {
    if (recognition) {
        recognition.start();
    }
}

function addToDoFromSpeech(todoText) {
    const timestamp = new Date().toLocaleString();
    todosList.push({ text: todoText, completed: false, timestamp: timestamp });
    savelocal();
    renderTodos();
    toDoInput.value = '';
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
