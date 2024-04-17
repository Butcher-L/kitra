import express from 'express';
import { establishMySQLConnection } from './helpers/mysql.js';
import {
  findTreasure,
  findTreasuresWithPrize,
  findNearestTreasure
} from  './controllers/treasures.js'
const app = express();

const connection = await establishMySQLConnection()
if(!connection){
    throw new Error("Connection error")
}

app.get('/find-treasure', async (req, res) => {
  try {
    const result = await findTreasure(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/find-treasures', async (req, res) => {
  try {
    const result = await findTreasuresWithPrize(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//bonus
app.get('/find-nearest-treasure', async (req, res) => {
  try {
    const result = await findNearestTreasure(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


