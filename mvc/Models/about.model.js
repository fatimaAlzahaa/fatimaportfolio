const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  currentWork: { type: String, required: true },
  skillsTitle: { type: String, required: true },
  skills: { type: [String], required: true },
  resumeText: { type: String, required: true }
});

module.exports = mongoose.model('About', AboutSchema);
