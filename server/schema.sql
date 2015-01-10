CREATE DATABASE IF NOT EXISTS chat;

USE chat;

CREATE TABLE IF NOT EXISTS users (
  ID          INT(8),
  username    VARCHAR(15)
);

CREATE TABLE IF NOT EXISTS messages (
  ID          INT(10),
  User_ID     INT(8),
  message     VARCHAR(140),
  Room_ID     INT(8)
);

CREATE TABLE IF NOT EXISTS rooms (
  ID          INT(8),
  name        VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS friendsOf (
  User_ID     INT(8),
  Friend_ID   INT(8)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

