const express = require("express");
const {
  signUpValidation,
  logInValidation,
  forgotPasswordValidation,
  authenticateVerify,
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
router.post("/", authenticateVerify, addTask);
router.get("/", authenticateVerify, getTask);
router.delete("/:taskId", deleteTask);
router.put("/:taskId", updateTask);
router.put("/:id", updateTaskStatus);

module.exports = router;
