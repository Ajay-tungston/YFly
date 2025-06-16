const Course = require("../Models/courseSchema");
const fs = require("fs");
const University = require("../Models/University");
const path = require("path");
const xlsx = require("xlsx");
const { default: mongoose } = require("mongoose");

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
      // university_ranking,
      university_name,
      course_duration,
      application_deadline,
      overview,
      tution_fee,
    } = req.fields;
    console.log(req.fields, req.files);
    // const university_logo = req.files ? req.files.university_logo : null;

    // Validate required fields
    if (
      !course_level ||
      // !discipline ||
      !area_of_study ||
      !country ||
      // !university_ranking ||
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

    const university = await University.findOne({ university_name });
    if (!university) {
      return res.status(400).json({ error: "University not found." });
    }
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
      top_recruiters = top_recruiters.map((recruiter, index) => {
        // Assume the file is named recruiters_logo_0, recruiters_logo_1, etc.
        const fileKey = `recruiters_logo_${index}`;
        const file = req.files[fileKey];

        if (file) {
          // Validate file type and size if necessary
          if (!["image/jpeg", "image/png"].includes(file.type)) {
            throw new Error("Recruiters logo must be a JPEG or PNG image.");
          }
          if (file.size > 5000000) {
            // example 5MB limit
            throw new Error("Recruiters logo size must be less than 5MB.");
          }
          if (!fs.existsSync(file.path)) {
            throw new Error("Uploaded recruiters logo file does not exist.");
          }

          // Read file data
          const fileData = fs.readFileSync(file.path);
          // Optionally remove file after reading
          fs.unlinkSync(file.path);

          return {
            recruiters_name: recruiter.recruiters_name,
            recruiters_logo: {
              data: fileData,
              contentType: file.type,
            },
          };
        } else {
          return recruiter;
        }
      });

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
    // let universityLogoData;
    // if (university_logo) {
    //     if (!['image/jpeg', 'image/png'].includes(university_logo.type)) {
    //         throw new Error('University logo must be a JPEG or PNG image.');
    //     }
    //     if (university_logo.size > 5000000) {
    //         throw new Error('University logo size must be less than 5MB.');
    //     }
    //     if (!fs.existsSync(university_logo.path)) {
    //         throw new Error('Uploaded university logo file does not exist.');
    //     }
    //     universityLogoData = {
    //         data: fs.readFileSync(university_logo.path),
    //         contentType: university_logo.type,
    //     };
    //     fs.unlinkSync(university_logo.path); // Clean up file after processing
    // }

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
      // university_ranking,
      university_name: university._id,
      course_duration,
      application_deadline: deadlineDate,
      overview,
      tution_fee,
      // university_logo: universityLogoData,
      intakes,
      testRequirements,
      eligibilityRequirements,
      application_requirements,
      top_recruiters,
      scholarship_applicable,
      job_roles,
      funding_options,
    });

    await course.save();
    university.courses.push(course._id);
    await university.save();
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
    const courses = await Course.find().populate(
      "university_name",
      "university_name"
    );
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single course by ID
exports.getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "university_name",
      "university_name university_ranking"
    );
    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    }
    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
      //  university_ranking,
      university_name,
      course_duration,
      application_deadline,
      overview,
      tution_fee,
    } = req.fields;

    // const university_logo = req.files ? req.files.university_logo : null;

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

    const university = await University.findOne({ university_name });
    if (!university) {
      return res.status(400).json({ error: "University not found." });
    }

    // Update fields if provided
    if (course_level) course.course_level = course_level;
    if (discipline) course.discipline = discipline;
    if (area_of_study) course.area_of_study = area_of_study;
    if (country) course.country = country;
    // if (university_ranking) course.university_ranking = parseInt(university_ranking, 10);
    if (university_name) {
      const university = await University.findOne({ university_name });
      if (!university) {
        return res.status(400).json({ error: "University not found." });
      }
      course.university_name = university._id;
    }
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
            // gpaRange: req.gpaRange?.trim() || null,
            minGPA: req.minGPA || null,
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
    // if (university_logo) {
    //     if (!['image/jpeg', 'image/png'].includes(university_logo.type)) {
    //         throw new Error('University logo must be a JPEG or PNG image.');
    //     }
    //     if (university_logo.size > 5000000) {
    //         throw new Error('University logo size must be less than 5MB.');
    //     }
    //     if (!fs.existsSync(university_logo.path)) {
    //         throw new Error('Uploaded university logo file does not exist.');
    //     }
    //     course.university_logo = {
    //         data: fs.readFileSync(university_logo.path),
    //         contentType: university_logo.type,
    //     };
    //     fs.unlinkSync(university_logo.path); // Clean up the file
    // }

    await course.save();
    res
      .status(200)
      .json({ success: true, message: "Course updated successfully.", course });
  } catch (error) {
    console.error("Error updating course:", error.stack || error.message);
    res.status(500).json({ error: error.message || "Internal server error." });
  }
};

