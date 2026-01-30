// PostgreSQL Connection Setup

const { Pool } = require('pg');
const { DATABASE_URL } = require('./env');


const pool = new Pool({
    connectionString: DATABASE_URL
});

pool.on('connect', () => {
    console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('❌ PostgreSQL connection error:', err);
    process.exit(1);
});

module.exports = pool;
