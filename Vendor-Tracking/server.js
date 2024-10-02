const express = require('express');
const cors = require('cors');
const mongodb = require('./db/vendorTrackingDb');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = process.env.PORT || 8080;

app
    .use(cors())
    .use(express.json())
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    // .use((req, res, next) => {
    //     res.setHeader('Access-Control-Allow-Origin', '*');
    //     next();
    //   })
    .use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}|n` + `Exception origin: ${origin}`);
});
  
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});
  