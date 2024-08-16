const { drizzle } = require('drizzle-orm');
const { pg } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const db = drizzle({
    client: new pg.Client({
        connectionString: process.env.DATABASE_URL
    })
});

module.exports = db;