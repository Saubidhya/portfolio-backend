const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController'); // Import login
const { protect } = require('../middleware/authMiddleware'); // Import protect
const {
  getAllUsers,
  getUserById,
  createUser, // This is effectively Sign Up
  updateUser,
  deleteUser,
  deleteAllUsers
} = require('../controllers/userController');

// Auth Routes
router.post('/login', login); // New Login Endpoint
router.post('/', createUser); // Sign Up (Public)

// Protected User Management
router.get('/', getAllUsers); // Maybe public, or protect if you want only admin to see
router.get('/:id', getUserById);

// Requirement: "For the User context, only edit and delete operations require authentication"
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);
router.delete('/', protect, deleteAllUsers);

module.exports = router;