exports.getFilteredCourses = async (req, res) => {
  try {
    // Fetch all courses and populate the referenced fields from the University collection
    const courses = await Course.find()
      .populate({
        path: "university_name",
        select: "university_name university_logo university_rank", // Specify fields to fetch from University collection
      })
      .exec();

    // Send the fetched courses as a response
    res.status(200).json({
      success: true,
      message: "Courses retrieved successfully",
      data: courses,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching courses",
      error: error.message,
    });
  }
};

exports.filterCourses = async (req, res) => {
  try {
    // (Extract query parameters and build your filter object here...)
    let {
      page = 1,
      limit = 10,
      search = "",
      course_level,
      discipline, // if provided directly
      disciplineSearch, // alternate query parameter name from frontend
      area_of_study,
      country,
      university_name,
      course_duration,
      min_tuition_fee,
      max_tuition_fee,
      application_deadline,
      intakeYear, // can be either "2025" or "September-2025"
      program_level,
      program_name,

      backlog, // filter for eligibilityRequirements backlogRange
      testRequirementName, // filter for testRequirements name
      testOverallScore, // filter for testRequirements overall score
      course_title, // filter directly on course_title field
      sort: sortBy = "", // using "sort" from query string (frontend sends sort)
      scholarship_applicable, // optional: filter on scholarship_applicable field
    } = req.query;

    page = isNaN(page) || page < 1 ? 1 : parseInt(page);
    limit = isNaN(limit) || limit < 1 || limit > 100 ? 10 : parseInt(limit);

    // Build filter object dynamically
    const filter = {};

    // Keyword search: search in computed course_title and overview fields
    if (search) {
      filter.$or = [
        { course_title: { $regex: search, $options: "i" } },
        { overview: { $regex: search, $options: "i" } },
      ];
    }

    if (course_title) {
      filter.course_title = { $regex: course_title, $options: "i" };
    }
    if (course_level) {
      filter.course_level = { $regex: course_level, $options: "i" };
    }

    if (disciplineSearch || discipline) {
      filter.discipline = {
        $regex: disciplineSearch || discipline,
        $options: "i",
      };
    }
    if (area_of_study)
      filter.area_of_study = { $regex: area_of_study, $options: "i" };
    if (country) filter.country = country;

    if (university_name) {
      const uniId = await getUniversityIdByName(university_name);
      if (uniId) {
        filter.university_name = uniId;
      } else {
        filter.university_name = null;
      }
    }

    if (course_duration) filter.course_duration = course_duration;

    if (min_tuition_fee || max_tuition_fee) {
      filter.tution_fee = {};
      if (min_tuition_fee) filter.tution_fee.$gte = Number(min_tuition_fee);
      if (max_tuition_fee) filter.tution_fee.$lte = Number(max_tuition_fee);
    }

    if (application_deadline) {
      filter.application_deadline = { $lte: new Date(application_deadline) };
    }

    if (intakeYear) {
      if (intakeYear.includes("-")) {
        const [monthPart, yearPart] = intakeYear
          .split("-")
          .map((item) => item.trim());
        filter.intakes = {
          $elemMatch: {
            month: { $regex: `^${monthPart}`, $options: "i" },
            year: Number(yearPart),
          },
        };
      } else {
        filter["intakes.year"] = Number(intakeYear);
      }
    }

    if (program_level)
      filter.program_level = { $regex: program_level, $options: "i" };
    if (program_name)
      filter.program_name = { $regex: program_name, $options: "i" };

    if (scholarship_applicable) {
      filter.scholarship_applicable = {
        $regex: scholarship_applicable,
        $options: "i",
      };
    }

    if (backlog) {
      filter.eligibilityRequirements = {
        $elemMatch: {
          backlogRange: { $regex: backlog, $options: "i" },
        },
      };
    }

    if (testRequirementName || testOverallScore) {
      filter.testRequirements = { $elemMatch: {} };
      if (testRequirementName) {
        filter.testRequirements.$elemMatch.testRequirementName = {
          $regex: testRequirementName,
          $options: "i",
        };
      }
      if (testOverallScore) {
        filter.testRequirements.$elemMatch.overallScore = testOverallScore;
      }
    }

    // Define sorting options mapping
    const sortOptionsMap = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      deadline_asc: { application_deadline: 1 },
      deadline_desc: { application_deadline: -1 },
      tuition_asc: { tution_fee: 1 },
      tuition_desc: { tution_fee: -1 },
    };
    const sortOptions = sortOptionsMap[sortBy] || { createdAt: -1 };

    // Fetch filtered courses with pagination, sorting, and populate university details
    const courses = await Course.find(filter)
      .populate({
        path: "university_name",
        select: "university_name university_logo university_rank country",
      })
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    // Convert the university logo Buffer to base64 string for each course

    // Get total count for pagination
    const total = await Course.countDocuments(filter);

    res.status(200).json({
      success: true,
      message: "Filtered courses retrieved successfully",
      results: courses,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while filtering courses",
      error: error.message,
    });
  }
};

