const Application = require("../Models/Application");
const User = require("../Models/userSchema");
const Course = require("../Models/courseSchema");
const fs = require("fs");
const path = require("path");

const deleteUploadedFiles = (files) => {
  if (!files) return;

  Object.values(files).forEach((field) => {
    field.forEach((file) => {
      fs.unlink(file.path, (err) => {
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
      Course.findById(courseId),
    ]);

    if (!userExists || !courseExists) {
      deleteUploadedFiles(files);
      return res.status(400).json({
        success: false,
        message: !userExists ? "User not found" : "Course not found",
      });
    }

    // Validate Intake - Check if the combination exists in course intakes
    const intakeValid = courseExists.intakes.some(
      (intake) =>
        intake.year.toString() === intakeYear.toString() &&
        intake.month.toLowerCase() === intakeMonth.toLowerCase()
    );

    if (!intakeValid) {
      deleteUploadedFiles(files);
      return res.status(400).json({
        success: false,
        message: `The selected intake (${intakeMonth} ${intakeYear}) is not available for this course.`,
      });
    }

    // Process files
    const processFiles = (fieldName) =>
      files[fieldName]?.map((file) => file.path) || [];
    const processSingleFile = (fieldName) =>
      files[fieldName]?.[0]?.path || null;

    const application = new Application({
      user: userId,
      course: courseId,
      intake: {
        year: parseInt(intakeYear),
        month: intakeMonth,
      },
      documents: {
        identityDocuments: {
          passportFront: processSingleFile("passportFront"),
          passportBack: processSingleFile("passportBack"),
          cvResume: processSingleFile("cvResume"),
        },
        educationalDocuments: processFiles("educationalDocuments"),
        workExperienceDocuments: processFiles("workExperienceDocuments"),
        englishProficiencyDocuments: processFiles(
          "englishProficiencyDocuments"
        ),
        extracurricularDocuments: processFiles("extracurricularDocuments"),
        recommendationDocuments: processFiles("recommendationDocuments"),
        otherDocuments: processFiles("otherDocuments"),
      },
    });

    await application.save();
    res.status(201).json({ success: true, data: application });
  } catch (error) {
    deleteUploadedFiles(files);
    res.status(400).json({
      success: false,
      message: error.message.includes("PDF")
        ? error.message
        : "Application submission failed: " + error.message,
    });
  }
};

const getApplicationsWithPagination = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    // Get applications with populated data, sorted by newest first
    const applications = await Application.find({})
      .sort({
        isOpened: 1,
        createdAt: -1,
      })
      .populate({
        path: "user",
        select: "first_name last_name email",
      })
      .populate({
        path: "course",
        select: "course_level discipline area_of_study university_name",
        populate: {
          path: "university_name",
          select: "university_name",
        },
      })
      .skip(skip)
      .limit(Number(limit))
      .lean();

    // Construct full URLs for documents
    const baseUrl = `${req.protocol}://${req.get("host")}/`;
    const applicationsWithUrls = applications.map((app) => {
      if (!app.documents) return app;

      const docs = { ...app.documents };

      // Process identity documents (object)
      if (docs.identityDocuments) {
        for (const [key, value] of Object.entries(docs.identityDocuments)) {
          if (value) docs.identityDocuments[key] = baseUrl + value;
        }
      }

      // Process array-type documents
      const arrayDocTypes = [
        "educationalDocuments",
        "englishProficiencyDocuments",
        "extracurricularDocuments",
        "otherDocuments",
        "recommendationDocuments",
        "workExperienceDocuments",
      ];

      arrayDocTypes.forEach((type) => {
        if (docs[type] && Array.isArray(docs[type])) {
          docs[type] = docs[type].map((file) => (file ? baseUrl + file : file));
        }
      });

      return { ...app, documents: docs };
    });

    // Get total count
    const total = await Application.estimatedDocumentCount();

    res.status(200).json({
      success: true,
      data: applicationsWithUrls,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
        limit: Number(limit),
      },
    });
  } catch (error) {
    console.error("Error in getApplicationsWithPagination:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Application ID is required",
      });
    }

    // Update the application's isOpenStatus to true
    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      { isOpened: true },
      { new: true } // Return the updated document
    );

    // Check if application exists
    if (!updatedApplication) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      data: updatedApplication,
    });
  } catch (error) {
    console.error("Error in changeStatus:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
module.exports = {
  addApplication,
  getApplicationsWithPagination,
  changeStatus,
};
