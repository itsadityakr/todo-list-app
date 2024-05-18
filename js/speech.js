const micBtn = document.querySelector('.mic-btn');
micBtn.addEventListener('click', startSpeechRecognition);
function startSpeechRecognition() { 
const recognition = new webkitSpeechRecognition(); 
recognition.lang = 'en-US';
recognition.start();
recognition.onresult = function(event) { 
    const transcript = event.results[0][0].transcript.toLowerCase(); 
    if (transcript.includes('hey remove recent task')) { 
        removeMostRecentToDo();
    } else { 
        toDoInput.value = transcript; 
        setTimeout(() => { 
            addToDoFromSpeech(transcript);
        }, 3000); 
    }
};
recognition.onend = function() { 
    recognition.stop();
};
recognition.onerror = function(event) { 
    console.error('Speech recognition error:', event.error);
};
}
function addToDoFromSpeech(todoText) { 
    if (todoText.trim() === '') { 
        alert("You must say something!");
    } else { 
        const timestamp = new Date().toLocaleString();
        todosList.push({ text: todoText, completed: false, timestamp: timestamp });
        savelocal();
        renderTodos();
        toDoInput.value = '';
    }
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
