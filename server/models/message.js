export default (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    fromUser: {
      type: DataTypes.STRING,
      allowNull: false //  dont write to db if data is not supplied
    },
    toGroup: {
      type: DataTypes.STRING,
      allowNull: false //  dont write to db if data is not supplied
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false //  dont write to db if data is not supplied
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
