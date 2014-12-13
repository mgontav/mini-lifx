var socket = require('socket.io-client')('http://interactions.whitesmith.co:80/office');
var light = {};

socket.on('connect', function(){
	console.log("Connected to Whitesmith's socket server.")
	console.log("Please behave.")
});

socket.on('light:setup', changeLight);
socket.on('light:on',    changeLight);
socket.on('light:off',   changeLight);
socket.on('light:color', changeLight);

socket.on('disconnect', function(){
	console.log("Disconnected.")
});

function changeLight( state ){
	console.log("Something has changed. Let's act accordingly.")
	console.log(state);
}