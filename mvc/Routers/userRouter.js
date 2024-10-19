const express = require('express');
const router = express.Router();
const userController=require('../Controllers/userController');
const auth = require('../Utili/auth');

router.post('/',userController.addNewUser);
// router.get('/',auth.authMiddleware,userController.getUsers);
router.get('/',userController.getUsers);
router.post('/login',userController.login);
module.exports= router;
