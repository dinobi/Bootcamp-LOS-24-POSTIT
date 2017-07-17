export default (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false, //  dont write to db if data is not supplied
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false, //  dont write to db if data is not supplied
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return Group;
};
