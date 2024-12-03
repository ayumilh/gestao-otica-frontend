require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('Erro ao conectar database', err.stack);
        return;
    }
    console.log('Database conectado');
    release();
});

module.exports = pool;