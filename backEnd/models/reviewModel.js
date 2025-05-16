const { sequelize, DataTypes, Model } = require("../DB/connectDB");

class Review extends Model {}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200],
      },
    },
  },
  {
    sequelize,
    modelName: "review",
  }
);

module.exports = { Review };
