const Contact = require('../models/Contact');
const createError = require('http-errors');

// This gets all contacts
exports.getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

// This gets contact by ID
exports.getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      throw createError(404, 'Contact not found');
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

// This creates new contact
exports.createContact = async (req, res, next) => {
  try {
    const { firstname, lastname, email } = req.body;
    
    const newContact = new Contact({
      firstname,
      lastname,
      email
    });
    
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    next(error);
  }
};

// This Updates contact
exports.updateContact = async (req, res, next) => {
  try {
    const { firstname, lastname, email } = req.body;
    
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { firstname, lastname, email },
      { new: true, runValidators: true }
    );
    
    if (!updatedContact) {
      throw createError(404, 'Contact not found');
    }
    
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

// This Delete's contact
exports.deleteContact = async (req, res, next) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!deletedContact) {
      throw createError(404, 'Contact not found');
    }
    
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// This Deletes all contacts
exports.deleteAllContacts = async (req, res, next) => {
  try {
    await Contact.deleteMany();
    res.json({ message: 'All contacts deleted successfully' });
  } catch (error) {
    next(error);
  }
};