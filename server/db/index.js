//db
var _ = require('lodash');
var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var Select = function(selectors, tables){
  this.selectors = selectors;
  this.tables = tables;
  this.constraints = {};
  this.ordering = [];
  this.limit = 100;
}

Select.prototype.send = function(){
  var query = 'SELECT ' + this.selectors.join(', ') + ' ';
  query += 'FROM ' + this.tables.join(', ') + ' ';
  query += _.reduce(this.constraints, function(accum, value, key) {
    return accum += key + ' = ' + value + ' AND ';
  }, 'WHERE ');
  query = query.substr(0, query.length - 4);
  query += ' LIMIT ' + this.limit;
  console.log(this.constraints);
  return query;
}

module.exports.Select = Select;
