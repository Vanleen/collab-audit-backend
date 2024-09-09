'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'sirenOrSiret', {
      type: Sequelize.STRING,
      allowNull: true, // Optionnel pour les utilisateurs non entreprise
      validate: {
        is: /^[0-9]{9,14}$/i,  // Valide un SIREN (9 chiffres) ou un SIRET (14 chiffres)
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'sirenOrSiret');
  }
};
