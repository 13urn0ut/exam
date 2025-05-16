const { Category } = require("../models");

const categories = ["single", "group"];

const insertData = async () => {
  console.log("Inserting data...");

  // await Promise.all(
  //   categories.map(async (category) => {
  //     await Category.findOrCreate({ where: { name: category } });
  //   })
  // );

  console.log("Data inserted successfully.");
};

module.exports = insertData;
