const express = require('express');
const userController = require('../Controllers/userController');
const sendResetEmail = require('../utils/mailer'); 
const router = express.Router();
router.post('/register', userController.registerUser);
// router.post('/user-login',userController.loginUser);
router.post('/register-countries', userController.  registerCountries);
router.post('/register-degree', userController.registerDegree);
router.post('/register-majors', userController.registerMajors);
router.post('/register-proficiency-exam', userController.registerProficiencyExam);
router.post('/register-academic-test', userController.registerAcademicTest);
router.post('/sendotp', userController.sendOTP);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password/:token', userController.resetPassword);
router.post('/verifyotp',userController.verifyOTP);
router.post('/savedetails', userController.saveUserDetails)
router.get('/profile/:email', userController.getUserDetails);
router.put('/update/:user_id', userController.updateUserDetails);
module.exports = router;
