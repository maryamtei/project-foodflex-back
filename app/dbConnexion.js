const { Sequelize } = require('sequelize');

// Si on met en place dotenv sur ce fichier, il va chercher le fichier .env dans /app
// On attendra de finir l'atelier jour 3 pour mettre en place dotenv dans notre point d'entrée (par exemple /index.js)

// On charge l'url de PG
const PG_URL = "postgres://bmycrhcbnofysn:1ade80a3fbbece08d68b41fce7ef8055d433e5958ae3aff92607a0d90c2c1c24@ec2-63-35-80-199.eu-west-1.compute.amazonaws.com:5432/d6ehd2d0fnn1u8";

const defineAttributes = {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // N'utilisez ceci qu'avec des certificats auto-signés
        }
    },
    logging: false,
    define: {
        // underscored: true,          // On indique à sequelize de passer en mode snake case
        createdAt: "created_at",    // On lui indique la syntaxe pour nos timestamps
        updatedAt: "updated_at",
    }
}

const sequelize = new Sequelize(PG_URL, defineAttributes)

module.exports = sequelize;