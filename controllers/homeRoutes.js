const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

//--- GET request for the homepage ----//
router.get('/', async (req, res) => {
  console.log('======================');
  try {
    const dbPostData = await Post.findAll({
      attributes: [
        'id',
        'title',
        'description'
        
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'description', 'post_id', 'user_id'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    const posts = dbPostData.map(post => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
      username: req.session.username
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//--- GET request for the login page ---//
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


//--- GET request for a single post page ---//
router.get('/post/:id', async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'description',
        
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'description', 'user_id', 'post_id', ],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    const post = dbPostData.get({ plain: true })

    res.render('single-post', {
      post,
      loggedIn: req.session.loggedIn,
      username: req.session.username
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
