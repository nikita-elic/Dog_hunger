const mssql = require('mssql');
const propForConnection = require('../config.js').db;

let db = null;

const getConnectionDb = async () => {
    try {
        db = await mssql.connect(propForConnection);
    } catch (err) {
        console.log(err.message);
    }
};

const getDb = async () => {
    try {
        if (db) {
            return await db;
        } else { 
            throw new Error('No connection with database');
        }
    } catch (err) {
        console.log(err.message);
    }
};

module.exports = {
    getConnectionDb,
    getDb
};