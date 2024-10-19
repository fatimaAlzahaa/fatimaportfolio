const express = require('express');
const router = express.Router();
const servicesController = require('../Controllers/servicesController');
const upload = require('../Config/multer');

// Routes for CRUD operations
router.post('/create', upload.single('icon'), servicesController.createService);
router.get('/', servicesController.getAllServices);
router.get('/:id', servicesController.getServiceById);
router.put('/update/:id', upload.single('icon'), servicesController.updateService);
router.delete('/delete/:id', servicesController.deleteService);

module.exports = router;
