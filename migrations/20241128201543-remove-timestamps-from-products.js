module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'createdAt');
    await queryInterface.removeColumn('Products', 'updatedAt');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    });
    await queryInterface.addColumn('Products', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    });
  },
};
