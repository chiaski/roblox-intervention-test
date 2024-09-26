$(document).ready(function() {
    const socket = io();

    socket.on('logMessage', (message) => {
        console.log('Received message:', message);
    });
});