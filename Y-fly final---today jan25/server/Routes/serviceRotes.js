const express = require('express');
const { addNewService, getAllServiceWithPagination, getAllServiceName, getServiceById } = require('../Controllers/servicesController');
const router = express.Router();
const formidable = require('express-formidable');
const fs = require('fs');

// Ensure upload directory exists for services
const uploadDir = './uploads/services';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Apply formidable middleware specifically for service routes
router.use(formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024 // 5MB limit
}));
router.post('/add', addNewService);
router.get("/get-all",getAllServiceWithPagination)
router.get("/get-name",getAllServiceName)
router.get("/get/:id",getServiceById)


module.exports = router;
