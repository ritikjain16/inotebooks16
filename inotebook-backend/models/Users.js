const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
  },
  confirmPassword: String,
  mobile: {
    type: String,
    minLength: 10,
    maxLength: 10,
  },
});

module.exports = mongoose.model("User", userSchema);
