var https = require('https');
var express = require('express');
var app = express();
var socket_io = require('socket.io')(https);
var fs = require('fs');
var path = require('path');
var router = express.Router();


var options = {
	key: fs.readFileSync('./webrtc.key'),
	cert: fs.readFileSync('./webrtc.crt')
}

var server = https.Server(options, app).listen(9527, function(){
	console.log('Server running...Port:9527');
	
});

var io = socket_io.listen(server);


app.use(express.static(__dirname + '/views'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.get('/', function(request, response){
	response.render('index.ejs');
});


var roomInfo = [];


users = [];


io.on('connection', function(socket){
	console.log('Connection Established!');
	var url = socket.request.headers.referer;
	var splited = url.split('/');
	var roomID = splited[splited.length - 1];

	var registeredUser = '';
		
	
	socket.on('join', function(userName){   //登記new user(registeredUser 
		registeredUser = userName;

		if (!roomInfo[roomID]) {
			roomInfo[roomID] = [];
		}
		roomInfo[roomID].push(registeredUser);
		
	
	
	socket.join(roomID);
	io.to(roomID).emit('sys',registeredUser + ' come in.', roomInfo[roomID]);
	console.log(registeredUser + ' come in the room ' +" "+ roomID);
	
	});
	
	socket.on('leave', function() {
		socket.emit('disconnect');
	});

	// 接收用户消息,发送相应的房间
  socket.on('message', function (msg) {
    // 验证如果用户不在房间内则不给发送
    if (roomInfo[roomID].indexOf(registeredUser) === -1) {  
      return false;
    }
    io.to(roomID).emit('msg', registeredUser, msg);
  });
	
	socket.on('signal',function(data){			//send signal
		socket.broadcast.to(roomID).emit('signalMsg', {
				type: data.type,
				message: data.message
		});
	});
	
	socket.on('disconnect', function(data){		
		var index = roomInfo[roomID].indexOf(registeredUser);
		if(index !== -1) {
			roomInfo[roomID].splice(index, 1);
		}
		socket.leave(roomID);
		io.to(roomID).emit('sys',registeredUser + ' quit the room.', roomInfo[roomID]);
		console.log(registeredUser + " disconnected  " + roomID);
			
		});
		
	
	});
	
router.get('/room/:roomID', function(req,res){

	var roomID = req.params.roomID;
	
	res.render('room', {
		roomID: roomID,
		users: roomInfo[roomID]
	});
});
app.use('/',router);








	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
