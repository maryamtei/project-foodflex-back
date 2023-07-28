// Import dependencies
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const expressJsDocSwagger = require("express-jsdoc-swagger");
const bodyParser = require('body-parser'); // Added body-parser for express.json()

// Load environment variables from .env file
dotenv.config();

// Create Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Set environment and JSON parsing middleware
app.set('env', 'development');
app.use(bodyParser.json());
app.use(cors('*'));

// Import routes and error handler middleware
const { errorHandler } = require("./app/middlewares/errorHandler");
const routerFavorite = require('./app/routers/routerFavorite');
const routerUser = require('./app/routers/routerUser');
const routerSchedule = require('./app/routers/routerSchedule');
const routerContact = require('./app/routers/routerContact');
// const bodySanitizer = require("./app/middlewares/bodySanitizer");

// Apply middlewares and routes
// app.use(bodySanitizer);
app.use(routerFavorite);
app.use(routerUser);
app.use(routerSchedule);
app.use(routerContact);
app.use(errorHandler);

// Swagger documentation
const swaggerDoc = require("./app/doc/swaggerDoc");
swaggerDoc(app)

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} ...`);
});
