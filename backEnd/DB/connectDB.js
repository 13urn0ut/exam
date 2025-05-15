const { Sequelize, DataTypes, Model, Op } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

const connectDB = async () => {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
  await sequelize.sync({ alter: true });
  console.log("All models were synchronized successfully.");
};

const closeDB = async () => {
  await sequelize.close();
  console.log("Connection has been closed successfully.");
};

module.exports = { connectDB, closeDB, sequelize, DataTypes, Model, Op };
