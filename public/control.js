const socket = io();


$(document).ready(function() {

    $('#logConsoleBtn').on('click', function() {
        socket.emit('logConsole', 'Log this message on other clients');
    });

    $("button").on("click", function(){
        let act = $(this).attr("act");
        let what = $(this).attr("what");
        socket.emit("control", {act: act, what: what});
    });

});

