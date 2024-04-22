import { establishMySQLConnection } from "../helpers/mysql.js";
import dotenv from 'dotenv'
dotenv.config();

const connection = await establishMySQLConnection()

// Seed sample data for treasures
connection.query(`INSERT INTO ${process.env.MYSQLDATABASE}.treasures (Latitude, Longitude, Name) VALUES
  (40.7128, -74.0060, 'Statue of Liberty'),
  (48.8566, 2.3522, 'Eiffel Tower'),
  (-33.8688, 151.2093, 'Sydney Opera House'),
  (14.55497458, 121.01846298, 'Building 1'),
  (14.87869110, 120.80412220, 'Building 2');
  `, (err, results, fields) => {
    if (err) {
      console.error('Error seeding treasures data: ' + err.stack);
      return;
    }
    console.log('Treasures data seeded successfully');
});

// Seed sample data for users
connection.query(`INSERT INTO ${process.env.MYSQLDATABASE}.users (name, age, password, email) VALUES
  ('John Doe', 30, 'password123', 'john@example.com'),
  ('Jane Smith', 25, 'secret456', 'jane@example.com');`, (err, results, fields) => {
    if (err) {
      console.error('Error seeding users data: ' + err.stack);
      return;
    }
    console.log('Users data seeded successfully');
});

// Seed sample data for money_values
connection.query(`INSERT INTO ${process.env.MYSQLDATABASE}.money_values (treasure_id, amt) VALUES
  (1, 10.00),
  (1, 20.00),
  (2, 30.00),
  (2, 40.00),
  (3, 50.00),
  (3, 20.00),
  (4, 10.00),
  (5, 50.00),
  (4, 20.00);`, (err, results, fields) => {
    if (err) {
      console.error('Error seeding money_values data: ' + err.stack);
      return;
    }
    console.log('Money_values data seeded successfully');
});

// Close MySQL connection
connection.end();
