const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Import middleware
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  deleteAllProjects
} = require('../controllers/projectController');

router.get('/', getAllProjects);         // Public
router.get('/:id', getProjectById);      // Public

// Protected Routes (Need Token)
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);
router.delete('/', protect, deleteAllProjects);

module.exports = router;