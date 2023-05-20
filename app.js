const express = require('express');
const app = express();
const mongodb = require('./db/connection');
const port = process.env.PORT || 8080;
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
//const swaggerAutogen = require('swagger-autogen')();

const bodyParser = require('body-parser');

//Import Routes
const contactCardRoutes = require('./routes/contactCard');

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
    })

//ROUTES
.use('/contactCard', contactCardRoutes);
    


//SWAGGER
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// app.listen(process.env.port || port);
// console.log('Web Server is listening at port '+ (process.env.port || port));

//Connect DB
mongodb.initDb((err, mongodb) => {
  if (err) {
      console.log(err);
  } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
  }
});
