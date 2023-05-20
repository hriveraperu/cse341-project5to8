const express = require('express');
const app = express();
const mongodb = require('./db/connection');
const port = 8080;


app.get('/', (req,res) => {
  res.send("Hello");
});

app.use('/', require('./routes'));



app.listen(process.env.port || port);
console.log('Web Server is listening at port '+ (process.env.port || port));