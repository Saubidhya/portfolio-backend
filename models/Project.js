const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  technologies: [String],
  imageUrl: String,
  projectUrl: String,
  githubUrl: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);