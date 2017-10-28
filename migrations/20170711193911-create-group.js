module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      groupname: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: 'There is no description for this group'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface /* , Sequelize*/) => {
    queryInterface.dropTable('Groups');
  }
};
