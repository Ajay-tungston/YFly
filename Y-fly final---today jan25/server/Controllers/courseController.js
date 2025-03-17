

const Course = require('../Models/courseSchema');
const fs = require('fs');

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
            course_level, discipline, area_of_study, country, university_ranking, university_name,
            course_duration, application_deadline, overview, tution_fee
        } = req.fields;

        const university_logo = req.files ? req.files.university_logo : null;

        // Validate required fields
        if (!course_level || !discipline || !area_of_study || !country ||
            !university_ranking || !university_name || !course_duration ||
            !application_deadline || !overview || !tution_fee) {
            return res.status(400).json({ error: 'All required fields must be provided.' });
        }

        console.log("here 2: ", req.fields.testRequirements)


        // Inline formatting functions
        const formatIntakes = (intakesArray) => {
            return intakesArray.map(intake => {
                if (!intake.month || !intake.year) {
                    throw new Error('Each intake must have a month and year.');
                }
                return {
                    month: intake.month.trim(),
                    year: intake.year.trim(),
                };
            });
        };

        const formatTestRequirements = (testRequirementsArray) => {
            return testRequirementsArray.map(test => {
                if (!test.testRequirementName || !test.overallScore) {
                    throw new Error('Each test requirement must have a testRequirement and overallScore.');
                }
                return {
                    test_name: test.testRequirementName.trim(),
                    overallScore: test.overallScore.trim(),
                };
            });
        };

        const formatEligibilityRequirements = (eligibilityArray) => {
            return eligibilityArray.map(req => {
                if (!req.criteria) {
                    throw new Error('Each eligibility requirement must have a criteria.');
                }
                return {
                    criteria: req.criteria.trim(),
                };
            });
        };

        const formatApplicationRequirements = (applicationArray) => {
            return applicationArray.map(req => {
                if (!req.requirement) {
                    throw new Error('Each application requirement must have a requirement.');
                }
                return {
                    requirement: req.requirement.trim(),
                };
            });
        };

        console.log("here 3: ", req.fields.testRequirements)


        // Parse and validate JSON fields
        const safeParseJson = (field, fieldName) => {
            try {
                console.log("parsing: ", field, " ", fieldName)
                const parsed = field ? JSON.parse(field) : []; if (!Array.isArray(parsed)) {
                    throw new Error(`${fieldName} must be an array.`);
                }
                console.log("parsed: ", field, " ", parsed)
                return parsed;
            } catch (error) {
                throw new Error(`Invalid JSON in ${fieldName}: ${error.message}`);
            }
        };

        let intakes, testRequirements, eligibilityRequirements, application_requirements,
            top_recruiters, scholarship_applicable, job_roles, funding_options;

        try {
            // Usage in createCourse:
            intakes = safeParseJson(req.fields.intakes, 'intakes');
            // let testRequirements_format = formatTestRequirements(req.fields.testRequirements)

            console.log("here 4: ", req.fields.testRequirements)
            testRequirements = safeParseJson(req.fields.testRequirements, 'testRequirements');
            eligibilityRequirements = safeParseJson(req.fields.eligibilityRequirements, 'eligibilityRequirements');
            application_requirements = safeParseJson(req.fields.application_requirements, 'application_requirements');
            top_recruiters = safeParseJson(req.fields.top_recruiters, 'top_recruiters');
            scholarship_applicable = safeParseJson(req.fields.scholarship_applicable, 'scholarship_applicable').filter(scholarship => scholarship.trim() !== '');
            job_roles = safeParseJson(req.fields.job_roles, 'job_roles');
            // Sanitize funding options to remove empty strings
            funding_options = safeParseJson(req.fields.funding_options, 'funding_options').filter(option => option.trim() !== '');

        } catch (error) {
            console.error('JSON Parsing or Validation Error:', error.message);
            return res.status(400).json({ error: error.message });
        }

        // Validate and process university logo
        let universityLogoData;
        if (university_logo) {
            if (!['image/jpeg', 'image/png'].includes(university_logo.type)) {
                throw new Error('University logo must be a JPEG or PNG image.');
            }
            if (university_logo.size > 5000000) {
                throw new Error('University logo size must be less than 5MB.');
            }
            if (!fs.existsSync(university_logo.path)) {
                throw new Error('Uploaded university logo file does not exist.');
            }
            universityLogoData = {
                data: fs.readFileSync(university_logo.path),
                contentType: university_logo.type,
            };
            fs.unlinkSync(university_logo.path); // Clean up file after processing
        }


        // Date validation for application deadline
        const deadlineDate = new Date(application_deadline);
        if (isNaN(deadlineDate.getTime()) || deadlineDate < new Date()) {
            throw new Error('Application deadline must be a valid future date.');
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
        });

        await course.save();
        res.status(201).json({ success: true, message: 'Course created successfully.', course });
    } catch (error) {
        console.error('Error creating course:', error.message);
        res.status(500).json({ error: error.message || 'Internal server error.' });
    }
};


// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().select('-university_logo');
        res.status(200).json({ success: true, courses });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single course by ID
exports.getSingleCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found.' });
        }
        res.status(200).json({ success: true, course });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// update course by ID
