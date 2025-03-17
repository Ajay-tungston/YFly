// const multer = require("multer");

// const storage = multer.memoryStorage(); // Store file in memory as a buffer

// const fileFilter = (req, file, cb) => {
//   // Allow only image files
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
//     cb(null, true); // Accept file
//   } else {
//     console.error(`File rejected: ${file.originalname} (${file.mimetype})`);
//     cb(new Error("Only JPEG, JPG, or PNG image files are allowed!"), false); // Reject file
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
//   fileFilter: fileFilter,
// });

// module.exports = upload;
