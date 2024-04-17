import mysql from 'mysql';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
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
  console.log('Connected to MySQL');
});

// Function to find treasure boxes within a specified distance and prize value range
function findTreasures(latitude, longitude, radiusInKm, prizeValueStart, prizeValueEnd) {
    return new Promise((resolve, reject) => {
        const parsedDistance = parseFloat(radiusInKm);
        if (isNaN(parsedDistance) || ![1, 10].includes(parsedDistance)) {
            reject(new Error('Distance must be either 1 or 10 km'));
            return;
        }

        let prizeValueQuery = '';
        if (prizeValueStart !== undefined && prizeValueEnd !== undefined) {
            const parsedPrizeValueStart = parseInt(prizeValueStart);
            const parsedPrizeValueEnd = parseInt(prizeValueEnd);
            if (isNaN(parsedPrizeValueStart) || isNaN(parsedPrizeValueEnd) || parsedPrizeValueStart < 10 || parsedPrizeValueEnd > 30 || parsedPrizeValueStart > parsedPrizeValueEnd) {
                reject(new Error('Prize value range must be between $10 and $30'));
                return;
            }
            prizeValueQuery = `AND (m.amt BETWEEN ${parsedPrizeValueStart} AND ${parsedPrizeValueEnd})`;
        }

        // Query treasures and money_values within the specified distance and prize value range
        const query = `
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

        connection.query(query, [latitude, longitude, latitude, radiusInKm], (error, results) => {
            if (error) {
                console.error('Error retrieving treasures:', error);
                reject(new Error('Internal server error'));
                return;
            }
            resolve(results);
        });
    });
}

// Endpoint to find treasure boxes within a specified distance and prize value range
app.get('/find-treasures', (req, res) => {
  const { latitude, longitude, distance, prizeValueStart, prizeValueEnd } = req.query;

  // Validate input
  if (!latitude || !longitude || !distance) {
      return res.status(400).json({ error: 'Latitude, longitude, and distance are required' });
  }

  // Call findTreasures function
  findTreasures(latitude, longitude, distance, prizeValueStart, prizeValueEnd)
      .then(results => {
          res.json(results);
      })
      .catch(error => {
          res.status(500).json({ error: error.message });
      });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
