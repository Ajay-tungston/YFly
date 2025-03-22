const express = require('express');
const router = express.Router();
const scholarshipController = require('../Controllers/scholarshipController');
const formidable = require('express-formidable');
const fs = require('fs');


//Ensure upload directory exists
const uploadDir = './uploads/scholarships';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true })
}
// Apply formidable middleware
router.use(formidable({
    uploadDir,
    keepExtensions: true,  // Preserve file extensions
}));

// POST route for creating a scholarship
router.post('/create', scholarshipController.createScholarship);

// GET routes for retrieving scholarships
router.get('/get-all', scholarshipController.getAllScholarships);
router.get('/brochure/:id', scholarshipController.getScholarshipBrochure);
router.get('/get/:id', scholarshipController.getSingleScholarship);

// PUT route to update a scholarship by ID
router.put('/edit/:id', scholarshipController.updateScholarship);

// DELETE route to delete a scholarship by ID
router.delete('/delete/:id', scholarshipController.deleteScholarship);


router.get('/search', scholarshipController.searchScholarships);
router.get('/get-filters', scholarshipController.getScholarshipFilters);


module.exports = router;
