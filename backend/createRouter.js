const express = require("express");
const { signUpValidation, logInValidation } = require("./createValidation");
const { signup, logIn } = require("./createController");
const router = express.Router();

router.post("/signup", signUpValidation, signup);
router.post("/login", logInValidation, logIn);

module.exports = router;
