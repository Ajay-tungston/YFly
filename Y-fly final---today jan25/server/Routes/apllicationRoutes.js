const express = require("express");
const formidable = require("express-formidable");
const { addApplication } = require("../Controllers/applicationController"); 
const fs = require("fs");

const router = express.Router();
const uploadDir = "./uploads/applications";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); 
}

router.use(
    formidable({
        uploadDir, 
        keepExtensions: true, 
    })
);

router.post("/apply", addApplication); 

module.exports = router;
