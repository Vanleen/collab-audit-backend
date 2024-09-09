// models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true, // Valide que l'email est correct
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false, // rôles: auditeur, collaborateur, entreprise
  },
  sirenOrSiret: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: /^[0-9]{9,14}$/i,
    },
  },
});

module.exports = User;
