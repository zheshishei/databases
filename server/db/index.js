//db
var _ = require('lodash');
var mysql = require('mysql');
var bluebird = require('bluebird');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
var connections = {};

var createConnection = function(connectionName, params){
  connections[connectionName] = mysql.createConnection({
    host : params.host || 'localhost',
    port : params.port || 3306,
    user : params.user || 'root',
    password : params.password || '',
    database : params.database
  });
  return connections[connectionName];
};

var Select = function(connection, selectors, tables){
  this.connection = connection,
  this.selectors = selectors;
  this.tables = tables;
  this.constraints = {};
  this.ordering = [];
  this.limit = 100;
};

Select.prototype.send = function(){
  var query = 'SELECT ' + this.selectors.join(', ') + ' ';
  query += 'FROM ' + this.tables.join(', ') + ' ';
  query += _.reduce(this.constraints, function(accum, value, key) {
    return accum += key + ' = ' + value + ' AND ';
  }, 'WHERE ');
  query = query.substr(0, query.length - 4);
  query += ' LIMIT ' + this.limit;
  query += ';';

  var that = this;
  var retRows = [];
  var promisedResult = new bluebird.Promise(function (resolve, reject) {
    connections[that.connection].query(query)
      .on('result', function(row) {
        retRows.push(row);
      })
      .on('end', function(){
        resolve(retRows);
      })
      .on('error', function(err) {
        reject(err);
      });
  });

  return promisedResult;
};

module.exports.Select = Select;
module.exports.createConnection = createConnection;
