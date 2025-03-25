const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
const fs = require("fs");
const { createUniversity, getAllUniversity } = require("../Controllers/universityController");

// Ensure upload directory exists
const uploadDir = "./uploads/university";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Apply formidable middleware
router.use(
    formidable({
        uploadDir,
        keepExtensions: true, // Preserve file extensions
    })
);

// POST route for creating a university
router.post("/add", createUniversity);

// // GET route to retrieve all universities
router.get("/get-all", getAllUniversity);

// // GET route to retrieve a single university by ID
// router.get("/get/:id", universityController.getSingleUniversity);

// // PUT route to update a university by ID
// router.put("/edit/:id", universityController.updateUniversity);

// // DELETE route to delete a university by ID
// router.delete("/delete/:id", universityController.deleteUniversity);

module.exports = router;
