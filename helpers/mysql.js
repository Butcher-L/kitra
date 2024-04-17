import { createConnection } from 'mysql';
import dotenv from 'dotenv'
dotenv.config();

export const establishMySQLConnection = () => {
    return new Promise((resolve, reject) => {
        const connection = createConnection({
            host: process.env.MYSQLHOST,
            port: process.env.MYSQLPORT,
            user: process.env.MYSQLUSERNAME,
            password: process.env.MYSQLPASSWORD,
            database: process.env.MYSQLDATABASE
        });

        connection.connect(err => {
            if (err) {
                console.error('Error connecting to MySQL: ' + err.stack);
                
                reject(err);
                throw new Error("Connection Error")

            }
             return resolve(connection);
            // resolve;
        });

        // return connection
    });E
};

