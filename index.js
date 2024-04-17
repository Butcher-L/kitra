import express from 'express';
import { establishMySQLConnection } from './helpers/mysql.js';
import {findTreasure} from  './controllers/treasures.js'
const app = express();

const connection = await establishMySQLConnection()
if(!connection){
    throw new Error("Connection error")
}



// Define API endpoints
app.get('/find-treasure', async (req, res) => {

    const result = await findTreasure(req)

    res.status(200).json(result)
  // Logic to collect treasure and insert into database
  // Use req.body to access data sent in the request
});

app.get('/highest-money-value', (req, res) => {
  // Logic to retrieve the highest money value from treasures
  // Send the result as JSON response
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


