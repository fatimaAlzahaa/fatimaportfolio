
const About = require('../Models/about.model');


exports.createAbout = async (req, res) => {
  try {
    const about = new About(req.body);
    const savedAbout = await about.save();
    res.status(201).json(savedAbout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.status(200).json(about);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateAbout = async (req, res) => {
  try {
    const updatedAbout = await About.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAbout) return res.status(404).json({ message: 'About not found' });
    res.status(200).json(updatedAbout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.deleteAbout = async (req, res) => {
  try {
    const deletedAbout = await About.findByIdAndDelete(req.params.id);
    if (!deletedAbout) return res.status(404).json({ message: 'About not found' });
    res.status(200).json({ message: 'About deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
