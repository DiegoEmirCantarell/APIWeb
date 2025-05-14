require('dotenv').config();
const sequelize = require('../config/database');
const { User, CategoryProduct, Product } = require('../models');
const bcrypt = require('bcryptjs');

// Sample data
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'seller',
  },
  {
    name: 'Buyer User',
    email: 'buyer@example.com',
    password: 'password123',
    role: 'buyer',
  },
  {
    name: 'Seller User',
    email: 'seller@example.com',
    password: 'password123',
    role: 'seller',
  },
];

const categories = [
  { id: 1, category: 'Electronics' },
  { id: 2, category: 'Clothing' },
  { id: 3, category: 'Home & Garden' },
  { id: 4, category: 'Books' },
  { id: 5, category: 'Sports' },
];

// Seed function
const seedDatabase = async () => {
  try {
    // Sync database
    await sequelize.sync({ force: true });
    console.log('Database synced successfully');

    // Create users
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return { ...user, password: hashedPassword };
      })
    );

    const createdUsers = await User.bulkCreate(hashedUsers);
    console.log('Users seeded successfully');

    // Create categories
    await CategoryProduct.bulkCreate(categories);
    console.log('Categories seeded successfully');

    // Create products
    const products = [
      {
        user_id: createdUsers[0].id,
        category_product_id: 1,
        name: 'Smartphone',
        description: 'Latest model smartphone with advanced features',
        type: 1,
        price: 699.99,
        stock: 25,
        image_url: 'https://example.com/images/smartphone.jpg',
      },
      {
        user_id: createdUsers[0].id,
        category_product_id: 1,
        name: 'Laptop',
        description: 'High-performance laptop for professionals',
        type: 1,
        price: 1299.99,
        stock: 15,
        image_url: 'https://example.com/images/laptop.jpg',
      },
      {
        user_id: createdUsers[2].id,
        category_product_id: 2,
        name: 'T-Shirt',
        description: 'Comfortable cotton t-shirt',
        type: 2,
        price: 19.99,
        stock: 100,
        image_url: 'https://example.com/images/tshirt.jpg',
      },
      {
        user_id: createdUsers[2].id,
        category_product_id: 3,
        name: 'Plant Pot',
        description: 'Ceramic plant pot for indoor plants',
        type: 3,
        price: 29.99,
        stock: 50,
        image_url: 'https://example.com/images/plantpot.jpg',
      },
      {
        user_id: createdUsers[0].id,
        category_product_id: 4,
        name: 'Programming Book',
        description: 'Learn to code with this comprehensive guide',
        type: 4,
        price: 49.99,
        stock: 30,
        image_url: 'https://example.com/images/book.jpg',
      },
    ];

    await Product.bulkCreate(products);
    console.log('Products seeded successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 