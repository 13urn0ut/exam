const { User } = require("./userModel");
const { Item } = require("./itemModel");
const { Category } = require("./categoryModel");
const { Order } = require("./orderModel");
const { Review } = require("./reviewModel");
require("./associations");

module.exports = {
  User,
  Item,
  Category,
  Order,
  Review,
};
