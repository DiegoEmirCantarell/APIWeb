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

// Update current user
exports.updateMe = async (req, res) => {
  try {
    // Check if password was provided (this route is not for password updates)
    if (req.body.password) {
      return res.status(400).json({
        status: 'fail',
        message: 'This route is not for password updates. Please use /updatePassword.',
      });
    }

    // Filter out unwanted fields that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');

    // Update user document
    const updatedUser = await User.update(filteredBody, {
      where: { id: req.user.id },
      returning: true,
      plain: true,
    });

    // Fetch updated user
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

// Helper function to filter object
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
}; 