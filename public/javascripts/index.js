let socket = io();

socket.on('updateRoomList', function(rooms) {
    // console.log(rooms);
    let select = $('select');

    rooms.forEach(function (room) {
        select.append($('<option></option>').attr('value', room).text(room));
    });

    // $('#users').html(ul);
});