const mongoose = require("mongoose");
var validator = require('validator');

const User = mongoose.model("User", {
  name: {
    type: String,
    require: true,
    trim: true
  },
  email: {
    type: String,
    require: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password can not include (password)");
      }
    }
  },
  age: {
    type: Number,
    require: true,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age can not less than 0");
      }
    }
  }
});

module.exports = User;
