export default (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    fromUser: {
      type: DataTypes.STRING,
      allowNull: false
    },
    toGroup: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    priority: {
      type: DataTypes.STRING,
      defaultValue: 'normal',
      allowNull: true,
      validate: {
        isIn: [['normal', 'urgent', 'critical']]
      }
    }
  });
  return Message;
};
