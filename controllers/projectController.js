const Project = require('../models/Project');
const createError = require('http-errors');

exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) throw createError(404, 'Project not found');
    res.json(project);
  } catch (error) {
    next(error);
  }
};

exports.createProject = async (req, res, next) => {
  try {
    const project = new Project(req.body);
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    next(error);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProject) throw createError(404, 'Project not found');
    res.json(updatedProject);
  } catch (error) {
    next(error);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) throw createError(404, 'Project not found');
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.deleteAllProjects = async (req, res, next) => {
  try {
    await Project.deleteMany();
    res.json({ message: 'All projects deleted successfully' });
  } catch (error) {
    next(error);
  }
};