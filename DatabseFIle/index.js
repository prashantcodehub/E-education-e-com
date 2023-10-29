const mysql = require('mysql');
const config = require('../../config/config.json');

function connectToDatabase() {
    const { host, user, password, database } = config;

    const pool = mysql.createPool({
        connectionLimit: 10,
        host: "localhost",  
        user: "root",
        password: "root",
        database: "Education"
    });

    pool.getConnection(function (err, connection) {
        if (err) {
            console.error('Error connecting to MySQL database: ' + err.stack);
            return;
        }
        console.log('Connected to MySQL database');
        connection.release();
    });

    return pool;
}

module.exports = connectToDatabase;