module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING,
        validate: {
          isAlpha: true
        }
      },
      lastname: {
        type: Sequelize.STRING,
        validate: {
          isAplha: true
        }
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING,
        validate: {
          len: [11, 13],
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: (queryInterface /* , Sequelize */) => {
    queryInterface.dropTable('Users');
  }
};
