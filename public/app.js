let socketId = "webAppPi";
var socket = io.connect('http://localhost:8080',{'forceNew':true});

//recibe mensaje del server
socket.on('messagesFromServer', function(data){
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

  document.getElementById('messagesFromServer').innerHTML = html;

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

  // var payload = {
  //   action : "abrirPuerta",
  // };
  // console.log(payload);
  socket.emit('messageFromClient', socketId, "abrirPuerta");
  return false;

}
