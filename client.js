var SerialPort = require("serialport").SerialPort

var serialPort = new SerialPort("tty_terminal");
var command = "0";

serialPort.on("open", function () {
  	console.log('Serial Port open');
  	console.log('Opening socket to WS interactions.')
  	var socket = require('socket.io-client')('http://interactions.whitesmith.co:80/office');

  	socket.on('connect', function(){
		console.log("Connected to Whitesmith's socket server.")
		console.log("Please behave.")
  	});

  	socket.on('light:setup', changeLight);
	socket.on('light:on',    changeLight);
	socket.on('light:off',   changeLight);
	socket.on('light:color', changeLight);

  	socket.on('disconnect', function(){
		console.log("Disconnected from WS interactions.")
	});
});

function changeLight( state ){
	console.log("Light has been changed.")
	console.log(state);

	if(state.on == false){
		command = "0";
	}else{
		switch(state.color.r){
			case 241: //Yellow
				command = "1";
				break;
			case 243: //Orange
				command = "2";
				break;
			case 231: //Red
				command = "3";
				break;
			case 26: //Cyan
				command = "4";
				break;
			case 41: //Blue
				command = "5";
				break;
			case 46: //Green
				command = "6";
				break;
			case 155: //Purple
				command = "7";
				break;
		}
	}

	serialPort.write(command, function(err, results) {
    	console.log('err ' + err);
  	  console.log('results ' + results);
  	});
}