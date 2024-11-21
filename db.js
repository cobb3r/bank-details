require('dotenv').config();

const {Pool} = require('pg');
const host = process.env.db_host
const user = process.env.db_user
const port = process.env.db_port
const password = process.env.db_password
const database = process.env.db_database

const pool = new Pool({
    host: host,
    user: user,
    port: port,
    password: password,
    database: database
});

module.exports = pool;