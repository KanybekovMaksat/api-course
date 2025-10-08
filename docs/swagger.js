// docs/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Course Registration API',
      version: '1.0.0',
      description: 'API для регистрации на курс',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Локальный сервер',
      },
    ],
  },
  apis: [path.join(__dirname, '../routes/*.js')], // <-- путь к роутам с аннотациями
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
