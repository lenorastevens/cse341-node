const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My Contacts API',
    description: 'Project for BYU-I Fall CSE 341 class.',
    author: 'Lenora Stevens'
  },
  host: 'cse341-contacts-project-ep1p.onrender.com',
  schemes: [ 'https' ],
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);