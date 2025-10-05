const Joi = require("joi");
const jwt = require("jsonwebtoken");

const signUpValidation = (req, res, next) => {
  const checkValidation = Joi.object({
    name: Joi.string().min(4).max(20).required().messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 4 characters",
      "string.max": "Name must not exceed 20 characters",
    }),
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
    password: Joi.string().min(4).max(8).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 4 characters",
      "string.max": "Password must not exceed 8 characters",
    }),
  });

  const { error } = checkValidation.validate(req.body);
  if (error) {
    return res.status(404).json({
      success: false,
      field: error.details[0].path[0],
      message: error.details[0].message,
    });
  }

  next();
};

const logInValidation = (req, res, next) => {
  const checkValidation = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
    password: Joi.string().min(4).max(8).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 4 characters",
      "string.max": "Password must not exceed 8 characters",
    }),
  });

  const { error } = checkValidation.validate(req.body);
  if (error) {
    return res.status(404).json({
      success: false,
      field: error.details[0].path[0],
      message: error.details[0].message,
    });
  }
  next();
};

const forgotPasswordValidation = (req, res, next) => {
  const object = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
    newPassword: Joi.string().min(4).max(8).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 4 characters",
      "string.max": "Password must not exceed 8 characters",
    }),
  });

  const { error } = object.validate(req.body);
  if (error) {
    res.status(401).json({
      success: false,
      field: error.details[0].path[0],
      message: error.details[0].message,
    });
  }
  next();
};

module.exports = {
  signUpValidation,
  logInValidation,
  forgotPasswordValidation,
};
