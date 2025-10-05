const express = require("express");
const {
  signUpValidation,
  logInValidation,
  forgotPasswordValidation,
} = require("./createValidation");
const {
  signup,
  logIn,
  addTask,
  getTask,
  deleteTask,
  updateTask,
  updateTaskStatus,
} = require("./createController");
const router = express.Router();

router.post("/signup", signUpValidation, signup);
router.post("/login", logInValidation, logIn);
router.post("/", addTask);
router.get("/:userId", getTask);
router.delete("/:taskId", deleteTask);
router.put("/:taskId", updateTask);
router.put("/:id", updateTaskStatus);

module.exports = router;
