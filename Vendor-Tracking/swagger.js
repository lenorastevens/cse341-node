const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Vendor Tracking API',
    description: 'API for app users to track Vendors',
    author: 'Lenora Stevens'
  },
  host: 'vendor-tracking.onrender.com',
  schemes: ['https'],
  securityDefinitions: {
    OAuth2: {
      type: 'oauth2',
      flow: 'accessCode',
      authorizationUrl: '',
      tokenUrl: '',
      scopes: {
        read: 'Grants read access',
        write: 'Grants write access'
      }
    }
  }
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, routes, doc);