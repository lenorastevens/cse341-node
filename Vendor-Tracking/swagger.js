const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Vendor Tracking API',
    description: 'API for app users to track Vendors'
  },
  host: 'localhost:8080',
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);