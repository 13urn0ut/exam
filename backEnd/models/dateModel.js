const { sequelize, DataTypes, Model } = require("../DB/connectDB");
// const Item = require("./itemModel");

class Date extends Model {}

Date.init(
  {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "date",
    timestamps: false,
  }
);

// Date.belongsToMany(Item, { through: "item_date" });

module.exports = { Date };
