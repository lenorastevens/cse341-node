const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Vendor Tracking API',
    description: 'API for app users to track Vendors',
    author: 'Lenora Stevens'
  },
  host: 'vendor-tracking.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, routes, doc);