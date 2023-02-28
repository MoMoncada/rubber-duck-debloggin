//--- Importing Modules ---//
const sequelize = require('../config/connection');
const { User, Post } = require('../models');

//--- Array of comments to pre-populate the Users table ---//
const usersData = [
    {
        username: 'moMoncada',
        email: 'mauxi.moncada10@gmail.com',
        password: 'password123'
    },
    {
        username: 'chipSausage',
        email: 'chip@choccylab.com',
        password: 'password1234'
    },
    {
        username: 'JayC',
        email: 'evilTweedy@badhaircut.com',
        password: 'password1235'
    }
];

const seedUsers = () => User.bulkCreate(usersData, { individualHooks: true });

module.exports = seedUsers;