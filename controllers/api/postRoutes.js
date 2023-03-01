const router = require('express').Router();
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const { Post, User, Comment } = require('../../models');


//--- GET route to fetch all posts with their comments and users ---//
router.get('/', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      attributes: ['id', 'title', 'Description'],
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
    res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//--- GET route to fetch a post by :id ---//
router.get('/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'post_text', 'title'],
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
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//--- POST route to create a new post ---//
router.post('/', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.create({
      title: req.body.title,
      post_text: req.body.post_text,
      user_id: req.session.user_id
    });
    res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//--- PUT route to edit a post by :id ---//
router.put('/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.update(
      {
        title: req.body.title,
        post_text: req.body.post_text
      },
      { where: { id: req.params.id } }
    );
    if (!dbPostData[0]) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//--- DELETE route to delete a post by :id ---//
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.destroy({
      where: { id: req.params.id }
    });
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
