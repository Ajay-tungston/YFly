const Application = require('../Models/Application');
const User = require('../Models/userSchema');
const Course = require('../Models/courseSchema');
const fs = require('fs');
const path = require('path');

const deleteUploadedFiles = (files) => {
  if (!files) return;
  
  Object.values(files).forEach(field => {
    field.forEach(file => {
      fs.unlink(file.path, err => {
        if (err) console.error(`Error deleting file: ${file.path}`, err);
      });
    });
  });
};

const addApplication = async (req, res) => {
  const { userId, courseId, intakeYear, intakeMonth } = req.body;
  const files = req.files;

  try {
    // Validations
    const [userExists, courseExists] = await Promise.all([
      User.findById(userId),
      Course.findById(courseId)
    ]);

    if (!userExists || !courseExists) {
      deleteUploadedFiles(files);
      return res.status(400).json({
        success: false,
        message: !userExists ? 'User not found' : 'Course not found'
      });
    }

    // Validate Intake - Check if the combination exists in course intakes
    const intakeValid = courseExists.intakes.some(intake => 
      intake.year.toString() === intakeYear.toString() && 
      intake.month.toLowerCase() === intakeMonth.toLowerCase()
    );

    if (!intakeValid) {
      deleteUploadedFiles(files);
      return res.status(400).json({
        success: false,
        message: `The selected intake (${intakeMonth} ${intakeYear}) is not available for this course.`
      });
    }

    // Process files
    const processFiles = (fieldName) => files[fieldName]?.map(file => file.path) || [];
    const processSingleFile = (fieldName) => files[fieldName]?.[0]?.path || null;

    const application = new Application({
      user: userId,
      course: courseId,
      intake: { 
        year: parseInt(intakeYear),
        month: intakeMonth 
      },
      documents: {
        identityDocuments: {
          passportFront: processSingleFile('passportFront'),
          passportBack: processSingleFile('passportBack'),
          cvResume: processSingleFile('cvResume')
        },
        educationalDocuments: processFiles('educationalDocuments'),
        workExperienceDocuments: processFiles('workExperienceDocuments'),
        englishProficiencyDocuments: processFiles('englishProficiencyDocuments'),
        extracurricularDocuments: processFiles('extracurricularDocuments'),
        recommendationDocuments: processFiles('recommendationDocuments'),
        otherDocuments: processFiles('otherDocuments')
      }
    });

    await application.save();
    res.status(201).json({ success: true, data: application });

  } catch (error) {
    deleteUploadedFiles(files);
    res.status(400).json({ 
      success: false, 
      message: error.message.includes('PDF') 
        ? error.message 
        : 'Application submission failed: ' + error.message
    });
  }
};

module.exports = { addApplication };