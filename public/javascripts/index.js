var socket = io();

socket.on('connect', function() {
    console.log('connected to server');
});

socket.on('disconnect', function() { console.log('disconnected from server'); });

socket.on('newMessage', function(message) {
    let source = $('#message-template').html();
    let template = Handlebars.compile(source);
    let html = template({
        text: message.text,
        from: message.from,
        createdAt: moment(message.createdAt).format('H:mm a')
    });
    $('#messages').append(html);
});

socket.on('newLocationMessage', function(message) {
    let source = $('#location-message-template').html();
    let template = Handlebars.compile(source);
    let html = template({
        url: message.url,
        from: message.from,
        createdAt: moment(message.createdAt).format('H:mm a')
    });
    $('#messages').append(html);
});

$('#message-form').on('submit', function (e) {
    e.preventDefault();

    let messageTextbox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('')
    });
});

let locationButton = $('#send-location');

locationButton.on('click', function () {
    if (!navigator.geolocation)
        return alert('geolocation not supported');

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('unable to get location');
    });
});