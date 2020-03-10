const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
    trim: true
  },
  description: {
    type: String,
    require: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}) 

const Task = mongoose.model("Task",taskSchema);

module.exports = Task
