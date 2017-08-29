export default (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    from_user: {
      type: DataTypes.STRING,
      allowNull: false //  dont write to db if data is not supplied
    },
    to_group: {
      type: DataTypes.STRING,
      allowNull: false //  dont write to db if data is not supplied
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false //  dont write to db if data is not supplied
    },
    priority: {
      type: DataTypes.STRING,
      defaultValue: 'Normal',
      allowNull: true,
      validate: {
        isIn: [['Normal', 'Urgent', 'Critical']]
      }
    }
  });
  return Message;
};
