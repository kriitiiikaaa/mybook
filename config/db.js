const mongoose = require("mongoose");
// const dotenv = require("dotenv");
require("dotenv").config();

const connectDb = async () => {
  try {
    // mongoose.connect(
    //   "mongodb+srv://kritiiiiiii:myBook12@mybookcluster.o6wjosk.mongodb.net/"
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = { connectDb };
