const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword } = require('../controllers/userController');
const router = express.Router();

router.route('/register').post(registerUser);//registerUser
router.route('/login').post(loginUser);//loginUser
router.route('/password/forgot').post(forgotPassword);//forgotPassword 
router.route('/password/reset/:token').put(resetPassword);//resetPassword 
router.route('/logout').get(logout);//logout

module.exports = router;//exporting router