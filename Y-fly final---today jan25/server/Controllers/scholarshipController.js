const Scholarship = require('../Models/scholarshipSchema');
const fs = require('fs');
const xlsx = require("xlsx");

// Utility functions for validation
const validateArrayField = (field, errorMessage) => {
    if (!Array.isArray(field)) {
        throw new Error(errorMessage);
    }
    return field;
};

exports.createScholarship = async (req, res) => {
    try {
        console.log('Raw request fields:', req.fields);
        console.log('Raw request files:', req.files);

        const {
            scholarship_name, types_of_scholarship, country, course_level, area_of_study, scholarship_amount,
            scholarship_deadline, overview, eligibility_criteria, application_process, student_citizenship,
            scholarship_applicability,
        } = req.fields;

        const brochure = req.files ? req.files.brochure : null;

        let testRequirementsArray, specialRestrictionsArray;
        try {
            testRequirementsArray = req.fields.testRequirements ? JSON.parse(req.fields.testRequirements) : [];
            specialRestrictionsArray = req.fields.specialRestrictions ? JSON.parse(req.fields.specialRestrictions) : [];
            console.log('Parsed Test Requirements:', testRequirementsArray);
            console.log('Parsed Special Restrictions:', specialRestrictionsArray);
        } catch (error) {
            console.error('JSON Parsing Error:', error.message);
            return res.status(400).json({ error: 'Invalid JSON in request fields.' });
        }

        if (!scholarship_name || !types_of_scholarship || !country || !course_level || !area_of_study ||
            !scholarship_amount || !scholarship_deadline || !overview || !eligibility_criteria ||
            !application_process || !student_citizenship || !scholarship_applicability) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const formattedTestRequirements = testRequirementsArray.map(test => {
            if (!test.testRequirement || !test.overallScore) {
                throw new Error('Each test requirement must have a testRequirement and overallScore.');
            }
            return {
                test_name: test.testRequirement.trim(),
                overall_score: test.overallScore.trim(),
            };
        });

        const formattedSpecialRestrictions = specialRestrictionsArray.map(restriction => {
            if (!restriction.specialRestriction) {
                throw new Error('Each special restriction must have a specialRestriction.');
            }
            return restriction.specialRestriction.trim();
        });

        if (!brochure || brochure.type !== 'application/pdf') {
            return res.status(400).json({ error: 'A PDF brochure is required.' });
        }
        if (brochure.size > 8000000) {
            return res.status(400).json({ error: 'Brochure size must be less than 8MB.' });
        }

        const scholarship = new Scholarship({
            scholarship_name,
            types_of_scholarship,
            country,
            course_level,
            area_of_study,
            scholarship_amount,
            scholarship_deadline,
            overview,
            eligibility_criteria,
            application_process,
            student_citizenship,
            testRequirements: formattedTestRequirements,
            specialRestrictions: formattedSpecialRestrictions,
            scholarship_applicability,
            brochure: {
                data: fs.readFileSync(brochure.path),
                contentType: brochure.type,
            },
        });

        await scholarship.save();
        res.status(201).json({ success: true, message: 'Scholarship created successfully.', scholarship });
    } catch (error) {
        console.error('Error creating scholarship:', error.stack || error.message);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};

exports.getAllScholarships = async (req, res) => {
    try {
        const scholarships = await Scholarship.find().select('-image');
        res.status(200).json({ success: true, scholarships });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single scholarship by ID
exports.getSingleScholarship = async (req, res) => {
    try {
        const scholarship = await Scholarship.findById(req.params.id);
        if (!scholarship) {
            return res.status(404).json({ error: 'Scholarship not found.' });
        }
        res.status(200).json({ success: true, scholarship });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateScholarship = async (req, res) => {
    try {
        console.log('Raw request fields:', req.fields);
        console.log('Raw request body:', req.body);

        const {
            scholarship_name, types_of_scholarship, country, course_level, area_of_study, scholarship_amount,
            scholarship_deadline, overview, eligibility_criteria, application_process, student_citizenship,
            scholarship_applicability,
        } = req.fields;

        const brochure = req.files ? req.files.brochure : null;

        let testRequirementsArray, specialRestrictionsArray;
        try {
            testRequirementsArray = req.body.testRequirements ? JSON.parse(req.body.testRequirements) : [];
            specialRestrictionsArray = req.body.specialRestrictions ? JSON.parse(req.body.specialRestrictions) : [];
            console.log('Parsed Test Requirements:', testRequirementsArray);
            console.log('Parsed Special Restrictions:', specialRestrictionsArray);
        } catch (error) {
            console.error('JSON Parsing Error:', error.message);
            return res.status(400).json({ error: 'Invalid JSON in request body.' });
        }

        const scholarship = await Scholarship.findById(req.params.id);
        if (!scholarship) {
            return res.status(404).json({ error: 'Scholarship not found.' });
        }

        if (scholarship_name) scholarship.scholarship_name = scholarship_name;
        if (types_of_scholarship) scholarship.types_of_scholarship = types_of_scholarship;
        if (country) scholarship.country = country;
        if (course_level) scholarship.course_level = course_level;
        if (area_of_study) scholarship.area_of_study = area_of_study;
        if (scholarship_amount) scholarship.scholarship_amount = scholarship_amount;
        if (scholarship_deadline) scholarship.scholarship_deadline = scholarship_deadline;
        if (overview) scholarship.overview = overview;
        if (eligibility_criteria) scholarship.eligibility_criteria = eligibility_criteria;
        if (application_process) scholarship.application_process = application_process;
        if (student_citizenship) scholarship.student_citizenship = student_citizenship;
        if (scholarship_applicability) scholarship.scholarship_applicability = scholarship_applicability;

        const formattedTestRequirements = testRequirementsArray.map(test => {
            if (!test.testRequirement || !test.overallScore) {
                throw new Error('Each test requirement must have a testRequirement and overallScore.');
            }
            return {
                test_name: test.testRequirement.trim(),
                overall_score: test.overallScore.trim(),
            };
        });

        const formattedSpecialRestrictions = specialRestrictionsArray.map(restriction => {
            if (!restriction.specialRestriction) {
                throw new Error('Each special restriction must have a specialRestriction.');
            }
            return restriction.specialRestriction.trim();
        });

        if (formattedTestRequirements.length) scholarship.testRequirements = formattedTestRequirements;
        if (formattedSpecialRestrictions.length) scholarship.specialRestrictions = formattedSpecialRestrictions;

        if (brochure) {
            if (brochure.type !== 'application/pdf') {
                return res.status(400).json({ error: 'Only PDF files are allowed for the brochure.' });
            }
            if (brochure.size > 8000000) {
                return res.status(400).json({ error: 'Brochure size must be less than 8MB.' });
            }
            scholarship.brochure = {
                data: fs.readFileSync(brochure.path),
                contentType: brochure.type,
            };
        }

        await scholarship.save();
        res.status(200).json({ success: true, message: 'Scholarship updated successfully.', scholarship });
    } catch (error) {
        console.error('Error updating scholarship:', error.stack || error.message);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};

exports.deleteScholarship = async (req, res) => {
    try {
        const scholarship = await Scholarship.findByIdAndDelete(req.params.id);
        if (!scholarship) {
            return res.status(404).json({ error: 'Scholarship not found.' });
        }
        res.status(200).json({ success: true, message: 'Scholarship deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getScholarshipBrochure = async (req, res) => {
    try {
        const scholarship = await Scholarship.findById(req.params.id);
        if (!scholarship || !scholarship.brochure) {
            return res.status(404).json({ error: 'Brochure not found.' });
        }
        

        res.set('Content-Type', scholarship.brochure.contentType);
        res.send(scholarship.brochure.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//get scholorship by filter and serch with pagination


exports.searchScholarships = async (req, res) => {
    try {
      let {
        page = 1,
        limit = 10,
        search = "",
        country,
        course_level,
        types_of_scholarship,
        area_of_study,
        minAmount, maxAmount ,
        intakeYear,
        specialRestrictions,
        scholarship_applicability,
        student_citizenship,
        scholarship_deadline,
        sortBy,
        // order = "asc"
      } = req.query;
  
      page = isNaN(page) || page < 1 ? 1 : parseInt(page);
      limit = isNaN(limit) || limit < 1 || limit > 100 ? 10 : parseInt(limit);
    //   order = order === "desc" ? -1 : 1;
  
      let filter = {};
  
    //   if (search) {
    //     filter.$or = [
    //       { scholarship_name: { $regex: search, $options: "i" } },
    //       { overview: { $regex: search, $options: "i" } }
    //     ];
    //   }
    if (search) {
        filter.scholarship_name = { $regex: search, $options: "i" };
      }
  
      //  Apply Filters
      if (country) filter.country = country;
      if (course_level) filter.course_level = course_level;
      if (types_of_scholarship) filter.types_of_scholarship = types_of_scholarship;
      if (area_of_study) filter.area_of_study = area_of_study;
    //   if (scholarship_amount) filter.scholarship_amount = scholarship_amount;
    if (!isNaN(minAmount) || !isNaN(maxAmount)) {
        filter.scholarship_amount = {};
        if (!isNaN(minAmount)) filter.scholarship_amount.$gte = parseInt(minAmount);
        if (!isNaN(maxAmount)) filter.scholarship_amount.$lte = parseInt(maxAmount);
    }
      if (scholarship_applicability) filter.scholarship_applicability = scholarship_applicability;
      if (student_citizenship) filter.student_citizenship = student_citizenship;
      if (specialRestrictions) filter.specialRestrictions = { $in: specialRestrictions.split(',') };
  
      //  Filter by Intake Year (Deadline falls within the year)
      if (intakeYear) {
        const startDate = new Date(`${intakeYear}-01-01`);
        const endDate = new Date(`${intakeYear}-12-31`);
        filter.scholarship_deadline = { $gte: startDate, $lte: endDate };
      }
  
      //  Filter by Scholarship Deadline (greater than or equal to given date)
    //   if (scholarship_deadline) filter.scholarship_deadline = { $gte: new Date(scholarship_deadline) };
    if (scholarship_deadline) {
        const [minDate, maxDate] = scholarship_deadline.split(",");
        const startDate = new Date(minDate);
        const endDate = new Date(maxDate);
  
        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
          filter.scholarship_deadline = { 
            ...(filter.scholarship_deadline || {}), 
            $gte: startDate, 
            $lte: endDate 
          };
        }
      } 
  

      const sortOptionsMap = {
        newest: { createdAt: -1 },
        oldest: { createdAt: 1 },
        deadline_asc: { scholarship_deadline: 1 },
        deadline_desc: { scholarship_deadline: -1 },
        amount_asc: { scholarship_amount: 1 },
        amount_desc: { scholarship_amount: -1 },
      };
      
      // Default to newest if no valid sortBy is provided
      const sortOptions = sortOptionsMap[sortBy] || { createdAt: -1 };

      //  Fetch scholarships with filters, pagination, and sorting
      const scholarships = await Scholarship.find(filter)
        .select("-brochure") // Exclude large binary data
        .sort(sortOptions) // Default sorting by createdAt
        .skip((page - 1) * limit)
        .limit(limit);
  
      //  Get total count for pagination
      const total = await Scholarship.countDocuments(filter);
  
      res.status(200).json({
        success: true,
        data: scholarships,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
  
    } catch (error) {
      console.error("Error fetching scholarships:", error);
      res.status(500).json({ success: false, message: "Server Error", error });
    }
  };
  

exports.getScholarshipFilters = async (req, res) => {
    try {
        const courses = await Scholarship.distinct('course_level');
        const scholarshipTypes = await Scholarship.distinct('types_of_scholarship');
        const areasOfStudy = await Scholarship.distinct('area_of_study');

        const amountRange = await Scholarship.aggregate([
            {
                $group: {
                    _id: null,
                    minAmount: { $min: "$scholarship_amount" },
                    maxAmount: { $max: "$scholarship_amount" }
                }
            }
        ]);
        
        const scholarshipAmounts = amountRange.length > 0 ? amountRange[0] : { minAmount: 0, maxAmount: 10000 }; // Default values
                
        const intakeYears = await Scholarship.aggregate([
            { $project: { year: { $year: "$scholarship_deadline" } } },
            { $group: { _id: "$year" } },
            { $sort: { _id: 1 } }
        ]);
        const specialRestrictions = await Scholarship.distinct('specialRestrictions');
        const applicability = await Scholarship.distinct('scholarship_applicability');
        const citizenships = await Scholarship.distinct('student_citizenship');
        const countries = await Scholarship.distinct('country');

        res.json({
            courses,
            scholarshipTypes,
            areasOfStudy,
            scholarshipAmounts,
            intakeYears: intakeYears.map(y => y._id),
            specialRestrictions,
            applicability,
            citizenships,
            countries
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching filter options', error });
    }
}


exports.bulkUploadScholarships = async (req, res) => {
    try {
      const excelFile = req.files?.excel;
      const brochureFiles = req.files?.brochures;
  
      if (!excelFile || !excelFile.path) {
        return res.status(400).json({ message: "Valid Excel file is required" });
      }
  
      const workbook = xlsx.readFile(excelFile.path);
      const sheetName = workbook.SheetNames[0];
      const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  
      // Map uploaded brochure files by their original names
      const brochureMap = {};
      if (brochureFiles) {
        if (Array.isArray(brochureFiles)) {
          brochureFiles.forEach((file) => {
            brochureMap[file.name] = file;
          });
        } else if (brochureFiles.name) {
          brochureMap[brochureFiles.name] = brochureFiles;
        }
      }
  
      const createdScholarships = [];
      const updatedScholarships = [];
      const errors = [];
  
      for (const row of rows) {
        try {
          const {
            id,
            scholarship_name,
            types_of_scholarship,
            country,
            course_level,
            area_of_study,
            scholarship_amount,
            scholarship_deadline,
            overview,
            eligibility_criteria,
            application_process,
            testRequirementName,
            overallScore,
            student_citizenship,
            specialRestrictions,
            scholarship_applicability,
            brochure_name,
          } = row;
  
          // Required field validation
          if (
            !scholarship_name ||
            !types_of_scholarship ||
            !country ||
            !course_level ||
            !area_of_study ||
            !scholarship_amount ||
            !scholarship_deadline
          ) {
            errors.push(`Missing required fields for scholarship ID: ${id || "N/A"}`);
            continue;
          }
  
          // Handle brochure file if brochure_name is provided
          let brochureData = null;
          if (brochure_name) {
            const brochureFile = brochureMap[brochure_name];
  
            // Debug log for troubleshooting
            // console.log(`Checking brochure for ID ${id}:`, {
            //   name: brochureFile?.name,
            //   mimetype: brochureFile?.mimetype,
            //   path: brochureFile?.path,
            // });
  
            if (!brochureFile || !fs.existsSync(brochureFile.path)) {
              errors.push(`Brochure file missing for scholarship ID: ${id}`);
              continue;
            }
  
            // Validate PDF file - check mimetype and fallback to extension check
            const isPdf =
              (brochureFile.mimetype && brochureFile.mimetype.toLowerCase().includes("pdf")) ||
              brochureFile.name.toLowerCase().endsWith(".pdf");
  
            if (!isPdf) {
              errors.push(`Invalid file type (must be PDF) for scholarship ID: ${id}`);
              continue;
            }
  
            brochureData = {
              data: fs.readFileSync(brochureFile.path),
              contentType: brochureFile.mimetype || "application/pdf",
            };
  
            // Remove used brochure file immediately
            fs.unlinkSync(brochureFile.path);
            delete brochureMap[brochure_name];
          }
  
          // Prepare other nested fields
          const testRequirements =
            testRequirementName && overallScore
              ? [
                  {
                    test_name: testRequirementName,
                    overall_score: overallScore,
                  },
                ]
              : [];
  
          const specialRestrictionsArray =
            typeof specialRestrictions === "string"
              ? specialRestrictions.split(",").map((s) => s.trim())
              : [];
  
          const scholarshipData = {
            scholarship_name,
            types_of_scholarship,
            country,
            course_level,
            area_of_study,
            scholarship_amount: Number(scholarship_amount),
            scholarship_deadline: new Date(scholarship_deadline),
            overview,
            eligibility_criteria,
            application_process,
            testRequirements,
            student_citizenship,
            specialRestrictions: specialRestrictionsArray,
            scholarship_applicability,
            brochure: brochureData,
          };
  
          // Check if scholarship exists by name (trimmed)
          const existing = await Scholarship.findOne({
            scholarship_name: scholarship_name.trim(),
          });
          if (existing) {
            Object.assign(existing, scholarshipData);
            await existing.save();
            updatedScholarships.push(id || scholarship_name);
          } else {
            const newScholarship = new Scholarship(scholarshipData);
            await newScholarship.save();
            createdScholarships.push(id || scholarship_name);
          }
        } catch (err) {
          errors.push(`Error for ID ${row.id || "unknown"}: ${err.message}`);
        }
      }
  
      // Cleanup any unused brochure files
      const usedBrochureNames = new Set(
        rows.map((row) => row.brochure_name).filter(Boolean)
      );
      for (const name in brochureMap) {
        if (!usedBrochureNames.has(name)) {
          try {
            fs.unlinkSync(brochureMap[name].path);
          } catch (err) {
            console.warn(`Failed to delete unused brochure: ${name}`, err.message);
          }
        }
      }
  
      // Delete uploaded Excel file
      fs.unlinkSync(excelFile.path);
  
      // Final response
      res.status(
        createdScholarships.length > 0 || updatedScholarships.length > 0 ? 201 : 400
      ).json({
        message: "Bulk scholarship upload complete",
        createdCount: createdScholarships.length,
        updatedCount: updatedScholarships.length,
        errorCount: errors.length,
        created: createdScholarships,
        updated: updatedScholarships,
        errors,
      });
    } catch (error) {
      console.error("Bulk upload error:", error);
  
      // Cleanup on error
      try {
        if (excelFile?.path && fs.existsSync(excelFile.path)) {
          fs.unlinkSync(excelFile.path);
        }
        if (req.files?.brochures) {
          const brochures = Array.isArray(req.files.brochures)
            ? req.files.brochures
            : [req.files.brochures];
          brochures.forEach((file) => {
            if (file?.path && fs.existsSync(file.path)) {
              fs.unlinkSync(file.path);
            }
          });
        }
      } catch (cleanupError) {
        console.error("Cleanup error:", cleanupError);
      }
  
      res.status(500).json({
        message: "Bulk upload failed",
        createdCount: 0,
        updatedCount: 0,
        errorCount: 1,
        errors: [error.message],
      });
    }
  };



