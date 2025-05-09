const { Item } = require("./itemModel");
const { Category } = require("./categoryModel");
const { Date } = require("./dateModel");
// const { User } = require("./userModel");

Category.hasMany(Item);
Item.belongsTo(Category);

Item.belongsToMany(Date, { through: "item_date" });
Date.belongsToMany(Item, { through: "item_date" });
