const express = require("express");
const { signUpValidation, logInValidation } = require("./createValidation");
const { signup, logIn, addTask, getTask } = require("./createController");
const router = express.Router();

router.post("/signup", signUpValidation, signup);
router.post("/login", logInValidation, logIn);
router.post("/", addTask);
router.get("/:userId", getTask);

module.exports = router;
