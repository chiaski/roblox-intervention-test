$(document).ready(function() {
    const socket = io();

    socket.on('logMessage', (message) => {
        console.log('Received message:', message);
    });

    socket.on('control', (data) => {
        console.log('Received control:', data);
        if(actions[data.act]){
            actions[data.act][data.what]();
        }
    });
});


// Possible actions

var actions = {

    popup: {
        body: function(){
            
  let bb1 = win("a/body.html", "", 100,160,randInt(100,300), randInt(100,600));
  let bb2 = win("a/body.html", "", 100,160,randInt(800,1100), randInt(100,600));
        },
        angel: function(){
                    
        for(let i = 0; i < randInt(3,6); i++){
            let www = win(`a/angel.html`, "", 100, 100, randInt(0,1300), randInt(300,900));  
        }
        }
    }
}