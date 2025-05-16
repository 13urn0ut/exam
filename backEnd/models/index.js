const { User } = require("./userModel");
const { Item } = require("./itemModel");
const { Category } = require("./categoryModel");
const { Bookmark } = require("./bookmarkModel");
const { Review } = require("./reviewModel");
require("./associations");

module.exports = {
  User,
  Item,
  Category,
  Bookmark,
  Review,
};
