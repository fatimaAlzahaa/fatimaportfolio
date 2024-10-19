const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');



const secret_key = process.env.JWT_SECRET || "^U%+6X|iZD2wk*$[Bsr:5IFy[FMC.9T]l-F.GTG;rOdZ]$=0o?lO:F&I9;U/sJh";


exports.signIn = (data) => {
  return token = jwt.sign(
      data , secret_key , { expiresIn: '1h' }
  )
}

exports.authMiddleware = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Access denied, no token provided' });
        }

        const verified = jwt.verify(token, secret_key);
        req.user = verified;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token has expired, please log in again' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token, access denied' });
        }
        return res.status(500).json({ error: err.message });
    }
};
// // Authentication route
// router.post('/api/authenticate', async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });
//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.status(200).json({ message: 'Authentication successful', user });
//   } else {
//     res.status(401).json({ message: 'Invalid username or password' });
//   }
// });


// module.exports = router;
