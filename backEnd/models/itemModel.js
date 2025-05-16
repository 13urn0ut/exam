const { sequelize, DataTypes, Model } = require("../DB/connectDB");

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
      unique: true,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default.jpg",
    },

    price: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
    },

    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    blocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "item",
  }
);

module.exports = { Item };
