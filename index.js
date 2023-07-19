/*----------------- DotEnv ----------------- */
const dotenv = require('dotenv');
dotenv.config();

/*----------------- Express ----------------- */
const express = require('express');
const router = require('./app/routers/router');

const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();
// const middlewares = require('./app/middlewares');

app.use(express.json());
//app.use(express.urlencoded({extended: true}))
// On aurait pu mettre express.urlencoded, ça aurait aussi très bien marché
// Différence entre urlencoded() et json()
// json() parse uniquement des body sous forme de json
// urlencoded parse à la fois des body en json mais aussi en html post form (multipart/formdata)

/*----------------- Middlewares ----------------- */
app.use(cors('*'));                 // On autorise toutes les origines à envoyer des requests vers nos routes
// app.use(middlewares.bodySanitizer); // On branche le middleware qui va désinfecter les requetes qui contiennent un body, avant d'arriver vers le router
app.use(router);

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