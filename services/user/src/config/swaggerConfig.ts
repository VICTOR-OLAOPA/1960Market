// swaggerConfig.ts
// import swaggerJsdoc from 'swagger-jsdoc';

// const swaggerDefinition: OpenAPIV3.Document = {
//   openapi: "3.0.0",
//   info: {
//     title: "1960Market API Documentation", // Title of the API documentation
//     version: "1.0.0", // Version of the API
//     description: "API documentation for the 1960Market platform", // Description of the API
//   },
//   servers: [
//     {
//       url: "http://localhost:3000", // Server URL
//       description: "Development server",
//     },
//   ],
// };

// export default swaggerDefinition;


import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '1960Market API Documentation',
      version: '1.0.0',
    },
  },
  apis: ['../src/routes/*.ts'], // Adjust the path to your API files
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
