const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  deleteAllContacts
} = require('../controllers/contactController');

// Typically, anyone can CREATE a contact msg (send msg), but only admin can VIEW/DELETE
// But requirements say "only authenticated users can create, edit, or delete"
// So we follow requirements strictly:

router.get('/', getAllContacts);       
router.get('/:id', getContactById);

router.post('/', protect, createContact); 
router.put('/:id', protect, updateContact);
router.delete('/:id', protect, deleteContact);
router.delete('/', protect, deleteAllContacts);

module.exports = router;