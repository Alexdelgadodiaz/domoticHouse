let socketId = "webAppPi";
var socket = io.connect('http://192.168.1.99:8080',{'forceNew':true});

//recibe mensaje del server
socket.on('messagesFromServerToClient', function(data){
  console.log(data);
  render(data);
});

//renderiza el mensaje recibido del server
function render(data){

  var html = data.map(function(elem, index){
    return(`<div>
                  <strong>${elem.author}</strong>:
                  <em>${elem.text}</em>
                </div>`);
  }).join(" ");

  document.getElementById('messagesFromServerToClient').innerHTML = html;

}

// //send message to server
// function sendMessage(e){
//
//   var payload = {
//     author : document.getElementById('username').value,
//     text : document.getElementById('texto').value
//   };
//   console.log(payload);
//   socket.emit('messageFromClient', payload);
//   return false;
//
// }

//send message to server
function abrirPuerta(){
  console.log("Cliente provisional:  message sent to Server");

  // var payload = {
  //   action : "abrirPuerta",
  // };
  // console.log(payload);
  socket.emit('messageFromClientToServer', socketId, "abrirPuerta");
  return false;

}
