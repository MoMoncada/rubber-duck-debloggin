//--- Importing Modules ---//
const { Comment } = require('../models');

//--- Array of comments to pre-populate the Comment table ---//
const commentsData = [
    {
        description: 'I am trying to figure this program out',
        user_id: 1,
        post_id: 1
    },
    {
        description: 'Im trying to do the same thing',
        user_id: 2,
        post_id: 2
    },
    {
        description: 'Did you guys get it?',
        user_id: 3,
        post_id: 3
    }

];


const seedComments = () => Comment.bulkCreate(commentsData);

module.exports = seedComments;