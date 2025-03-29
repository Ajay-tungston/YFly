const express = require("express");
const router = express.Router();
const { getProfileMatcherFilters, profileMatcher } = require("../Controllers/profileMatcher");


router.get("/result",profileMatcher)
router.get("/filters",getProfileMatcherFilters)


module.exports = router;
