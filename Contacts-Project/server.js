const express = require('express');
const cors = require('cors');
const mongodb = require('./data/contactsDb');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = process.env.PORT || 8080;

app
  .use(cors())
  .use(express.json())
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use('/', require('./routes'));

mongodb.initDb((err) => {
  if(err) {
    console.log(err);
  }
  else {
    app.listen(port, () => {
      console.log('Server is listening at port ' + (port));
    });
  }
});

