var express = require('express');              //把express模板导入进来
var app = express();                           //创建一个express对象的实例
var http = require('http').createServer(app);  //给这个服务创建一个服务
var io = require('socket.io')(http); 
app.use(express.static( __dirname + '/public/'));              //对静态资源进行管理
app.get('/',function (req,res) {                //对根目录的请求，都使用文件index.html
	res.sendfile((__dirname +'/index.html');
});

//一个客户端连接的字典，当一个客户端连接到服务器时，
//会产生一个唯一的socketId，该字典保存socketId到用户信息（昵称等）的映射
var connectionList = {};

io.sockets.on('connection',function (socket){
	// 当客户端连接服务器时，要把用户名和socketId保存起来
	socketId = socket.id;
	connectionList[socketId] = {
		socket:socket
	};
})
//用户进入聊天室事件，向其他在线用户广播其用户名
socket.on('join',function(data){
    socket.broadcase.emit('broad_join',data);
    connectionList[socketId]..username = data.username;
});
 //用户离开聊天室事件，向其他在线用户广播其离开
 socket.on('disconnect',function(){
 	if (connectionList[socketId].username) {
 		socket.broadcase.emit('broad_quit',{
 			username:connectionList[socketId].username
 		});
 	}
 	delete.connectionList[socketId];
 })

 socket.on('say',function(data){
 	socket.broadcase.emit('broad_asy',{
 		username:connectionList[socketId].username,
 		text:data.test
 	})
 })

