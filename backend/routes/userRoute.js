const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.route('/register').post(registerUser);//registerUser
router.route('/login').post(loginUser);//loginUser
router.route('/password/forgot').post(forgotPassword);//forgotPassword 
router.route('/password/reset/:token').put(resetPassword);//resetPassword 
router.route('/logout').get(logout);//logout
router.route('/me').get(isAuthenticatedUser, getUserDetails);//getUserProfile
router.route('/password/update').put(isAuthenticatedUser, updatePassword);//updatePassword
router.route('/me/update').put(isAuthenticatedUser, updateProfile);//updateProfile


router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), getAllUsers);//get all users info
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getSingleUser)//get single user info
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUserRole)//update user role
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);//delete user

module.exports = router;//exporting router