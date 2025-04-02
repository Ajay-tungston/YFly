const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  intake: {
    year: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
  },
  documents: {
    identityDocuments: {
      passportFront: {
        type: String,  // Single file path for passport front
      },
      passportBack: {
        type: String,  // Single file path for passport back
      },
      cvResume: {
        type: String,  // Single file path for CV/Resume
      },
    },
    educationalDocuments: [{
      type: String, // File paths for educational documents
    }],
    workExperienceDocuments: [{
      type: String, // File paths for work experience documents
    }],
    englishProficiencyDocuments: [{
      type: String, // File paths for English proficiency documents
    }],
    extracurricularDocuments: [{
      type: String, // File paths for extracurricular documents
    }],
    recommendationDocuments: [{
      type: String, // File paths for recommendation documents
    }],
    otherDocuments: [{
      type: String, // File paths for other documents
    }],
  },
});

module.exports = mongoose.model("Application", applicationSchema);

