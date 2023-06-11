const routes = require('express').Router();
const contactCard = require('./contactCard');
const user = require('./user');
//const ownerRouter = require('./ownerRoute')

routes.use('/', require('./swagger'));
routes.use('/contactCard', contactCard);
//routes.use('/owner', ownerRouter);
routes.use('/auth', user);



module.exports = routes;