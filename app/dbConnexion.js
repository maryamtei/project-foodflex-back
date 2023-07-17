const { Sequelize } = require('sequelize');

// Si on met en place dotenv sur ce fichier, il va chercher le fichier .env dans /app
// On attendra de finir l'atelier jour 3 pour mettre en place dotenv dans notre point d'entrée (par exemple /index.js)

// On charge l'url de PG
const PG_URL = process.env.PG_URL;

const defineAttributes = {
    logging: false,
    define: {
        // underscored: true,          // On indique à sequelize de passer en mode snake case
        createdAt: "created_at",    // On lui indique la syntaxe pour nos timestamps
        updatedAt: "updated_at",
    }
}

const sequelize = new Sequelize(PG_URL, defineAttributes)

module.exports = sequelize;