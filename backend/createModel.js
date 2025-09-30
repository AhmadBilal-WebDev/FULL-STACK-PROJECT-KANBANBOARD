const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

schema.pre("save", async function (next) {
  const data = this;
  if (!data.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    next();
  } catch (error) {
    return error;
  }
});

const userModel = mongoose.model("user", schema);
module.exports = userModel;
