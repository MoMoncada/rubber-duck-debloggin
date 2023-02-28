//--- Importing Modules ---//
const { Post } = require('../models');

//--- Array of comments to pre-populate the Post table ---//
const postsData = [
    {
        title: 'JS for dummies',
        description: 'I love javascript!',
        user_id: 1
    },
    {
        title: 'I want to build a time machine',
        description: 'How hard can it be?',
        user_id: 2
    },
    {
        title: 'Should I be scared of AI?',
        description: 'Tin foil hat mode on!',
        user_id: 1
    }
];

const seedPosts = () => Post.bulkCreate(postsData);

module.exports = seedPosts;