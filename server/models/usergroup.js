export default (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      refrences: {
        model: 'User',
        key: 'username'
      }
    },
    groupname: {
      type: DataTypes.STRING,
      allowNull: false,
      refrences: {
        model: 'Group',
        key: 'groupname'
      }
    },
  });
  return UserGroup;
};
