const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//--- GET request to the '/' endpoint ---//
router.get('/', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'title',
        'description'
        // 
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
    res.render('dashboard', { posts, loggedIn: true, username: req.session.username });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//---  GET request to the /edit/:id endpoint ---//
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      attributes: [
        'id',
        'title',
        'description',
        // 
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id'],
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

    if (dbPostData) {
      const post = dbPostData.get({ plain: true });

      res.render('edit-post', {
        post,
        loggedIn: true,
        username: req.session.username
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
