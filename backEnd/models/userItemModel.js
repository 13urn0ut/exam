const { sequelize, DataTypes, Model } = require("../DB/connectDB");

class UserItem extends Model {}

UserItem.init(
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

module.exports = { UserItem };
