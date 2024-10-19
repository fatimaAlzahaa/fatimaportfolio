// controllers/contact.controller.js
const Contact = require('../Models/contact');

exports.submitContactForm = (req, res) => {
  const { name, email, message } = req.body;

  const newContact = new Contact({ name, email, message });

  newContact.save()
    .then(() => res.status(201).json({ message: 'Contact form submitted successfully!' }))
    .catch(err => res.status(500).json({ error: err.message }));
};
