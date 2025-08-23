const express = require("express");
const { loginUser, registerUser } = require("../controllers/user.controller");

const router = new express.Router();

// login user
router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
