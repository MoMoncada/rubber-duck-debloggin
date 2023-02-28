//-- importing 'express' framework --//
const router = require('express').Router();

//-- requiring the route files --//
const apiRoutes = require('./api/');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');

//-- routes for the router object --//
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
router.use('/', homeRoutes);


module.exports = router;