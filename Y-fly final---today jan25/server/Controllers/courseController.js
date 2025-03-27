const Course = require("../Models/courseSchema");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { resetPassword } = require("./userController");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "/uploads");
  },

  filename: (req, file, cb) => {
    // Create a unique file name
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });
// Utility functions for validation
const validateArrayField = (field, errorMessage) => {
  if (!Array.isArray(field)) {
    throw new Error(errorMessage);
  }
  return field;
};

// Create a new course with updated validation
exports.createCourse = async (req, res) => {
  try {
    // console.log('Raw request fields:', req.fields);
    // console.log('Raw request files:', req.files);
    const {
      course_level,
      discipline,
      area_of_study,
      country,
      university_ranking,
      university_name,
      course_duration,
      application_deadline,
      overview,
      tution_fee,
    } = req.fields;
   console.log(req.files);
   console.log(req.fields);
    const university_logo = req.files ? req.files.university_logo : null;
    const recruiters_logo= req.files? req.files.recruiters_logo : null;
    // Validate required fields
    if (
      !course_level ||
      !discipline ||
      !area_of_study ||
      !country ||
      !university_ranking ||
      !university_name ||
      !course_duration ||
      !application_deadline ||
      !overview ||
      !tution_fee
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided." });
    }

    console.log("here 2: ", req.fields.testRequirements);

    // Inline formatting functions
    const formatIntakes = (intakesArray) => {
      return intakesArray.map((intake) => {
        if (!intake.month || !intake.year) {
          throw new Error("Each intake must have a month and year.");
        }
        return {
          month: intake.month.trim(),
          year: intake.year.trim(),
        };
      });
    };

    const formatTestRequirements = (testRequirementsArray) => {
      return testRequirementsArray.map((test) => {
        if (!test.testRequirementName || !test.overallScore) {
          throw new Error(
            "Each test requirement must have a testRequirement and overallScore."
          );
        }
        return {
          test_name: test.testRequirementName.trim(),
          overallScore: test.overallScore.trim(),
        };
      });
    };

    const formatEligibilityRequirements = (eligibilityArray) => {
      return eligibilityArray.map((req) => {
        if (!req.criteria) {
          throw new Error("Each eligibility requirement must have a criteria.");
        }
        return {
          criteria: req.criteria.trim(),
        };
      });
    };

    const formatApplicationRequirements = (applicationArray) => {
      return applicationArray.map((req) => {
        if (!req.requirement) {
          throw new Error(
            "Each application requirement must have a requirement."
          );
        }
        return {
          requirement: req.requirement.trim(),
        };
      });
    };

    console.log("here 3: ", req.fields.testRequirements);

    // Parse and validate JSON fields
    const safeParseJson = (field, fieldName) => {
      try {
        console.log("parsing: ", field, " ", fieldName);
        const parsed = field ? JSON.parse(field) : [];
        if (!Array.isArray(parsed)) {
          throw new Error(`${fieldName} must be an array.`);
        }
        console.log("parsed: ", field, " ", parsed);
        return parsed;
      } catch (error) {
        throw new Error(`Invalid JSON in ${fieldName}: ${error.message}`);
      }
    };

    let intakes,
      testRequirements,
      eligibilityRequirements,
      application_requirements,
      top_recruiters,
      scholarship_applicable,
      job_roles,
      funding_options;

    try {
      // Usage in createCourse:
      intakes = safeParseJson(req.fields.intakes, "intakes");
      // let testRequirements_format = formatTestRequirements(req.fields.testRequirements)

      console.log("here 4: ", req.fields.testRequirements);
      testRequirements = safeParseJson(
        req.fields.testRequirements,
        "testRequirements"
      );
      eligibilityRequirements = safeParseJson(
        req.fields.eligibilityRequirements,
        "eligibilityRequirements"
      );
      application_requirements = safeParseJson(
        req.fields.application_requirements,
        "application_requirements"
      );
      top_recruiters = safeParseJson(
        req.fields.top_recruiters,
        "top_recruiters"
      );
      scholarship_applicable = safeParseJson(
        req.fields.scholarship_applicable,
        "scholarship_applicable"
      ).filter((scholarship) => scholarship.trim() !== "");
      job_roles = safeParseJson(req.fields.job_roles, "job_roles");
      // Sanitize funding options to remove empty strings
      funding_options = safeParseJson(
        req.fields.funding_options,
        "funding_options"
      ).filter((option) => option.trim() !== "");
    } catch (error) {
      console.error("JSON Parsing or Validation Error:", error.message);
      return res.status(400).json({ error: error.message });
    }

    // Validate and process university logo
    let universityLogoData;
    if (university_logo) {
      if (!["image/jpeg", "image/png"].includes(university_logo.type)) {
        throw new Error("University logo must be a JPEG or PNG image.");
      }
      if (university_logo.size > 5000000) {
        throw new Error("University logo size must be less than 5MB.");
      }
      if (!fs.existsSync(university_logo.path)) {
        throw new Error("Uploaded university logo file does not exist.");
      }
      universityLogoData = {
        data: fs.readFileSync(university_logo.path),
        contentType: university_logo.type,
      };
      fs.unlinkSync(university_logo.path); // Clean up file after processing
    }

    let recruitersLogoData;
    if (recruiters_logo) {
      if (!["image/jpeg", "image/png"].includes(recruiters_logo.type)) {
        throw new Error("Recruiters logo must be a JPEG or PNG image.");
      }
      if (recruiters_logo.size > 5000000) {
        throw new Error("Recruiters logo size must be less than 5MB.");
      }
      if (!fs.existsSync(recruiters_logo.path)) {
        throw new Error("Uploaded recruiters logo file does not exist.");
      }
      recruitersLogoData = {
        data: fs.readFileSync(recruiters_logo.path),
        contentType: recruiters_logo.type,
      };
      fs.unlinkSync(recruiters_logo.path); // Clean up file after processing
    }
    // Date validation for application deadline
    const deadlineDate = new Date(application_deadline);
    if (isNaN(deadlineDate.getTime()) || deadlineDate < new Date()) {
      throw new Error("Application deadline must be a valid future date.");
    }

    // Create new course
    const course = new Course({
      course_level,
      discipline,
      area_of_study,
      country,
      university_ranking,
      university_name,
      course_duration,
      application_deadline: deadlineDate,
      overview,
      tution_fee,
      university_logo: universityLogoData,
      intakes,
      testRequirements,
      eligibilityRequirements,
      application_requirements,
      top_recruiters,
      scholarship_applicable,
      job_roles,
      funding_options,
      recruiters_logo: recruitersLogoData,
    });

    await course.save();
    res
      .status(201)
      .json({ success: true, message: "Course created successfully.", course });
  } catch (error) {
    console.error("Error creating course:", error.message);
    res.status(500).json({ error: error.message || "Internal server error." });
  }
};

