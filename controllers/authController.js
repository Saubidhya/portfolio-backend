const User = require('../models/User');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email and password exist
    if (!email || !password) {
      throw createError(400, 'Please provide email and password');
    }

    // 2. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(401, 'Invalid email or password');
    }

    // 3. Check if password is correct (using the method we added to the model)
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw createError(401, 'Invalid email or password');
    }

    // 4. Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // Token expires in 1 day
    );

    // 5. Send response
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    next(error);
  }
};