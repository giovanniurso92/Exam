const socket = io();

const chatForm = document.getElementById('chat-form');
const chatBox = document.getElementById('chat-box');
const chatIcon = document.getElementById('chat-icon');
const chatPopup = document.getElementById('chat-popup');

chatIcon.addEventListener('click', () => {
    const isHidden = chatPopup.style.display === 'none' || chatPopup.style.display === '';
    chatPopup.style.display = isHidden ? 'flex' : 'none';
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = document.getElementById('message').value.trim();
    if (message) {
        socket.emit('chat message', message);
        document.getElementById('message').value = '';
    }
});

socket.on('chat message', (msg) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = msg;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
});