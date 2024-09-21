const express = require('express');
const mongodb = require('./data/contactsDb');
const app = express();

const port = process.env.PORT || 8080;

app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if(err) {
    console.log(err);
  }
  else {
    app.listen(port, () => {
      console.log('Database is listening at port ' + (port));
    });
  }
});

