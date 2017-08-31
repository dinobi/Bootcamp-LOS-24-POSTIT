module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false, //  dont write to db if data is not supplied
      validate: {
        isAlpha: true //  will only allow letters
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false, //  dont write to db if data is not supplied
      validate: {
        isAlpha: true //  will only allow letters
      }
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
      allowNull: false  //  dont write to db if data is not supplied
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,  //  dont write to db if data is not supplied
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, //  dont write to db if data is not supplied
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false, //  dont write to db if data is not supplied
      validate: {
        len: [11, 13]
      }
    },
    lastSeen: {
      allowNull: true,
      type: DataTypes.STRING
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
