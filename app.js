const express = require('express');
const app = express();
const mongodb = require('./db/connection');
const port = process.env.PORT || 8080;
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');


const bodyParser = require('body-parser');

app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use('/', require('./routes'))
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
        next();
    });

// process.on('uncaughtException', (err, origin) => {
//     console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception on: ${origin}`);
// });


//SWAGGER
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//Connect DB
mongodb.initDb((err, mongodb) => {
  if (err) {
      console.log(err);
  } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
  }
});
