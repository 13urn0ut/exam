const { sequelize, DataTypes, Model } = require("../DB/connectDB");
const Category = require("./categoryModel");
const Date = require("./dateModel");

class Item extends Model {}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default.jpg",
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
    },
    ratting: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "item",
  }
);

Item.hasOne(Category);
Item.belongsToMany(Date, { through: "item_date" });

module.exports = Item;
