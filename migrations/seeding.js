import { establishMySQLConnection } from "../helpers/mysql.js";
const connection = await establishMySQLConnection()

// Seed sample data for treasures
connection.query(`INSERT INTO treasures (Latitude, Longitude, Name) VALUES
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
connection.query(`INSERT INTO users (name, age, password, email) VALUES
  ('John Doe', 30, 'password123', 'john@example.com'),
  ('Jane Smith', 25, 'secret456', 'jane@example.com');`, (err, results, fields) => {
    if (err) {
      console.error('Error seeding users data: ' + err.stack);
      return;
    }
    console.log('Users data seeded successfully');
});

// Seed sample data for money_values
connection.query(`INSERT INTO money_values (treasure_id, amt) VALUES
  (1, 1000.00),
  (1, 500.00),
  (2, 1500.00),
  (3, 800.00),
  (3, 1200.00);`, (err, results, fields) => {
    if (err) {
      console.error('Error seeding money_values data: ' + err.stack);
      return;
    }
    console.log('Money_values data seeded successfully');
});

// Close MySQL connection
connection.end();
