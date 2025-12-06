const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;

    // 1. Check if token exists in headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw createError(401, 'Not authorized to access this route');
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      throw createError(401, 'User belonging to this token no longer exists');
    }

    // 4. Grant access
    req.user = user;
    next();

  } catch (error) {
    next(createError(401, 'Not authorized, token failed'));
  }
};