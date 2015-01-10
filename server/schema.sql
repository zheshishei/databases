CREATE DATABASE IF NOT EXISTS chat;

USE chat;

CREATE TABLE IF NOT EXISTS users (
  ID          INT(8) NOT NULL AUTO_INCREMENT,
  username    VARCHAR(15) NOT NULL,

  PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS rooms (
  ID          INT(8) NOT NULL AUTO_INCREMENT,
  name        VARCHAR(30) NOT NULL,

  PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS messages (
  ID          INT(10) NOT NULL AUTO_INCREMENT,
  User_ID     INT(8) NOT NULL,
  message     VARCHAR(140) NOT NULL,
  Room_ID     INT(8) NOT NULL DEFAULT 1,
  createdAt   TIMESTAMP,

  PRIMARY KEY (ID),

  FOREIGN KEY (User_ID)
    REFERENCES users(ID)
    ON DELETE CASCADE,

  FOREIGN KEY (Room_ID)
    REFERENCES rooms(ID)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS friendsOf (
  User_ID     INT(8) NOT NULL,
  Friend_ID   INT(8) NOT NULL,

  FOREIGN KEY (User_ID)
    REFERENCES users(ID)
    ON DELETE CASCADE,

  FOREIGN KEY (Friend_ID)
    REFERENCES users(ID)
    ON DELETE CASCADE
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

