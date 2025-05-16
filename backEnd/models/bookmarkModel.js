const { sequelize, DataTypes, Model } = require("../DB/connectDB");

class Bookmark extends Model {}

Bookmark.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "bookmark",
  }
);

module.exports = { Bookmark };
