import { Request, Response, NextFunction } from "express";

const expressApp = require('express');
const app = expressApp();
const mongodb = require('./db/connection');
const port = process.env.PORT || 8080;
const cors = require('cors');
const passportApp = require('passport')
const sessionApp = require('express-session')
const path = require('path')

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require(path.join(process.cwd(), 'swagger-output.json'));



const bodyParser = require('body-parser');




app.use(sessionApp({
    secret: 'thissession',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false}
}));


app.use(passportApp.initialize())
app.use(passportApp.session())

require('./controllers/google-oauth.ts')

app.use(expressApp.static(path.join(__dirname, 'client')));
app.get('/', (req: any, res: { sendFile: (arg0: string) => void; }) => {
    res.sendFile('index.html');
});

app
    .use(cors())
    .use(expressApp.json())
    .use(expressApp.urlencoded({ extended: true }))
    .use('/', require('./routes'))
    .use(bodyParser.json())
    .use((req: Request, res: Response, next: NextFunction) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    });
process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception on: ${origin}`);
});


//SWAGGER
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//Home


// Connect DB
mongodb.initDb((err: any, mongodb: any) => {
  if (err) {
      console.log(err);
  } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
  }
});
