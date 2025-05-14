const { CategoryProduct, Product } = require('../models');

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryProduct.findAll();

    res.status(200).json({
      status: 'success',
      results: categories.length,
      data: {
        categories,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get category by ID
exports.getCategory = async (req, res) => {
  try {
    const category = await CategoryProduct.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          as: 'products',
        },
      ],
    });

    if (!category) {
      return res.status(404).json({
        status: 'fail',
        message: 'No category found with that ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        category,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const newCategory = await CategoryProduct.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        category: newCategory,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const category = await CategoryProduct.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({
        status: 'fail',
        message: 'No category found with that ID',
      });
    }

    // Update category
    await CategoryProduct.update(req.body, {
      where: { id: req.params.id },
    });

    const updatedCategory = await CategoryProduct.findByPk(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        category: updatedCategory,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await CategoryProduct.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({
        status: 'fail',
        message: 'No category found with that ID',
      });
    }

    // Check if category has products
    const products = await Product.count({
      where: { category_product_id: req.params.id },
    });

    if (products > 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Cannot delete category with associated products',
      });
    }

    await CategoryProduct.destroy({
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