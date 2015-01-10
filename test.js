var mysql = require('mysql');
var db = require('server/db');
var bluebird = require('bluebird');
var models = bluebird.promisifyAll(require('server/models'));

var chat1 = db.createConnection('chatConnection', {database: 'chat'});

/*chat1.connect(function(err) {
  if(err) throw err;
  console.log(chat1.threadId);
});*/

/*var query = new db.Select('chatConnection',
        ['Users.username', 'Messages.message', 'Rooms.name', 'Messages.createdAt'],
        ['Messages', 'Users', 'Rooms']);

query.constraints['Messages.Room_ID'] = 'Rooms.ID';
query.constraints['Messages.User_ID'] = 'Users.ID';

query.constraints['Users.username'] = '"Alan"';

query.send(console.log);*/


models.messages.get({users : 'Alan'}).then(function(data) {
  console.log(data);
  // res.status(201).type('json')
  // .send(JSON.stringify({results: data}));
});

// models.messages.get({users: 'Alan'});

//SELECT Users.username, Messages.message, Rooms.name, Messages.createdAt FROM Messages, Users, Rooms WHERE Messages.Room_ID = Rooms.ID AND Messages.User_ID = Users.ID AND Users.username = "Alan"  LIMIT 100;
//SELECT Users.username, Messages.message, Rooms.name, Messages.createdAt FROM Messages, Users, Rooms WHERE Messages.Room_ID = Rooms.ID AND Messages.User_ID = Users.ID AND Users.username = "Alan"  LIMIT 100;
