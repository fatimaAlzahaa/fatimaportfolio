// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./Config/db');

// Import routers
const userTypeRouter = require('./Routers/userTypeRouter');
const userRouter = require('./Routers/userRouter');
const projectRouter = require('./Routers/projectRouter');
const serviceRoutes = require('./Routers/serviceRouter');
const aboutRoutes = require('./Routers/aboutRoutes');
const contactRoutes = require('./Routers/contact.routes');
const authRoutes = require('./Utili/auth'); // Assuming './auth' exists

const app = express();
const port = 3000;

// Connect to the database
connectDB();

// Middleware
app.use(bodyParser.json());
// app.use(cors({
//     origin: 'http://localhost:4200',
//     methods: ['GET', 'POST'],
//     credentials: true
// }));
app.use(cors());
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/usertype', userTypeRouter);
app.use('/user', userRouter);
app.use('/projects', projectRouter);
app.use('/api/about', aboutRoutes);
app.use('/services', serviceRoutes);
app.use('/api', contactRoutes);
// app.use('/auth' , authRoutes); // Assuming this routes module handles its own path prefix

// Start the server
app.listen(port, () => console.log(`Server started at port ${port}`));
