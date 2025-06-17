
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, match: /.+\@.+\..+/ },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

module.exports = mongoose.model('Admin', adminSchema);
