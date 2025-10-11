const Service = require('../models/Service');
const createError = require('http-errors');

exports.getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    next(error);
  }
};

exports.getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) throw createError(404, 'Service not found');
    res.json(service);
  } catch (error) {
    next(error);
  }
};

exports.createService = async (req, res, next) => {
  try {
    const service = new Service(req.body);
    const savedService = await service.save();
    res.status(201).json(savedService);
  } catch (error) {
    next(error);
  }
};

exports.updateService = async (req, res, next) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedService) throw createError(404, 'Service not found');
    res.json(updatedService);
  } catch (error) {
    next(error);
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) throw createError(404, 'Service not found');
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.deleteAllServices = async (req, res, next) => {
  try {
    await Service.deleteMany();
    res.json({ message: 'All services deleted successfully' });
  } catch (error) {
    next(error);
  }
};