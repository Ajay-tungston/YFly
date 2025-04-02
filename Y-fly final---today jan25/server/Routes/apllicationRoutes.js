const express = require('express');
const router = express.Router();
const uploadMiddleware = require("../Middlewares/multer");
const { addApplication } = require('../Controllers/applicationController');

router.post('/apply', uploadMiddleware, addApplication);

module.exports = router;