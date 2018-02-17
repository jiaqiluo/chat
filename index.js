var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req,res){
	res.sendFile(__dirname+'/index.html');
});

io.on('connection', function(socket){
	const _id = socket.id.substr(2, 5);
	io.emit('chat message', '+ ' + _id + " joins, welcome!");
	console.log('+ ' + _id);

	socket.on('disconnect', function(){
		console.log('- '+ _id);
		io.emit('chat message', '- '+ _id +' leaves');

	});

	socket.on('chat message', function(msg){
		io.emit('chat message', _id + ': ' + msg);
		console.log('message:' + _id + ': ' + msg);
	});
});
http.listen(3000, function(){
	console.log('listening on *:3000')
});