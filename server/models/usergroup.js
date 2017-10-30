export default (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,  //  dont write to db if data is not supplied
      refrences: {
        model: 'User',
        key: 'username'
      }
    },
    groupname: {
      type: DataTypes.STRING,
      allowNull: false,  //  dont write to db if data is not supplied
      refrences: {
        model: 'Group',
        key: 'groupname'
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true, //  dont write to db if data is not supplied
      defaultValue: 'There is no description for this group.',
      refrences: {
        model: 'Group',
        key: 'description'
      }
    }
  });
  return UserGroup;
};
