// Express App Setup
console.log('✅ app.js loaded');

const express = require('express');
const cors = require('cors');

const healthRoute = require('./health');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/health', healthRoute);
app.use('/api/auth', authRoutes); // Requirement says /api/auth
app.use('/api/users', userRoutes); // Requirement says /api/users

module.exports = app;