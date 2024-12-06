const pgp = require('pg-promise')();

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const connection = {
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
};

const db = pgp(connection);

const connectDatabase = async () => {
    try {
        await db.connect();
        console.log('PostgreSQL Connected');
    } catch (error) {
        console.error('Failed to connect to PostgreSQL:', error.message);
        process.exit(1);
    }
};

module.exports = { db, connectDatabase };
