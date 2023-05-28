const { describe } = require('node:test');

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contact Card API',
    description: 'API to storage contact cards',
  },
  host: 'cse341-project5to8.onrender.com',
  schemes: ['https']
  // host: 'localhost:8080',
  // schemes: ['http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);