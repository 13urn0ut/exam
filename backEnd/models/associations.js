const { Item } = require("./itemModel");
const { Category } = require("./categoryModel");
const { Date } = require("./dateModel");
const { User } = require("./userModel");

console.log(Item);
console.log(Category);
console.log(Date);
console.log(User);

Item.hasOne(Category, { foreignKey: "categoryId" });
Category.hasMany(Item, { foreignKey: "categoryId" });

Item.belongsToMany(Date, { through: "item_date" });
Date.belongsToMany(Item, { through: "item_date" });
