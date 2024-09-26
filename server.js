const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('logConsole', (message) => {
        socket.broadcast.emit('logMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// io.on('connection', (socket) => {
//   console.log('a user connected' + socket.id); 
  
//   socket.on('move', (field, id, x, y, color) => {
// //    console.log('move: ' + x + ", " + y + color);
//     socket.broadcast.emit('move', field, id, x, y, color);
//   });
  
//   socket.on('plant', (field, id, x, y, flower, color, msg, watered) => {
// //    console.log('plant: ' + x + ", " + y);
//     socket.broadcast.emit('plant', field, id, x, y, flower, color, msg, watered);
//   });
  
//   socket.on('water', (field, id, x, y) => {
// //    console.log('water: ' + x + ", " + y);
//     socket.broadcast.emit('water', field, id, x, y);
//   });
  
//   socket.on('step', (field, id, x, y) => {
// //    console.log('step: ' + x + ", " + y);
//     socket.broadcast.emit('step', field, id, x, y);
//   });
// });

