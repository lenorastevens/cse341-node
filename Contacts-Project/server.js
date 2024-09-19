const express = require('express');
const mongodb = require('./data/contacts');
const app = express();

const port = 8080;

app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if(err) {
    console.log(err);
  }
  else {
    app.listen(process.env.PORT || port, () => {
      console.log('Database is listening at port ' + (process.env.PORT || port));
    });
  }
});

