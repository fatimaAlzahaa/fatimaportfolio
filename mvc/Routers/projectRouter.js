const express = require('express');
const router = express.Router();
const projectController = require('../Controllers/projectController');
const upload = require('../Config/multer');


router.post('/', upload.single('image'), projectController.createProject);
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.put('/:id', upload.single('image'), projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
