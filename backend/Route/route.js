// Route/route.js
const express = require('express');
const { home, signup, signin, verifyOtp } = require('../controller/userController.js');

const route = express.Router();

route.get('/', home);
route.post('/user', signup);
route.post('/signgin', signin);
route.post('/verify-otp', verifyOtp);

module.exports = route;