const routes = require('express').Router();
const contactCard = require('./contactCard');
const user = require('./user');

routes.use('/', require('./swagger'));
routes.use('/contactCard', contactCard);
routes.use('/auth/google', user);

module.exports = routes;