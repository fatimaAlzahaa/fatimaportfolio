const Services = require('../Models/sevices');
const fs = require('fs');
const path = require('path');

// Create Service
exports.createService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const icon = req.file ? req.file.filename : null;

    const newService = new Services({
      title,
      description,
      icon
    });

    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Services.find();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a Single Service
exports.getServiceById = async (req, res) => {
  try {
    const service = await Services.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.status(200).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Service
exports.updateService = async (req, res) => {
  try {
    const service = await Services.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    const { title, description } = req.body;
    const icon = req.file ? req.file.filename : service.icon;

    if (req.file && service.icon) {
      // Delete the old icon if a new one is uploaded
      const iconPath = path.join(__dirname, '../uploads/icons/', service.icon);
      if (fs.existsSync(iconPath)) fs.unlinkSync(iconPath);
    }

    service.title = title;
    service.description = description;
    service.icon = icon;

    await service.save();
    res.status(200).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Service
exports.deleteService = async (req, res) => {
  try {
    const service = await Services.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    if (service.icon) {
      // Delete the icon file if it exists
      const iconPath = path.join(__dirname, '../uploads/icons/', service.icon);
      if (fs.existsSync(iconPath)) fs.unlinkSync(iconPath);
    }

    await service.delete();
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
