/*----------------- DotEnv ----------------- */
const dotenv = require('dotenv');
dotenv.config();

/*----------------- Express ----------------- */
const express = require('express');
const {errorHandler} = require("./app/middlewares/errorHandler")
const routerFavorite = require('./app/routers/routerFavorite');
const routerUser = require('./app/routers/routerUser');
const routerSchedule = require('./app/routers/routerSchedule');
const routerContact = require('./app/routers/routerContact');
const cors = require('cors');
const router = require('./app/routers/routerContact');
const expressJsDocSwagger = require("express-jsdoc-swagger") // doc swagger
const PORT = process.env.PORT || 3000;
const bodySanitizer = require("./app/middlewares/bodySanitizer")
const app = express();

app.set('env', 'development');
app.use(express.json());
const options = require("./app/doc/swaggerDoc")
expressJsDocSwagger(app)(options);
/*----------------- Middlewares ----------------- */
app.use(cors('*'));
app.use(bodySanitizer);
app.use(routerFavorite);
app.use(routerUser);
app.use(routerSchedule);
app.use(routerContact);
app.use(errorHandler);

// app.use(middlewares.notFound);


/*----------------- App ----------------- */

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} ...`)
});
/*
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
*/