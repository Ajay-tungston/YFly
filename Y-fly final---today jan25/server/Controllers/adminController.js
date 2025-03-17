
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../Models/adminSchema');

// Admin signup
exports.signup = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // Validate input
    if (!email || !name || !password) { 
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new admin
    const newAdmin = new Admin({ email, name, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Admin login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7h' });

    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


// 1. Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password from the results
    res.status(200).json({ message: 'All users fetched successfully', users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// 2. Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, '-password'); // Exclude password from the result
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User fetched successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

// 3. Delete all users
exports.deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany();
    res.status(200).json({ message: 'All users deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting users', error: error.message });
  }
};

// 4. Delete a user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

// 5. Edit a user by ID
exports.editUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (updates.password) {
      return res.status(400).json({ message: 'Password cannot be updated via this route' });
    }
    const updatedUser = await User.findByIdAndUpdate(id, { $set: updates }, { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};
