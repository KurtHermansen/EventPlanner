const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Event Planner API',
    description: 'You can see how to add venues and events for your location city.'
  },
  host: 'event-planner-cse341.herokuapp.com',
  schemes: ['https']
};

// const doc = {
//     info: {
//       title: 'Event Planner API',
//       description: 'You can see how to add venues and events for your location city.'
//     },
//     host: 'localhost:8080',
//     schemes: ['http']
//   };

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });
