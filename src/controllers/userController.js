const { User } = require('../models');

// Get current user
exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
    });

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Update current user password
exports.updateMe = async (req, res) => {
  try {
    // 1) Check if password field exists
    if (!req.body.password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Password is required'
      });
    }

    // 2) Hash the password
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // 3) Update only the password
    await User.update(
      { password: hashedPassword }, 
      { where: { id: req.user.id } }
    );

    // 4) Fetch updated user data (without password)
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
    });

    res.status(200).json({
      status: 'success',
      message: 'Password updated successfully',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Update password
exports.updatePassword = async (req, res) => {
  try {
    // 1) Check if password field exists
    if (!req.body.password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Password is required'
      });
    }

    // 2) Hash the password
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // 3) Update only the password
    await User.update(
      { password: hashedPassword }, 
      { where: { id: req.user.id } }
    );

    // 4) Fetch updated user data (without password)
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
    });

    res.status(200).json({
      status: 'success',
      message: 'Password updated successfully',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Helper function to filter object
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// Get all users except admins (only buyers and sellers)
exports.getNonAdminUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        role: ['buyer', 'seller']
      },
      attributes: { exclude: ['password'] },
    });

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
}; 