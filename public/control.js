$(document).ready(function() {
    const socket = io();

    $('#logConsoleBtn').on('click', function() {
        socket.emit('logConsole', 'Log this message on other clients');
    });
});

