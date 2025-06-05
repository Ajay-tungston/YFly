const mongoose = require("mongoose");

const universitySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      // required: true,
      unique: true, 
      trim: true,
    },
    university_name: { type: String, required: true, trim: true, unique: true  },
    university_ranking: { type: Number, required: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    university_logo: { data: Buffer, contentType: String }, 
    university_type: {
      type: String,
      enum: ["Public", "Private"],
      required: true,
    },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }] // Linking Courses
  },
  { timestamps: true }
);

module.exports = mongoose.model("University", universitySchema);
