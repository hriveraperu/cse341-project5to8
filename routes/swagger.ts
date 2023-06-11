const routerSwagger = require('express').Router();
const swaggerUiRoute = require('swagger-ui-express');
const swaggerDocumentRoute = require('../swagger-output.json');

routerSwagger.use('/api-docs', swaggerUiRoute.serve);
routerSwagger.get('/api-docs', swaggerUiRoute.setup(swaggerDocumentRoute));

module.exports = routerSwagger;