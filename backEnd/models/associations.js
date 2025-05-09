const { Item } = require("./itemModel");
const { Category } = require("./categoryModel");
const { Date } = require("./dateModel");
const { User } = require("./userModel");
const { Order } = require("./orderModel");
const { Review } = require("./reviewModel");

Category.hasMany(Item);
Item.belongsTo(Category);

Item.belongsToMany(Date, { through: "item_date" });
Date.belongsToMany(Item, { through: "item_date" });

User.hasMany(Order);
Order.belongsTo(User);

Item.hasMany(Order);
Order.belongsTo(Item);

User.hasMany(Review);
Review.belongsTo(User);

Item.hasMany(Review);
Review.belongsTo(Item);
