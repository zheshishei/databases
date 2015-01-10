//models
var bluebird = require('bluebird');
var db = require('../db');




module.exports = {
  messages: {
    get: function (params) {
      var query = new db.Select('chatConnection',
        ['Users.username', 'Messages.message', 'Rooms.name', 'Messages.createdAt'],
        ['Messages', 'Users', 'Rooms']);

      query.constraints['Messages.Room_ID'] = 'Rooms.ID';
      query.constraints['Messages.User_ID'] = 'Users.ID';

      var actions = {
        limit: function(value){
          query.limit = value;
        },
        users: function(value){
          query.constraints['Users.username'] = '"' + value + '"';
        },
        rooms: function(value){
          query.constraints['Rooms.name'] = '"' + value + '"';
        },
        createdAt: function(value){
          query.constraints.createdAt = '"' + value + '"';
        }
      };

      for (var key in params){
        if(actions[key])
          actions[key](params[key]);
      }

      var promisedResult = new bluebird.Promise(function(resolve,reject) {
        query.send().then(function(rows) {
          resolve(rows);
        }).catch(function(err) {
          reject(err);
        });
      });
      return promisedResult;
    }, // a function which produces all the messages
    post: function () {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};
