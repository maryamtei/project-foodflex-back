const expressJSDocSwagger = require('express-jsdoc-swagger');
const options = {
    info: {
      version: '1.0.0',
      title: 'Project Foodflex',
      description: 'Create a food schedule!',
    },
    security: {
      BasicAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: "JWT"
      },
    },
    // security: {
    //   BasicAuth: {
    //     type: 'jwt',
    //     scheme: 'basic',
    //   },
    // },
    // servers: [
    //   {
    //     url: "http://localhost:3000"
    //   }
    // ],
    // apis: ["./routers/*.js"],
    baseDir: __dirname,
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: '../**/*.js',
    // URL where SwaggerUI will be rendered
    swaggerUIPath: '/api-docs',
    // Expose OpenAPI UI
    exposeSwaggerUI: true,
    // Set non-required fields as nullable by default
    notRequiredAsNullable: false
  };
console.log(options.baseDir)
console.log(options.filesPattern)
module.exports = (app) => expressJSDocSwagger(app)(options);