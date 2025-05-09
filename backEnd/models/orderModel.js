const { sequelize, DataTypes, Model } = require("../DB/connectDB");

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "user_item",
  }
);

module.exports = { Order };
