module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
      allowNull: false,  //  dont write to db if data is not supplied
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,  //  dont write to db if data is not supplied
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, //  dont write to db if data is not supplied
      validate: {
        notEmpty: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false, //  dont write to db if data is not supplied
      validate: {
        not: ['[a-z]', 'i']
      }
    }
  });
  User.associate = (models) => {
    User.belongsToMany(models.Group, {
      through: 'UserGroup',
      as: 'Group',
      foreignKey: 'username'
    });
  };
  return User;
};
