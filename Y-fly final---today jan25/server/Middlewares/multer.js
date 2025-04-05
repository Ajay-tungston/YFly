const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads/applications';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  if (path.extname(file.originalname).toLowerCase() === '.pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

// Define upload fields
const uploadFields = [
    { name: 'passportFront', maxCount: 1 },
    { name: 'passportBack', maxCount: 1 },
    { name: 'cvResume', maxCount: 1 },
    { name: 'educationalDocuments', maxCount: 10 },
    { name: 'workExperienceDocuments', maxCount: 10 },
    { name: 'englishProficiencyDocuments', maxCount: 10 },
    { name: 'extracurricularDocuments', maxCount: 10 },
    { name: 'recommendationDocuments', maxCount: 10 },
    { name: 'otherDocuments', maxCount: 10 }
];

// Create and export middleware
module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
}).fields(uploadFields);