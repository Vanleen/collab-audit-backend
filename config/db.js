const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();  // Charger les variables d'environnement depuis le fichier .env

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie...');
  })
  .catch((err) => {
    console.log('Erreur de connexion à la base de données:', err);
  });

module.exports = sequelize;
