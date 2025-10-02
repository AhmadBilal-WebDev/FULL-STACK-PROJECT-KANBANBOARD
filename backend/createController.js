const userModel = require("./createModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const taskModel = require("./createModelTask");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const checkEmailExit = await userModel.findOne({ email });
    if (checkEmailExit) {
      res.status(409).json({
        message: "Email Already Exit!",
        success: false,
        field: "email",
      });
    }
    const newUserModel = new userModel({ name, email, password });
    const responce = await newUserModel.save();
    res.status(200).json({
      message: "User Registration Successfully ✅",
      success: true,
    });
  } catch (error) {
    res
      .status(404)
      .json({ message: "User Registration Failed", success: false });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "User Email Not Exit!",
        success: false,
        field: "email",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({
        message: "Ivalid User Passwords!",
        success: false,
        field: "password",
      });
    }

    const jwtToken = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRECT,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      userId: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      token: jwtToken,
      message: "Logged In Successfully!” ✅",
      success: true,
    });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Some Error User LogedIn!", success: false });
  }
};

const addTask = async (req, res) => {
  try {
    const { task, date, description, userId } = req.body;
    const newTaskModel = new taskModel({ task, date, description, userId });
    const responce = await newTaskModel.save();
    res.status(200).json({
      message: "User Task Add Sucessfully!",
      success: true,
      data: responce,
    });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Some Error In Save Data!", success: false });
  }
};

const getTask = async (req, res) => {
  try {
    const { userId } = req.params;
    const responce = await taskModel.find({ userId });
    res.status(200).json({
      message: "Successfull to get data!",
      success: true,
      data: responce,
    });
  } catch (error) {
    res.status(400).json({ message: "Show error get data", success: false });
  }
};

module.exports = { signup, logIn, addTask, getTask };
