// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message'),
      userName = document.getElementById('userName'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        userName: userName.value
    });
    message.value = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', userName.value);
})

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    if(data.userName===userName.value){
        output.innerHTML += '<div><p style="float:right"><strong>' + data.userName + ' :  </strong>' + data.message + '</p></div>';
    }
    else{
        output.innerHTML += '<div><p><strong>' + data.userName + ': </strong>' + data.message + '</p></div>';
    }
    
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
