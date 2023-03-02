//-- Importing packages and modules --//
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

//-- Initializing the server --//
const app = express();
const PORT = process.env.PORT || 3001;

//-- Setting up Sessions --//
const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {
      maxAge:1000 * 60 * 5,
      httpOnly: true,
      secure: false,
      sameSite: 'strict'
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

//-- Setting up the handlebars --//
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// //-- Serving static files --//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(__dirname + '/public' ));

//-- Routing --//
app.use(require('./controllers/'));

//-- Starting the Server --//
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now surfing 🌊 on http://localhost:'+ PORT));
});
