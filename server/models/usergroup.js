module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup', {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false  //  dont write to db if data is not supplied
    },
    group_id: {
      type: DataTypes.STRING,
      allowNull: false  //  dont write to db if data is not supplied
    },
    update_trigger: {
      // Used to monitor changes to the state of a user data
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return UserGroup;
};
