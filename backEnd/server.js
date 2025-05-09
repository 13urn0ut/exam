require("dotenv").config();
const server = require("./app");
const { connectDB, closeDB } = require("./DB/connectDB");
const insertData = require("./DB/insertData");
// const associateModels = require("./models/associations");

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectDB();
    await insertData();
    server.listen(PORT);
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error(error);
    closeDB();
    process.exit(1);
  }
};

startServer();
