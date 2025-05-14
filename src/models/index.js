const User = require('./User');
const Product = require('./Product');
const CategoryProduct = require('./CategoryProduct');

// Define associations
User.hasMany(Product, {
  foreignKey: 'user_id',
  as: 'products',
});

Product.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'seller',
});

CategoryProduct.hasMany(Product, {
  foreignKey: 'category_product_id',
  as: 'products',
});

Product.belongsTo(CategoryProduct, {
  foreignKey: 'category_product_id',
  as: 'category',
});

module.exports = {
  User,
  Product,
  CategoryProduct,
}; 