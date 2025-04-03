const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
const fs = require("fs");
const { createUniversity, getAllUniversity, profileMatcher, getUniversitiesWithPagination, deleteUniversityById, getUniversityById, updateUniversity,  } = require("../Controllers/universityController");

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

// GET route to retrieve all universities
//for slelect box selection 
router.get("/get-all", getAllUniversity);

router.get("/get",getUniversitiesWithPagination)

router.get("/get/:id",getUniversityById)

router.put("/update/:id",updateUniversity)


router.delete("/delete/:id",deleteUniversityById)



module.exports = router;
