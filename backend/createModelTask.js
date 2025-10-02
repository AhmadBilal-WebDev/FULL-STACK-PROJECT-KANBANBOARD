const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
});

const taskModel = mongoose.model("task", taskSchema);
module.exports = taskModel;