// Get all courses
// Example in your controller
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find(); 
    console.log("Top Recruiters:", req.fields.top_recruiters);
   // Assume each course has university_logo_path
    const modifiedCourses = courses.map(course => {
      course = course.toObject(); // Convert Mongoose document to plain object
      if (course.university_logo_path) {
        // Construct the URL to the image (adjust the base URL as needed)
        course.university_logo_url = `http://localhost:5000/uploads/${course.university_logo_path}`;
      }
      return course;
    });
    res.status(200).json({ success: true, courses: modifiedCourses });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error)
  }
  
};


// Get a single course by ID
exports.getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    }
    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error)
  }
};

// update course by ID
exports.updateCourse = async (req, res) => {
  try {
    console.log("Raw request fields:", req.fields);
    console.log("Raw request files:", req.files);

    const {
      course_level,
      discipline,
      area_of_study,
      country,
      university_ranking,
      university_name,
      course_duration,
      application_deadline,
      overview,
      tution_fee,
    } = req.fields;

    const university_logo = req.files ? req.files.university_logo : null;

    // Helper function to parse JSON fields
    const safeParseJson = (field, fieldName) => {
      try {
        const parsed = field ? JSON.parse(field) : [];
        if (!Array.isArray(parsed)) {
          throw new Error(`${fieldName} must be an array.`);
        }
        return parsed;
      } catch (error) {
        throw new Error(`Invalid JSON in ${fieldName}: ${error.message}`);
      }
    };

    // Parse and validate JSON fields
    let intakesArray,
      testRequirementsArray,
      eligibilityRequirementsArray,
      applicationRequirementsArray,
      topRecruitersArray,
      scholarshipApplicableArray,
      jobRolesArray,
      fundingOptionsArray;

    try {
      intakesArray = safeParseJson(req.fields.intakes, "intakes");
      testRequirementsArray = safeParseJson(
        req.fields.testRequirements,
        "testRequirements"
      );
      eligibilityRequirementsArray = safeParseJson(
        req.fields.eligibilityRequirements,
        "eligibilityRequirements"
      );
      applicationRequirementsArray = safeParseJson(
        req.fields.application_requirements,
        "application_requirements"
      );
      topRecruitersArray = safeParseJson(
        req.fields.top_recruiters,
        "top_recruiters"
      );
      scholarshipApplicableArray = safeParseJson(
        req.fields.scholarship_applicable,
        "scholarship_applicable"
      );
      jobRolesArray = safeParseJson(req.fields.job_roles, "job_roles");
      fundingOptionsArray = safeParseJson(
        req.fields.funding_options,
        "funding_options"
      );
    } catch (error) {
      console.error("JSON Parsing Error:", error.message);
      return res.status(400).json({ error: error.message });
    }

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    }

    // Update fields if provided
    if (course_level) course.course_level = course_level;
    if (discipline) course.discipline = discipline;
    if (area_of_study) course.area_of_study = area_of_study;
    if (country) course.country = country;
    if (university_ranking)
      course.university_ranking = parseInt(university_ranking, 10);
    if (university_name) course.university_name = university_name;
    if (course_duration) course.course_duration = course_duration;
    if (application_deadline)
      course.application_deadline = new Date(application_deadline);
    if (overview) course.overview = overview;
    if (tution_fee) course.tution_fee = parseFloat(tution_fee);

    // Handle arrays
    if (intakesArray.length) {
      course.intakes = intakesArray.map((intake) => {
        if (
          typeof intake.month !== "string" ||
          typeof intake.year !== "number"
        ) {
          throw new Error(
            "Each intake must have a valid month (string) and year (number)."
          );
        }
        return { month: intake.month.trim(), year: intake.year }; // year is a number
      });
    }

    if (testRequirementsArray.length) {
      course.testRequirements = testRequirementsArray.map((test) => {
        if (!test.testRequirementName || !test.overallScore) {
          throw new Error(
            "Each test requirement must have a testRequirementName and overallScore."
          );
        }
        return {
          testRequirementName: test.testRequirementName.trim(),
          overallScore: test.overallScore.trim(),
        };
      });
    }

    if (eligibilityRequirementsArray.length) {
      course.eligibilityRequirements = eligibilityRequirementsArray.map(
        (req) => {
          if (!req.requirementType) {
            throw new Error(
              "Each eligibility requirement must have a requirementType."
            );
          }
          return {
            requirementType: req.requirementType.trim(),
            gpaRange: req.gpaRange?.trim() || null,
            backlogRange: req.backlogRange?.trim() || null,
            workExperience: req.workExperience?.trim() || null,
            entranceExam: req.entranceExam?.trim() || null,
          };
        }
      );
    }

    if (applicationRequirementsArray.length) {
      course.application_requirements = applicationRequirementsArray.map(
        (req) => {
          if (!req.requirement) {
            throw new Error(
              "Each application requirement must have a requirement."
            );
          }
          return {
            requirement: req.requirement.trim(),
            isRequired: req.isRequired,
          };
        }
      );
    }

    if (topRecruitersArray.length) {
      course.top_recruiters = topRecruitersArray.map((recruiter) => {
        if (!recruiter.recruiters_name) {
          throw new Error("Each recruiter must have a name.");
        }
        return {
          recruiters_name: recruiter.recruiters_name.trim(),
          logo: recruiter.logo || null,
        };
      });
    }

    if (scholarshipApplicableArray.length)
      course.scholarship_applicable = scholarshipApplicableArray;
    if (jobRolesArray.length)
      course.job_roles = jobRolesArray.map((role) => role.trim());
    if (fundingOptionsArray.length)
      course.funding_options = fundingOptionsArray.map((option) =>
        option.trim()
      );

    // Update university logo if provided
    if (university_logo) {
      if (!["image/jpeg", "image/png"].includes(university_logo.type)) {
        throw new Error("University logo must be a JPEG or PNG image.");
      }
      if (university_logo.size > 5000000) {
        throw new Error("University logo size must be less than 5MB.");
      }
      if (!fs.existsSync(university_logo.path)) {
        throw new Error("Uploaded university logo file does not exist.");
      }
      course.university_logo = {
        data: fs.readFileSync(university_logo.path),
        contentType: university_logo.type,
      };
      fs.unlinkSync(university_logo.path); // Clean up the file
    }

    await course.save();
    res
      .status(200)
      .json({ success: true, message: "Course updated successfully.", course });
  } catch (error) {
    console.error("Error updating course:", error.stack || error.message);
    res.status(500).json({ error: error.message || "Internal server error." });
  }
};

