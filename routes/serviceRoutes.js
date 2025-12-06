const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  deleteAllServices
} = require('../controllers/serviceController');

router.get('/', getAllServices);
router.get('/:id', getServiceById);

router.post('/', protect, createService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);
router.delete('/', protect, deleteAllServices);

module.exports = router;