const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    course_level: {
      type: String,
      enum: ["Masters", "MBA", "Bachelors"],
      required: true,
    },
    discipline: { type: String, required: true, trim: true },
    area_of_study: { type: String, required: true, trim: true },
    country: {
      type: String,
      enum: [
        "USA",
        "Canada",
        "United Kingdom",
        "Ireland",
        "New Zealand",
        "Australia",
        "Germany",
      ],
      required: true,
    },
    // university_ranking: { type: Number, required: true },
    // university_name: { type: String, required: true, trim: true },
    university_name: { type: mongoose.Schema.Types.ObjectId, ref: "University" },
    // university_logo: { data: Buffer, contentType: String },
    course_duration: {
      type: String,
      enum: [
        "Less than a year",
        "1 year",
        "2 years",
        "3 years",
        "4 years",
        "5 years",
        "6 years",
      ],
      required: true,
    },
    application_deadline: { type: Date, required: true },
    overview: { type: String, required: true, trim: true },
    intakes: [  
      {
        month: { type: String, required: true },
        year: { type: Number, required: true },
      },
    ],
    testRequirements: [
      {
        testRequirementName: { type: String, required: true },
        overallScore: { type: String, required: true },
      },
    ],
    eligibilityRequirements: [
      {
        requirementType: { type: String, required: true },
        gpaRange: { type: String, required: false },
        backlogRange: { type: String, required: false },
        workExperience: { type: String, required: false },
        entranceExam: { type: String, required: false },
      },
    ],
    application_requirements: [
      {
        requirement: { type: String, required: true },
        isRequired: { type: Boolean, required: true },
      },
    ],
    job_roles: [{ type: String, required: true }],
    top_recruiters: [
      {
        recruiters_name: { type: String, required: true },
        recruiters_logo: { data: Buffer, contentType: String },
      },
    ],
    scholarship_applicable: [{ type: String, required: true }],
    tution_fee: {
      type: Number,
      required: true, // Example max value
    },
    funding_options: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Course", courseSchema);