exports.filterSearch = async (req, res) => {
  try {
    // Destructure query parameters
    const {
      country,
      intake,
      area_of_study,
      scholarship_applicable,
      course_duration,
      backlogs,
      tuition_fee_min,
      tuition_fee_max,
      course_level,
      testRequirementName,
      university_name,
      university_ranking,
      searchTerm,
      disciplinesearch,
      testOverallScore,
      page, 
      limit,
      program_level,    
      program_name,    
      course_title,     
    } = req.query;
  
    let filter = {};
 
    // 1) Country
    if (country) filter.country = country;

    // 2) Course Level
    if (course_level) filter.course_level = course_level;

    // 3) Course Duration (unchanged)
    if (course_duration) {
      let durationValue = course_duration.trim();
      if (!/year/i.test(durationValue)) {
        durationValue += " year";
      }
      const durationRegex = new RegExp(`^${durationValue}\\s*(s)?$`, "i");
      filter.course_duration = { $regex: durationRegex };
    }

    // 4) Area of Study
    if (area_of_study) {
      filter.area_of_study = {
        $regex: new RegExp(`^${area_of_study}$`, "i"),
      };
    }

    // 5) Discipline
    // if (discipline) {
    //   filter.discipline = {
    //     $regex: new RegExp(`^${discipline}$`, "i"),
    //   };
    // }
  
    // 6) Scholarship
    if (scholarship_applicable) {
      filter.scholarship_applicable = {
        $in: [new RegExp(`^${scholarship_applicable}$`, "i")],
      };
    }

    // 7) Tuition Fee Range
    if (tuition_fee_min || tuition_fee_max) {
      filter.tution_fee = {};
      if (tuition_fee_min) filter.tution_fee.$gte = Number(tuition_fee_min);
      if (tuition_fee_max) filter.tution_fee.$lte = Number(tuition_fee_max);
    }

    // 8) Intake (month-year)
    if (intake) {
      const parts = intake.split("-");
      const year = parts.length === 2 ? parts[1] : intake;
      filter.intakes = { $elemMatch: { year: Number(year) } };
    }

    // 9) University Ranking
    if (university_ranking) {
      const rankingNum = Number(university_ranking);
      if (!isNaN(rankingNum)) {
        filter.university_ranking = rankingNum;
      }
    }

    // 10) Backlogs (eligibilityRequirements)
    if (backlogs) {
      filter.eligibilityRequirements = {
        $elemMatch: {
          backlogRange: { $regex: new RegExp(`^${backlogs}$`, "i") },
        },
      };
    }

    // 11) Test Requirements
    if (testRequirementName || testOverallScore) {
      let testReqCondition = {};
      if (testRequirementName) {
        testReqCondition.testRequirementName = {
          $regex: new RegExp(`^${testRequirementName}$`, "i"),
        };
      }
      if (testOverallScore) {
        testReqCondition.overallScore = testOverallScore;
      }
      filter.testRequirements = { $elemMatch: testReqCondition };
    }

    // 12) University Name
    if (university_name) {
      filter.university_name = {
        $regex: new RegExp(`^${university_name}$`, "i"),
      };
    }

    // 13) Search Term (simple example searching only by university_name)
    if (searchTerm) {
      filter.$or = [
        { course_title: { $regex: searchTerm, $options: "i" } },
        { university_name: { $regex: searchTerm, $options: "i" } },
        
      ];
    }
    if (disciplinesearch) {
      filter.discipline = { $regex: disciplinesearch, $options: "i" };
    }
    

    // --- NEW FIELDS from screenshot / changes ---
    // program_level
    if (program_level) {
      filter.program_level = {
        $regex: new RegExp(`^${program_level}$`, "i"),
      };
    }

    // program_name
    if (program_name) {
      filter.program_name = {
        $regex: new RegExp(`^${program_name}$`, "i"),
      };
    }

    // course_title (if you want direct searching on the combined field)
    if (course_title) {
      filter.course_title = {
        $regex: new RegExp(`${course_title}`, "i"),
      };
    }

    
   
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    const totalCount = await Course.countDocuments(filter);

   
    const courses = await Course.find(filter)
      .skip(skip)
      .limit(limitNum);

    // Modify courses (e.g., add university_logo_url)
    const modifiedCourses = courses.map((course) => {
      course = course.toObject();
      if (course.university_logo_path) {
        course.university_logo_url = `http://localhost:5000/uploads/${course.university_logo_path}`;
      }
      return course;
    });

    res.status(200).json({
      page: pageNum,
      limit: limitNum,
      totalCount,
      results: modifiedCourses,
    });
  } catch (error) {
    console.error("Error filtering courses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




// Get values for dropdowns

exports.getValues = async (req, res) => {
  try {
    const courseLevels = await Course.distinct("course_level");
    const disciplines = await Course.distinct("discipline");
    const areasOfStudy = await Course.distinct("area_of_study");
    const countries = await Course.distinct("country");
    const courseTitle=await Course.distinct("course_title");
    const courseDurations = await Course.distinct("course_duration");
    const testRequirements = await Course.distinct("testRequirements.testRequirementName");
    const eligibilityRequirements = await Course.distinct("eligibilityRequirements.backlogRange");
    const scholarships = await Course.distinct("scholarship_applicable");
    const universityNames = await Course.distinct("university_name");
    const universityRankings = await Course.distinct("university_ranking");
    const intakeYears = await Course.distinct("intakes.year");
    const tuitionFees = await Course.distinct("tution_fee" )
    
    
    return res.status(200).json({
      success: true,
      data: {
        courseLevels,
        disciplines,
        areasOfStudy,
        courseTitle,
        countries,
        courseDurations,
        testRequirements,
        eligibilityRequirements,
        scholarships,
        universityNames,
        universityRankings,
        intakeYears,
        tuitionFees
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// Delete a course by ID
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    }
    res
      .status(200)
      .json({ success: true, message: "Course deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
