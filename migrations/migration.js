import { establishMySQLConnection } from "../helpers/mysql.js";

const connection = await establishMySQLConnection()

// Create treasures table
connection.query(`CREATE TABLE treasures (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Latitude DECIMAL(10, 8),
    Longitude DECIMAL(11, 8),
    Name VARCHAR(255)
  );`, (err, results, fields) => {
    if (err) {
      console.error('Error creating treasures table: ' + err.stack);
      return;
    }
    console.log('Treasures table created successfully');
});

// Create users table
connection.query(`CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    age INT,
    password VARCHAR(255),
    email VARCHAR(255)
  );`, (err, results, fields) => {
    if (err) {
      console.error('Error creating users table: ' + err.stack);
      return;
    }
    console.log('Users table created successfully');
});

// Create money_values table
connection.query(`CREATE TABLE money_values (
    id INT AUTO_INCREMENT PRIMARY KEY,
    treasure_id INT,
    amt DECIMAL(10, 2),
    FOREIGN KEY (treasure_id) REFERENCES treasures(id)
  );`, (err, results, fields) => {
    if (err) {
      console.error('Error creating money_values table: ' + err.stack);
      return;
    }
    console.log('Money_values table created successfully');
});

// Close MySQL connection
connection.end();
