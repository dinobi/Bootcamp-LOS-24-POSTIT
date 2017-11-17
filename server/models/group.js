export default (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    groupname: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
      allowNull: false,  //  dont write to db if data is not supplied
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true, //  dont write to db if data is not supplied
      defaultValue: 'There is no description for this group'
    }
  });
  Group.associate = (models) => {
    Group.belongsToMany(models.User, {
      through: 'UserGroup',
      as: 'User',
      foreignKey: 'groupname'
    });
  };
  return Group;
};
