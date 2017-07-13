export default (sequelize, DataTypes) => {
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
      validate: {
        len: [4, 10]
      }
    },
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return User;
};
