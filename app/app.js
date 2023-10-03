const socket = io('ws://localhost:8080');

function sendMessage(event) {
    event.preventDefault();

    const input = document.querySelector('input');
    if (input.value) {
        socket.emit('message', input.value);
        input.value = '';
    }
    input.focus();
}

document.querySelector('form').addEventListener('submit', sendMessage);

// Listen for messages
socket.on('message', (data) => {
    const li = document.createElement('li');
    li.textContent = data;
    document.querySelector('ul').appendChild(li);
})