const express = require("express");
const router = express.Router();
const courseController = require("../Controllers/courseController");
const formidable = require('express-formidable')
const fs = require('fs');

//Ensure upload directory exists
const uploadDir = './uploads/course';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true })
}
// Apply formidable middleware
router.use(formidable({
    uploadDir,
    keepExtensions: true,  // Preserve file extensions
}));

// POST route for creating a course
router.post('/create', courseController.createCourse);

// GET route to retrieve all courses
router.get('/get-all', courseController.getAllCourses);

// GET route to retrieve a single course by ID
router.get('/get/:id', courseController.getSingleCourse);

// PUT route to update a course by ID
router.put('/edit/:id', courseController.updateCourse);

// DELETE route to delete a course by ID
router.delete('/delete/:id', courseController.deleteCourse);

//Filer based Search
router.get('/filtersearch', courseController.filterSearch);


// Get dropdown values

router.get('/getvalues', courseController.getValues);

module.exports = router;