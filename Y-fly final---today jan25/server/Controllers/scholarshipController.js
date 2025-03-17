const Scholarship = require('../Models/scholarshipSchema');
const fs = require('fs');

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