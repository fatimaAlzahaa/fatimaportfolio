const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServicesSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String } // This will store the file path of the uploaded image
});

module.exports = mongoose.model('Services', ServicesSchema);
