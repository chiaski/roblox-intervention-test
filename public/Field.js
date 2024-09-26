window.AudioContext = window.AudioContext || window.webkitAudioContext;


function chance(prob) {
  return !!prob && Math.random() <= prob;
}

function pick(arr) {
  return arr[(Math.random() * arr.length) | 0]
}

function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var socket = io();
//var socket = io("/sounds");
//var socket = io('https://ambient.institute', {path: '/sounds/socket.io'});



