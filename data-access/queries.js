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
        console.log(sql)
                
                if (err) {
                    console.error('Error fetching locations:', err.stack);
                    reject(new Error( err.stack));
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

export const getLocationsWithinRadiusWithPrize = async (latitude, longitude, radiusInKm, prizeValueQuery) => {
    try {
        // Establish MySQL connection
        const connection = await establishMySQLConnection();

        // Define SQL query
        const sql = `
        SELECT 
          t.id,
          t.latitude, 
          t.longitude, 
          t.Name,
          m.id as money_id,
          m.amt as prize_value
        FROM treasures as t
        JOIN money_values as m ON t.id = m.treasure_id
        WHERE
          (6371 * acos(
            cos(radians(?)) * cos(radians(t.latitude)) * cos(radians(t.longitude) - radians(?)) + sin(radians(?)) * sin(radians(t.latitude))
          )) < ?
        ${prizeValueQuery}
        `;

        // Execute the query
        return new Promise((resolve, reject) => {
            connection.query(sql, [latitude, longitude, latitude, radiusInKm ], (err, results) => {
                
                if (err) {
                    console.error('Error fetching locations:', err.stack);
                    reject(new Error(err.stack));
                    return;
                }
                resolve(results);
            });
        });
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const nearestTreasure = async (latitude, longitude) => {
    try {
        // Establish MySQL connection
        const connection = await establishMySQLConnection();

        // Define SQL query
        const sql = `
        SELECT 
          t.id,
          t.latitude, 
          t.longitude, 
          t.Name,
          m.id as money_id,
          m.amt as prize_value
        FROM treasures as t
        JOIN money_values as m ON t.id = m.treasure_id
        WHERE
          (6371 * acos(
            cos(radians(?)) * cos(radians(t.latitude)) * cos(radians(t.longitude) - radians(?)) + sin(radians(?)) * sin(radians(t.latitude))
          )) < ?
          LIMIT 1
        `;

        // Execute the query
        return new Promise((resolve, reject) => {
            connection.query(sql, [latitude, longitude, latitude, 1 ], (err, results) => {
                
                if (err) {
                    console.error('Error fetching locations:', err.stack);
                    reject(new Error(err.stack));
                    return;
                }
                resolve(results);
            });
        });
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};