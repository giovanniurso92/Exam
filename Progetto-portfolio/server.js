// Import required modules
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle Socket.io connections
io.on('connection', (socket) => {
    console.log('Un utente si è connesso');

    // Listen for chat messages
    socket.on('chat message', (msg) => {
        console.log(`Messaggio ricevuto: ${msg}`);

        // Emit the message to all clients
        io.emit('chat message', `Io: ${msg}`);

        // Send an automatic response
        setTimeout(() => {
            io.emit('chat message', 'Ciao ancora non sono in grado di assisterti, ritorna alla fine del corso e saprò rispondere perfettamente a tutte le tue domande :)');
        }, 1000);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Un utente si è disconnesso');
    });
});

// Start the server
const PORT = 3020;
server.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
