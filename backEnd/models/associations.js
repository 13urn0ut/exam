const { Item } = require("./itemModel");
const { Category } = require("./categoryModel");
const { Date } = require("./dateModel");
const { User } = require("./userModel");
const { UserItem } = require("./userItemModel");

Category.hasMany(Item);
Item.belongsTo(Category);

Item.belongsToMany(Date, { through: "item_date" });
Date.belongsToMany(Item, { through: "item_date" });

User.hasMany(UserItem);
UserItem.belongsTo(User);

Item.hasMany(UserItem);
UserItem.belongsTo(Item);
