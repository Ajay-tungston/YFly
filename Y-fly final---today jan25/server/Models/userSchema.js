const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true }, // Changed to ObjectId
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"] 
  },
  phone_number: { 
    type: String, 
    required: true, 
//     match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"]
 },

  password: { type: String, required: true },
  firstLogin:{type:Boolean, default: true},
  countries: [{ type: String }],
  degree: { type: String, enum: ["Bachelors", "Masters", "MBA"], required: false },
  education_details: {
    education_level: { type: String, required: false },
    percentage: { type: Number, required: false },
    board: { type: String, required: false },
    scores: { type: Number, required: false },
  },
  work_experience: {
    has_experience: { type: Boolean, required: false },
    months_of_experience: { type: Number, required: false },
  },
  majors: [{ type: String }],
  proficiency_exam: {
    exam_name: { type: String, enum: ["TOEFL", "IELTS", "PTE", "Haven’t taken"], required: false },
    score: { type: Number, required: false },
  },
  academic_test: {
    test_name: { type: String, enum: ["GRE", "GMAT", "Haven’t taken"], required: false },
    verbal_score: { type: Number, required: false },
    quant_score: { type: Number, required: false },
  },
  appliedCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
  }]
});

module.exports = mongoose.model("User", userSchema);
