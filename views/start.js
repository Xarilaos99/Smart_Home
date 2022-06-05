const APP = require('./app');
const port = process.env.PORT || '8080';

const app=APP.app
const http=APP.http

//our server with the port it listens
const server = http.listen(port, () => {
	console.log("Listening to port " + port)
});

//const io = require('socket.io')(server);
//creating socket connection
const io=APP.io
io.on('connection', function(socket){
	
	console.log('A user connected');
	
	//Whenever someone disconnects this piece of code executed
	socket.on('disconnect', function () {
	   console.log('A user disconnected');
	});
 });

