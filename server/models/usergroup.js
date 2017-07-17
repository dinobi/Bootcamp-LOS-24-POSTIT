export default (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup', {
    username: {
      type: DataTypes.STRING,
      allowNull: false  //  dont write to db if data is not supplied
    },
    groupname: {
      type: DataTypes.STRING,
      allowNull: false  //  dont write to db if data is not supplied
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
