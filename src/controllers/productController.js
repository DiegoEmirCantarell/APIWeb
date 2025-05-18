const { Product, User, CategoryProduct } = require('../models');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: User,
          as: 'seller',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: CategoryProduct,
          as: 'category',
        },
      ],
    });

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get product by ID
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'seller',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: CategoryProduct,
          as: 'category',
        },
      ],
    });

    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'No product found with that ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    // Add user id from the authenticated user
    req.body.user_id = req.user.id;

    const newProduct = await Product.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'No product found with that ID',
      });
    }

    // Check if user is the owner of the product
    if (product.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'fail',
        message: 'You can only update your own products',
      });
    }

    // Update product
    await Product.update(req.body, {
      where: { id: req.params.id },
    });

    const updatedProduct = await Product.findByPk(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        product: updatedProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'No product found with that ID',
      });
    }

    await Product.destroy({
      where: { id: req.params.id },
    });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get products by seller ID
exports.getProductsBySeller = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { user_id: req.params.sellerId },
      include: [
        {
          model: User,
          as: 'seller',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: CategoryProduct,
          as: 'category',
        },
      ],
    });

    if (products.length === 0) {
      return res.status(200).json({
        status: 'success',
        results: 0,
        data: {
          products: [],
        },
        message: 'No products found for this seller',
      });
    }

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get products by category ID
exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { category_product_id: req.params.categoryId },
      include: [
        {
          model: User,
          as: 'seller',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: CategoryProduct,
          as: 'category',
        },
      ],
    });

    if (products.length === 0) {
      return res.status(200).json({
        status: 'success',
        results: 0,
        data: {
          products: [],
        },
        message: 'No products found for this category',
      });
    }

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Reduce stock for multiple products
exports.reduceProductsStock = async (req, res) => {
  try {
    const { products } = req.body;
    
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide an array of products with id and quantity',
      });
    }

    const results = [];
    const errors = [];

    // Process each product in the array
    for (const item of products) {
      const { id, quantity } = item;
      
      if (!id || !quantity || quantity <= 0) {
        errors.push({ id, message: 'Invalid id or quantity' });
        continue;
      }

      const product = await Product.findByPk(id);
      
      if (!product) {
        errors.push({ id, message: 'Product not found' });
        continue;
      }

      if (product.stock < quantity) {
        errors.push({ id, message: 'Insufficient stock' });
        continue;
      }

      // Update the stock
      const newStock = product.stock - quantity;
      await Product.update({ stock: newStock }, { where: { id } });
      
      results.push({
        id,
        name: product.name,
        previousStock: product.stock,
        newStock,
        reducedBy: quantity
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        results,
        errors: errors.length > 0 ? errors : undefined
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
}; 