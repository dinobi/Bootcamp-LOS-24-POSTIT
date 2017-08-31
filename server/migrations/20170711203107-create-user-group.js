module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('UserGroups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      groupname: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: false
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
    queryInterface.dropTable('UserGroups');
  }
};
