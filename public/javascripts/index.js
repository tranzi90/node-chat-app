var socket = io();

socket.on('connect', function() {
    console.log('connected to server');

    socket.emit('createMessage', {
        from: 'OmTV',
        text: 'ptn hlo vnature',
    });
});

socket.on('disconnect', function() { console.log('disconnected from server'); });

socket.on('newMessage', function(message) { console.log('new Message received: ', message); });