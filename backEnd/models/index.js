const { User } = require("./userModel");
const { Item } = require("./itemModel");
const { Category } = require("./categoryModel");
const { Date } = require("./dateModel");
require("./associations");

module.exports = {
  User,
  Item,
  Category,
  Date,
};
