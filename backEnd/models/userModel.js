const { sequelize, DataTypes, Model } = require("../DB/connectDB");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // username: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    // },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    },
  },
  { sequelize, modelName: "user" }
);

module.exports = {
  User,
};
