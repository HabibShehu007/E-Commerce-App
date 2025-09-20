const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/profileController");
const { authenticateUser } = require("../middleware/authMiddleware");

router.get("/", authenticateUser, getProfile);

module.exports = router;
