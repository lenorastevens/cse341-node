const express = require('express');
const app = express();
const mongodb = require('./data/professionalsDb');

const port = process.env.PORT || 8080;

app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if(err) {
    console.log(err);
  }
  else {
    app.listen(port, () => {
      console.log('Web Server is listening at port ' + (port));
    });
  }
});
