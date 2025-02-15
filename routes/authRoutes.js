const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register-admin", registerUser); // Register user
router.post("/login", loginUser); // Login user

module.exports = router;
