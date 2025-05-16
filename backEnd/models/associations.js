const { Item } = require("./itemModel");
const { Category } = require("./categoryModel");
const { User } = require("./userModel");
const { Bookmark } = require("./bookmarkModel");
const { Review } = require("./reviewModel");

Category.hasMany(Item);
Item.belongsTo(Category);

User.hasMany(Bookmark);
Bookmark.belongsTo(User);

Item.hasMany(Bookmark);
Bookmark.belongsTo(Item);

User.hasMany(Review);
Review.belongsTo(User);

Item.hasMany(Review);
Review.belongsTo(Item);
