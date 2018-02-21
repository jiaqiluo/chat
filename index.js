var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req,res){
	res.sendFile(__dirname+'/index.html');
});
var user_list = [];
var sockets = [];

io.on('connection', function(socket){
	const _id = socket.id.substr(2, 5);
	user_list.push(_id);
	sockets.push(socket);
	io.emit('chat message', '+ ' + _id + " joins, welcome!");
	console.log('+ ' + _id);
	io.emit('users', user_list);

	socket.on('disconnect', function(){
		console.log('- '+ _id);
		user_list.splice(user_list.indexOf(_id), 1);
		user_list.splice(user_list.indexOf(socket), 1);
		io.emit('chat message', '- '+ _id +' leaves');
		io.emit('users', user_list);

	});

	socket.on('chat message', function(msg){
		io.emit('chat message', _id + ': ' + msg);
		console.log('message:' + _id + ': ' + msg);
	});
});
http.listen(3000, function(){
	console.log('listening on *:3000')
});