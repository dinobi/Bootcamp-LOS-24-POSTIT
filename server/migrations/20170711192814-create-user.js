module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        allowNull: false,
        type: Sequelize.STRING,        
        primaryKey: true,
        validate: {
          isAlpha: true
        }
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          isAplha: true
        }
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING,
        validate: {
          len: [11, 13],
        }
      },
      lastSeen: {
        allowNull: true,
        type: Sequelize.STRING
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
