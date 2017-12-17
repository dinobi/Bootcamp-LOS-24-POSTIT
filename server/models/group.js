export default (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    groupname: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'There is no description for this group'
    }
  });
  Group.associate = (models) => {
    Group.belongsToMany(models.User, {
      through: 'UserGroup',
      as: 'User',
      foreignKey: 'groupname',
      onDelete: 'CASCADE'
    });
  };
  return Group;
};
