const socket = io('ws://localhost:8080');

const typing = document.querySelector('.typing');
const msgInput = document.querySelector('input');

function sendMessage(event) {
    event.preventDefault();

    if (msgInput.value) {
        socket.emit('message', msgInput.value);
        msgInput.value = '';
    }
    msgInput.focus();
}

document.querySelector('form').addEventListener('submit', sendMessage);

// Listen for messages
socket.on('message', (data) => {
    typing.textContent = "";
    const li = document.createElement('li');
    li.textContent = data;
    document.querySelector('ul').appendChild(li);
})

msgInput.addEventListener('keypress', ()=> {
    socket.emit('typing', socket.id.substring(0, 5));
})

// Listen for typing
let typingTimer;
socket.on('typing', (message) => {
    typing.textContent = message;

    // Clear typing after 3 seconds
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        typing.textContent = "";
    
    }, 3000)
})

