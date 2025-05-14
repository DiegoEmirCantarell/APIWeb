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

    // Check if user is the owner of the product
    if (product.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'fail',
        message: 'You can only delete your own products',
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