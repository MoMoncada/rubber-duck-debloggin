const seedComments = require('./commentSeeds');
const seedPosts = require('./postSeeds');
const seedUsers = require('./userSeeds');

const sequelize = require('../config/connection');


const allSeeds = async () => {
    await sequelize.sync({force: true});
    console.log('========= DATABASE SYNCED ===========');

    console.log('========= USERS SEEDED ===========');
    await seedUsers();
    console.log('====================');

    console.log('========= POSTS SEEDED ===========');
    await seedPosts();
    console.log('====================');

    console.log('========== COMMENTS SEEDED ==========');
    await seedComments();
    console.log('====================');

    process.exit(0);
};


allSeeds();