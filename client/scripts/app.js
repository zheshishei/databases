// YOUR CODE HERE:

var app = {};

app.init = function(){
  this.server = 'http://localhost:3000/classes/messages';
  this.fetch();
  // setInterval(this.fetch, 2000);
};

app.addMessage = function(message){
  var addSlashes = function ( str ) {
    return str;//(str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
  };
  //$('#chats').append('<span>'+message+'</span>');
  var singleMessage = document.createElement('div');
  $(singleMessage).addClass('message');
  var text = document.createElement('span');
  $(text).addClass('text');
  text.innerText = addSlashes(message.text);
  if (app.friends[addSlashes(message.username)]) {
    $(text).css("font-weight", "Bold");
  }
  var user = document.createElement('span');
  $(user).addClass('user');
  user.innerText = addSlashes(message.username);
  var roomName = document.createElement('span');
  $(roomName).addClass('roomname');
  roomName.innerText = addSlashes(message.roomname);
  $(singleMessage).append(roomName, user, text);
  $('#chats').append(singleMessage);
};

app.send = function(message){
  $.ajax({
    // always use this url
    url: 'http://localhost:3000/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.friends = {};

app.fetch = function(){
  $.ajax({
    // always use this url
    url: 'http://localhost:3000/classes/messages',
    type: 'GET',
    // data: 'createdAt'
    contentType: 'application/json',
    data: {
      order: '-createdAt',
    },
    success: function (data) {
      console.log('fetching');
      data = JSON.parse(data);
      var allMessages = data.results;
      var rooms = [];
      for(var i = 0; i < allMessages.length; i++) {
        var message = allMessages[i];
        rooms.push(message.roomname);
      }
      rooms = _.uniq(rooms);
      app.addRooms(rooms);


      app.clearMessages();
      for (var i = 0; i < allMessages.length; i++) {
        if (allMessages[i].username === undefined || allMessages[i].text === undefined || allMessages[i].roomname !== app.currentRoom) {continue};
        app.addMessage(allMessages[i]);
      }
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to fetch messages');
    }
  });
};

app.rooms = {};

app.addRooms = function(rooms) {
  for (var i = 0; i<rooms.length; i++) {
    if (app.rooms[rooms[i]] || rooms[i] === undefined || rooms[i] === null || rooms[i] === '') {continue;}
    var room = document.createElement('button');
    $(room).addClass('room');
    room.innerText = rooms[i];
    $('#roomSelect').append(room);
    app.rooms[rooms[i]] = rooms[i];
  }
};

app.clearMessages = function(){
  $('#chats').empty();
};


app.addRoom = function(room){
  $('#roomSelect').append('<span>'+room+'</span>');
};

app.handleSubmit = function(){
  var username = document.URL.split('=').pop();
  var text = $('.messageInput').val();
  var room = $('.newRoom').val();
  app.currentRoom = room || app.currentRoom;
  var message = {
    'username': username,
    'text': text,
    'roomname': app.currentRoom
  };
  app.send(message);
  app.fetch();
  $('.messageInput').val('');
};

app.currentRoom;

$(document).ready(function() {
  $('#roomSelect').on('click', 'button', function() {
    app.currentRoom = this.innerText;
  });
  $('.submit').on('click',app.handleSubmit);
  $('#chats').on('click', '.user', function() {
    if (!app.friends[this.innerText]) {
      var friend =  document.createElement('div');
      friend.innerText = this.innerText;
      $('#friends').append(friend);
      app.friends[friend.innerText] = friend.innerText;
    }
  });
});



app.init();













/*
var messageIds={};

var getMessages = function(){

  var showMessage = function(message){
    var node=$('<div></div>');
    var user = '<span class=user>'+(message.username)+':  </span>';
    var message='<span class=message>'+(message.text)+'</span>';
    node.append(user);
    node.append(message);
    $('#messages').append(node);

  };



  $.ajax({
    // always use this url
    url: 'http://localhost:8080/classes/messages',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      for(var i=0; i<data.results.length; i++){
        var messageId = data.results[i].objectId;
        if (!messageIds[messageId]) {
          showMessage(data.results[i]);
          messageIds[messageId] = messageId;
        }
      }
      console.log(data);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

getMessages();

$(function() {
  $("#button").click( function() {
    getMessages();
  });
});

*/
