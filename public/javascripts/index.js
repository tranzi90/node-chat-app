var socket = io();

socket.on('connect', function() {
    console.log('connected to server');
});

socket.on('disconnect', function() { console.log('disconnected from server'); });

socket.on('newMessage', function(message) {
    console.log('new Message received: ', message);

    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    let li = jQuery('<li></li>');
    let a = jQuery('<a target="_blank">My current location</a>');
    a.attr('href', message.url);

    li.text(`${message.from}: `);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {
        
    });
});

let locationButton = jQuery('#send-location');

locationButton.on('click', function () {
    if (!navigator.geolocation)
        return alert('geolocation not supported');

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert('unable to get location');
    });
});