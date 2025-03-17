
const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  scholarship_name: { type: String,  required: true, trim: true },
  types_of_scholarship: {  type: String,  enum: ['Merit Based', 'Need Based'],  required: true },
  country: {  type: String,  enum: ['USA', 'Canada', 'United Kingdom', 'Ireland', 'New Zealand', 'Australia', 'Germany'],  required: true },
  course_level: {  type: String,  enum: ['Masters', 'MBA', 'Bachelors'],  required: true },
  area_of_study: {  type: String,  required: true,  trim: true },
  scholarship_amount: {  type: String,  enum: ['Amount1', 'Amount2', 'Amount3'],  required: true },
  scholarship_deadline: { type: Date, required: true },
  overview: {  type: String,  required: true,  trim: true },
  eligibility_criteria: { type: String, required: true,  trim: true },
  application_process: {  type: String,  required: true,  trim: true },
  testRequirements: [
    {
        test_name: { type: String, required: true, trim: true },
        overall_score: { type: String, required: true, trim: true },
    },
],

  
  student_citizenship: {  type: String,  required: true,  trim: true },
  specialRestrictions: [{ type: String, trim: true }],

  scholarship_applicability: {  type: String,  enum: ['Non-college specific scholarships', 'College specific scholarships'],  required: true },
  brochure: { 
    data: Buffer, 
    contentType: String 
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Scholarship', scholarshipSchema);
