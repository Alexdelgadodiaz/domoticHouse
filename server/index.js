let socketId =      "webAppPi";
let terminalName =  "terminalSonatoPi";
let serverId =      "serverPi";

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var terminalConnectedName;

var messagesFromServer = [{
  id:1,
  text: "Bienvenido a la app",
  author:"Admin"
}]

app.use(express.static('public'));

app.get('/', function(req, res){
  res.status(200).send("hello word");
});

io.on('connection', function(socket){
  console.log("Alguien se ha conectado con sockets");


  // socket.emit('messagesFromServer', messagesFromServer);

  // socket.on('messageFromClient', function(data){
  //   messagesFromServer.push(data);
  //   io.sockets.emit('messagesFromServer', messagesFromServer);
  // })

  socket.on('disconnect', function(){
    console.log("Usuario desconectado de los sockets");
   });

});

io.sockets.on('connection', function(socket){
  handleEntryConnection(socket);
});

function handleEntryConnection(socket){
  socket.on("messageFromClient", function(socketId, data, callback){
    // socketName[socket.id] = socketId;
    switch (data) {
      case "abrirPuerta":
          abrirPuerta();
        break;
      default:
         console.log("messageFromClient not valid");
    }
  });

  socket.on("messageFromTerminal", function(socketId, data, callback){
    terminalConnectedName = socketId;
    switch (data) {
      case "connection":
          console.log("Terminal connected with name: " + socketId);
        break;
      default:

    }
  })

}

function abrirPuerta(){
  if (terminalConnectedName == terminalName) {
    socket.emit('messagesFromServerToTerminal', serverId, "abrirPuerta");
  }else{
    console.log("Cannot open door, terminal not connected");
  }
}


server.listen(8080, function(){
  console.log("Servidor escuchando en el puerto 8080");
});

exports = module.exports = app;