exports.updateCourse = async (req, res) => {
    try {
        console.log('Raw request fields:', req.fields);
        console.log('Raw request files:', req.files);

        const {
            course_level, discipline, area_of_study, country, university_ranking, university_name,
            course_duration, application_deadline, overview, tution_fee
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
        let intakesArray, testRequirementsArray, eligibilityRequirementsArray, applicationRequirementsArray,
            topRecruitersArray, scholarshipApplicableArray, jobRolesArray, fundingOptionsArray;

        try {
            intakesArray = safeParseJson(req.fields.intakes, 'intakes');
            testRequirementsArray = safeParseJson(req.fields.testRequirements, 'testRequirements');
            eligibilityRequirementsArray = safeParseJson(req.fields.eligibilityRequirements, 'eligibilityRequirements');
            applicationRequirementsArray = safeParseJson(req.fields.application_requirements, 'application_requirements');
            topRecruitersArray = safeParseJson(req.fields.top_recruiters, 'top_recruiters');
            scholarshipApplicableArray = safeParseJson(req.fields.scholarship_applicable, 'scholarship_applicable');
            jobRolesArray = safeParseJson(req.fields.job_roles, 'job_roles');
            fundingOptionsArray = safeParseJson(req.fields.funding_options, 'funding_options');
        } catch (error) {
            console.error('JSON Parsing Error:', error.message);
            return res.status(400).json({ error: error.message });
        }

        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found.' });
        }

        // Update fields if provided
        if (course_level) course.course_level = course_level;
        if (discipline) course.discipline = discipline;
        if (area_of_study) course.area_of_study = area_of_study;
        if (country) course.country = country;
        if (university_ranking) course.university_ranking = parseInt(university_ranking, 10);
        if (university_name) course.university_name = university_name;
        if (course_duration) course.course_duration = course_duration;
        if (application_deadline) course.application_deadline = new Date(application_deadline);
        if (overview) course.overview = overview;
        if (tution_fee) course.tution_fee = parseFloat(tution_fee);

        // Handle arrays
        if (intakesArray.length) {
            course.intakes = intakesArray.map((intake) => {
                if (typeof intake.month !== 'string' || typeof intake.year !== 'number') {
                    throw new Error('Each intake must have a valid month (string) and year (number).');
                }
                return { month: intake.month.trim(), year: intake.year }; // year is a number
            });
        }

        if (testRequirementsArray.length) {
            course.testRequirements = testRequirementsArray.map((test) => {
                if (!test.testRequirementName || !test.overallScore) {
                    throw new Error('Each test requirement must have a testRequirementName and overallScore.');
                }
                return {
                    testRequirementName: test.testRequirementName.trim(),
                    overallScore: test.overallScore.trim(),
                };
            });
        }

        if (eligibilityRequirementsArray.length) {
            course.eligibilityRequirements = eligibilityRequirementsArray.map((req) => {
                if (!req.requirementType) {
                    throw new Error('Each eligibility requirement must have a requirementType.');
                }
                return {
                    requirementType: req.requirementType.trim(),
                    gpaRange: req.gpaRange?.trim() || null,
                    backlogRange: req.backlogRange?.trim() || null,
                    workExperience: req.workExperience?.trim() || null,
                    entranceExam: req.entranceExam?.trim() || null,
                };
            });
        }

        if (applicationRequirementsArray.length) {
            course.application_requirements = applicationRequirementsArray.map((req) => {
                if (!req.requirement) {
                    throw new Error('Each application requirement must have a requirement.');
                }
                return { requirement: req.requirement.trim(), isRequired: req.isRequired };
            });
        }

        if (topRecruitersArray.length) {
            course.top_recruiters = topRecruitersArray.map((recruiter) => {
                if (!recruiter.recruiters_name) {
                    throw new Error('Each recruiter must have a name.');
                }
                return { recruiters_name: recruiter.recruiters_name.trim(), logo: recruiter.logo || null };
            });
        }

        if (scholarshipApplicableArray.length) course.scholarship_applicable = scholarshipApplicableArray;
        if (jobRolesArray.length) course.job_roles = jobRolesArray.map((role) => role.trim());
        if (fundingOptionsArray.length) course.funding_options = fundingOptionsArray.map((option) => option.trim());

        // Update university logo if provided
        if (university_logo) {
            if (!['image/jpeg', 'image/png'].includes(university_logo.type)) {
                throw new Error('University logo must be a JPEG or PNG image.');
            }
            if (university_logo.size > 5000000) {
                throw new Error('University logo size must be less than 5MB.');
            }
            if (!fs.existsSync(university_logo.path)) {
                throw new Error('Uploaded university logo file does not exist.');
            }
            course.university_logo = {
                data: fs.readFileSync(university_logo.path),
                contentType: university_logo.type,
            };
            fs.unlinkSync(university_logo.path); // Clean up the file
        }

        await course.save();
        res.status(200).json({ success: true, message: 'Course updated successfully.', course });
    } catch (error) {
        console.error('Error updating course:', error.stack || error.message);
        res.status(500).json({ error: error.message || 'Internal server error.' });
    }
};



// Delete a course by ID
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found.' });
        }
        res.status(200).json({ success: true, message: 'Course deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};








































