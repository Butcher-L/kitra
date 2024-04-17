import { createConnection } from 'mysql';

// Create MySQL connection
const connection = createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: 'admin',
  database: 'kitra'
});

// Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

// Function to get all locations within a given radius
function getLocationsWithinRadius(latitude, longitude, radiusInKm) {
//   const sql = `
//     SELECT *, 
//     (6371 * acos(cos(radians(?)) * cos(radians(Latitude)) * cos(radians(Longitude) - radians(?)) + sin(radians(?)) 
//     * sin(radians(Latitude)))) AS distance
//     FROM treasures
//     HAVING distance < ?
//   `;
const sql = `
SELECT *
FROM treasures
WHERE
  (6371 * acos(cos(radians(?)) * cos(radians(Latitude)) * cos(radians(Longitude) - radians(?)) + sin(radians(?)) * sin(radians(Latitude)))) < ?
`;
  
  connection.query(sql, [latitude, longitude, latitude, radiusInKm], (err, results) => {
    if (err) {
      console.error('Error fetching locations: ' + err.stack);
    //   callback(err, null);
      throw new Error('Error fetching locations: ' + err.stack)
    }
    console.log(results)
    return results
  });
}

// Example usage
const latitude = 14.552036595352455; // Example latitude
const longitude = 121.01696118771324; // Example longitude
const radiusInKm = 10; // Example radius in kilometers

getLocationsWithinRadius(latitude, longitude, radiusInKm, (err, locations) => {
  if (err) {
    console.error('Error fetching locations: ' + err.stack);
    return;
  }
  console.log('Locations within radius:', locations);
  return {
    locations
  }

});

// Close MySQL connection
connection.end();
