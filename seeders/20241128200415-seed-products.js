const products = require('../db.json'); // Import db.json data

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sanitizedProducts = products.map(({ id, ...product }) => product); // Exclude 'id' and timestamps
    await queryInterface.bulkInsert('Products', sanitizedProducts, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
