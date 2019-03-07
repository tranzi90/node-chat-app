var socket = io();

socket.on('connect', function() {
    console.log('connected to server');
});

socket.on('disconnect', function() { console.log('disconnected from server'); });

socket.on('newMessage', function(message) {
    let time = moment(message.createdAt).format('h:mm a');

    let li = jQuery('<li></li>');
    li.text(`${message.from} ${time}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    let li = jQuery('<li></li>');
    let a = jQuery('<a target="_blank">My current location</a>');
    let time = moment(message.createdAt).format('h:mm a');
    a.attr('href', message.url);

    li.text(`${message.from} ${time}: `);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    let messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('')
    });
});

let locationButton = jQuery('#send-location');

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