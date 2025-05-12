const { User } = require("./userModel");
const { Item } = require("./itemModel");
const { Category } = require("./categoryModel");
require("./associations");

module.exports = {
  User,
  Item,
  Category,
};
