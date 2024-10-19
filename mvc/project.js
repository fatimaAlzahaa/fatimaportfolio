const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: String,
  description: String,
  technologies: [String],
  link: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);