// Helper function to get University ID by name
const getUniversityIdByName = async (name) => {
  const university = await University.findOne({
    university_name: { $regex: name, $options: "i" },
  });
  return university ? university._id : null;
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

exports.bulkUploadCourses = async (req, res) => {
  try {
    const excelFile = req.files?.excel;
    const imageFiles = req.files?.images;

    if (!excelFile || !excelFile.path) {
      return res.status(400).json({ message: "Valid Excel file is required" });
    }

    // Read workbook and rows
    const workbook = xlsx.readFile(excelFile.path);
    const sheetName = workbook.SheetNames[0];
    const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Build imageMap: filename -> file object
    const imageMap = {};
    if (imageFiles) {
      if (Array.isArray(imageFiles)) {
        imageFiles.forEach(file => { imageMap[file.name] = file });
      } else if (imageFiles.name) {
        imageMap[imageFiles.name] = imageFiles;
      }
    }

    // Trackers
    const createdCourses = [];
    const updatedCourses = [];
    const errors = [];
    const usedImages = new Set();

    for (const row of rows) {
      try {
        const {
          id, course_level, discipline, area_of_study, country,
          university_name, course_duration, application_deadline,
          overview, 
          // intakeMonth, intakeYear,
          intakes,
          // testRequirementName, overallScore,
          testRequirements,
          // EligibilityRequirementType, EligibilityRequirementValue,
          eligibilityRequirements,
          // ApplicationRequirement, isRequired,
          application_requirements,
          job_roles,
          //  recruiters_name, recruiters_logo,
          top_recruiters,
          scholarship_applicable, tution_fee, funding_options,
          program_level, program_name
        } = row;

        // Validate required
        if (!id || !course_level || !discipline || !area_of_study || !country || !university_name) {
          errors.push(`Missing required fields for ID: ${id || 'N/A'}`);
          continue;
        }

        // Verify university
        const university = await University.findOne({ id: university_name });
        if (!university) {
          errors.push(`University not found for ID: ${university_name} in course ID: ${id}`);
          continue;
        }


        let parsedIntakes = [], parsedTestReqs = [], parsedEligibility = [], parsedAppReqs = [], parsedRecruiters = [];

        try {
          parsedIntakes = intakes ? JSON.parse(intakes) : [];
        } catch { errors.push(`Invalid JSON in intakes for ID: ${id}`); }

        try {
          parsedTestReqs = testRequirements ? JSON.parse(testRequirements) : [];
        } catch { errors.push(`Invalid JSON in testRequirements for ID: ${id}`); }

        try {
          parsedEligibility = eligibilityRequirements ? JSON.parse(eligibilityRequirements) : [];
        } catch { errors.push(`Invalid JSON in eligibilityRequirements for ID: ${id}`); }

        try {
          parsedAppReqs = application_requirements ? JSON.parse(application_requirements) : [];
        } catch { errors.push(`Invalid JSON in application_requirements for ID: ${id}`); }

        try {
          const raw_recruiters = top_recruiters ? JSON.parse(top_recruiters) : [];
          for (const recruiter of raw_recruiters) {
            const { recruiters_name, recruiters_logo } = recruiter;
            const file = imageMap[recruiters_logo];
            if (!file || !fs.existsSync(file.path)) {
              errors.push(`Recruiter logo missing or invalid ('${recruiters_logo}') for course ID: ${id}`);
              continue;
            }
            const logoData = {
              data: fs.readFileSync(file.path),
              contentType: file.type,
            };
            parsedRecruiters.push({
              recruiters_name,
              recruiters_logo: logoData,
            });
            usedImages.add(recruiters_logo);
          }
        } catch {
          errors.push(`Invalid JSON in top_recruiters for ID: ${id}`);
        }


        // Other array fields
        const job_roles_arr = typeof job_roles === 'string'
          ? String(job_roles).split(',').map(j => j.trim()) : [];
        const scholarship_applicable_arr = typeof scholarship_applicable === 'string'
          ? String(scholarship_applicable).split(',').map(s => s.trim()) : [];
        const funding_options_arr = typeof funding_options === 'string'
          ? String(funding_options).split(',').map(f => f.trim()) : [];

        // Build courseData
        const courseData = {
          course_level, discipline, area_of_study, country,
          university_name: university._id,
          course_duration,
          application_deadline: application_deadline ? new Date(application_deadline) : undefined,
          overview, 
          intakes:parsedIntakes,
           testRequirements:parsedTestReqs,
            eligibilityRequirements:parsedEligibility,
          application_requirements:parsedAppReqs,
           job_roles: job_roles_arr,
          top_recruiters:parsedRecruiters,
           scholarship_applicable: scholarship_applicable_arr,
          tution_fee: tution_fee ? Number(tution_fee) : undefined,
          funding_options: funding_options_arr,
          program_level, program_name
        };

        // Create or update
        const existing = await Course.findOne({ id: id.trim() });
        if (existing) {
          Object.assign(existing, courseData);
          await existing.save();
          updatedCourses.push(id);
        } else {
          await new Course({ id: id.trim(), ...courseData }).save();
          createdCourses.push(id);
        }
      } catch (err) {
        errors.push(`Error for ID ${row.id || 'unknown'}: ${err.message}`);
      }
    }

    // Clean up files
    Object.entries(imageMap).forEach(([name, file]) => {
      if (!usedImages.has(name)) {
        try { fs.unlinkSync(file.path); } catch {};
      }
    });
    usedImages.forEach(name => {
      const file = imageMap[name];
      try { fs.unlinkSync(file.path); } catch {};
    });
    fs.unlinkSync(excelFile.path);

    // Response
    res.status((createdCourses.length || updatedCourses.length) ? 201 : 400).json({
      message: 'Upload Successful',
      coursesAdded: createdCourses.length,
      coursesUpdated: updatedCourses.length,
      errorCount: errors.length,
      errors
    });
  } catch (err) {
    console.error('Bulk upload error:', err);
    res.status(500).json({
      message: 'Bulk upload failed',
      coursesAdded: 0,
      coursesUpdated: 0,
      errorCount: 1,
      errors: [err.message]
    });
  }
};





