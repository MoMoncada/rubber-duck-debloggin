//--- Importing modules ---//
const Sequelize = require('sequelize');

const dotEnv = require('dotenv');


//--- connection to the database ---//
const sequelize = process.env.JAWSDB_URL
    ? new Sequelize(process.env.JASDB_URL)
    : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3006
    });


module.exports = sequelize;