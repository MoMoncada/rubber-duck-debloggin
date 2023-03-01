const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


//--- GET route to fetch all comments ---//
router.get('/', withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll();
    res.json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//--- POST rout to create a new comment in the db ---//
router.post('/', withAuth, async (req, res) => {
  try {
    if (req.session) {
        const dbCommentData = await Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id,
      });
      res.json(dbCommentData);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});


//--- DELETE route to delete a comment by :id ---//
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!dbCommentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
