const { sequelize, DataTypes, Model } = require("../DB/connectDB");
// const Item = require("./itemModel");

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isIn: [["single", "group"]],
      },
    },
  },
  {
    sequelize,
    modelName: "category",
    timestamps: false,
  }
);

// Category.belongsTo(Item);

module.exports = { Category };
