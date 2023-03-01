//-- Importing modules --//
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require("../utils/auth");

//--- GET req for all posts for homepage ---//
router.get("/", async (req, res) => {
    try {
      // Get all posts and JOIN with user data
      const dbPostData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const posts = dbPostData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render("homepage", {
        posts,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });



// //-- GET req for a single post --//



// router.get('/login', (req, res) => {
//     if (req.session.loggedIn) {
//         res.redirect('/');
//         return;
//     }

//     res.render('login');
// });

// router.get('/signup', (req, res) => {
//     if (!req.session.loggedIn) {
//         res.render('signup');
//     } else {
//         res.redirect('/');
//     }
// });

module.exports = router;