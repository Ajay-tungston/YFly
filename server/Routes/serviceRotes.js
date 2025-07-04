const express = require('express');
const { addNewService, getAllServiceWithPagination, getAllServiceName, getServiceById, updateService, deleteService, applyForService, getServiceApplications, bulkUploadServices } = require('../Controllers/servicesController');
const router = express.Router();
const formidable = require('express-formidable');
const fs = require('fs');
const { updateMany } = require('../Models/Application');

// Ensure upload directory exists for services
const uploadDir = './uploads/services';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Apply formidable middleware specifically for service routes
router.use(formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB limit
    multiples: true, // ← This is crucial for bulk uploads
    allowEmptyFiles: false // ← Prevent empty files
}));
router.post('/add', addNewService);
router.get("/get-all",getAllServiceWithPagination)
router.get("/get-name",getAllServiceName)
router.get("/get/:id",getServiceById)
router.put('/update/:id', updateService)
router.delete('/delete/:id', deleteService)
router.post("/applay",applyForService)
router.get ("/application",getServiceApplications)

router.post('/bulk-upload', bulkUploadServices);

module.exports = router;
