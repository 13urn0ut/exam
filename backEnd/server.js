require("dotenv").config();
const server = require("./app");
const { connectDB, closeDB } = require("./DB/connectDB");

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT);
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error(error);
    closeDB();
    process.exit(1);
  }
};

startServer();
