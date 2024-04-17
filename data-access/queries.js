import { establishMySQLConnection } from "../helpers/mysql.js";
const connection = await establishMySQLConnection()

connection.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
  });

  export const getLocationsWithinRadius = async (latitude, longitude, radiusInKm) => {
    try {
        // Establish MySQL connection
        const connection = await establishMySQLConnection();

        // Define SQL query
        const sql = `
            SELECT *
            FROM treasures
            WHERE
            (6371 * acos(cos(radians(?)) * cos(radians(Latitude)) * cos(radians(Longitude) - radians(?)) + sin(radians(?)) * sin(radians(Latitude)))) < ?
        `;

        // Execute the query
        return new Promise((resolve, reject) => {
            connection.query(sql, [latitude, longitude, latitude, radiusInKm], (err, results) => {
                if (err) {
                    console.error('Error fetching locations:', err.stack);
                    reject(err);
                    return;
                }
                console.log('Locations within radius:', results);
                resolve(results);
            });
        });
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};