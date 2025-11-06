const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    require: true,
    unique: false,
  },
  lastName: {
    type: String,
    require: true,
    unique: false,
  },
  userName: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
