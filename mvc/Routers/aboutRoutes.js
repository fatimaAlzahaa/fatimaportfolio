const express = require('express');
const router = express.Router();
const aboutController = require('../Controllers/aboutcontroller');

router.post('/', aboutController.createAbout);
router.get('/', aboutController.getAbout);
router.put('/:id', aboutController.updateAbout);
router.delete('/:id', aboutController.deleteAbout);

module.exports = router;
