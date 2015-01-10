//controllers
var bluebird = require('bluebird');
var models = require('../models');



module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(req.query).then(function(data) {
        console.log(data);
        res.status(200).type('json')
        .end(JSON.stringify({results: data}));
      })
    }, // a function which handles a get request for all messages
    post: function (req, res) {} // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

