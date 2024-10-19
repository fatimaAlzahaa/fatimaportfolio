const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [String],
    link: { type: String },
    image: { type: String }, // Field for storing image path
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);
