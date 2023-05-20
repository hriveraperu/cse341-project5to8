const routes = require('express').Router();
const contactCard = require('./contactCard');

routes.use('/', require('./swagger'));
routes.use('/contactCard', contactCard);

module.exports = routes;