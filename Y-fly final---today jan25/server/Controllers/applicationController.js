const fs = require("fs");
const path = require("path");
const Application = require("../Models/Application");
const User = require("../Models/userSchema");
const Course = require("../Models/courseSchema");

const addApplication = async (req, res) => {
  const { userId, courseId, intakeYear, intakeMonth } = req.fields;
  const { files } = req;
console.log("fjajf:",files)
  // Function to delete uploaded files
  const deleteFiles = (fileArray) => {
    console.log(fileArray)
    if (Array.isArray(fileArray)) {
      fileArray.forEach((file) => fs.unlink(file.path, () => {}));
    } else if (fileArray && fileArray.path) {
      fs.unlink(fileArray.path, () => {});
    }
  };

  try {
    // Validate user existence
    const userExists = await User.findById(userId);
    if (!userExists) {
      deleteFiles(Object.values(files)); // Delete all uploaded files
      return res.status(400).json({ success: false, message: "Invalid userId. User not found." });
    }

    // Validate course existence
    const courseExists = await Course.findById(courseId);
    if (!courseExists) {
      deleteFiles(Object.values(files)); // Delete all uploaded files
      return res.status(400).json({ success: false, message: "Invalid courseId. Course not found." });
    }

    // Validate intake year and month against the course's available intakes
    const intakeExists = courseExists.intakes.some(
      (intake) => intake.year === parseInt(intakeYear) && intake.month === intakeMonth
    );

    if (!intakeExists) {
      deleteFiles(Object.values(files)); // Delete all uploaded files
      return res.status(400).json({
        success: false,
        message: `The selected intake year (${intakeYear}) and month (${intakeMonth}) are not available for this course.`,
      });
    }

    // Function to check if a file is a PDF using file extension
    const isPDF = (file) => file && path.extname(file.path).toLowerCase() === ".pdf";

    // Function to validate and process files (handles both single & multiple files)
    const processFiles = (fileInput, isSingle = false) => {
      if (!fileInput) return isSingle ? null : [];

      // Convert to array if it's a single file
      const fileArray = Array.isArray(fileInput) ? fileInput : [fileInput];

      // Validate all files are PDFs
      const invalidFiles = fileArray.filter((file) => !isPDF(file));

      if (invalidFiles.length > 0) {
        deleteFiles(fileArray); // Delete invalid files before returning the error
        return { error: "All uploaded files must be in PDF format." };
      }

      // Store file paths
      const filePaths = fileArray.map((file) => file.path);

      // Ensure single files return a string, not an array
      return isSingle ? filePaths[0] || null : filePaths;
    };

    // Process and validate all document fields
    const documents = {
      identityDocuments: {
        passportFront: processFiles(files.passportFront, true), // Single file
        passportBack: processFiles(files.passportBack, true), // Single file
        cvResume: processFiles(files.cvResume, true), // Single file
      },
      educationalDocuments: processFiles(files.educationalDocuments),
      workExperienceDocuments: processFiles(files.workExperienceDocuments),
      englishProficiencyDocuments: processFiles(files.englishProficiencyDocuments),
      extracurricularDocuments: processFiles(files.extracurricularDocuments),
      recommendationDocuments: processFiles(files.recommendationDocuments),
      otherDocuments: processFiles(files.otherDocuments),
    };

    // Check for any validation errors in document processing
    for (const key in documents) {
      if (typeof documents[key] === "object" && documents[key] !== null) {
        for (const subKey in documents[key]) {
          if (documents[key][subKey]?.error) {
            deleteFiles(Object.values(files)); // Delete all uploaded files
            return res.status(400).json({ success: false, message: documents[key][subKey].error });
          }
        }
      } else if (documents[key]?.error) {
        deleteFiles(Object.values(files)); // Delete all uploaded files
        return res.status(400).json({ success: false, message: documents[key].error });
      }
    }

    // Save application with relative file paths
    const application = new Application({
      user: userId,
      course: courseId,
      intake: {
        year: parseInt(intakeYear),
        month: intakeMonth,
      },
      documents,
    });

    await application.save();

    return res.json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });

  } catch (error) {
    console.error(error);
    deleteFiles(Object.values(files)); // Delete all uploaded files on error
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { addApplication };
