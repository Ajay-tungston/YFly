const express = require('express');
const router = express.Router();
const uploadMiddleware = require("../Middlewares/multer");
const { addApplication, getApplicationsWithPagination, changeStatus } = require('../Controllers/applicationController');

router.post('/apply', uploadMiddleware, addApplication);
router.get("/get-all",getApplicationsWithPagination)
router.patch("/status/:id",changeStatus)

module.exports = router;