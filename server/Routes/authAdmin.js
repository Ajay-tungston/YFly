const express = require('express');
const { signup, login, getAllUsers, getUserById, deleteAllUsers, deleteUserById, editUserById } = require('../Controllers/adminController');
const { verifyToken } = require('../Middlewares/authMiddleware'); // Assuming middleware is used for authentication
const router = express.Router();

// Admin routes
router.post('/signup', signup);
router.post('/login', login); 
router.get('/users', verifyToken, getAllUsers); // Get all users
router.get('/users/:id', verifyToken, getUserById); // Get user by ID
router.delete('/users', verifyToken, deleteAllUsers); // Delete all users
router.delete('/users/:id', verifyToken, deleteUserById); // Delete user by ID
router.put('/users/:id', verifyToken, editUserById); // Edit user by ID

module.exports = router;
