const User = require("../models/User");
const bcrypt = require("bcrypt");
//signup
const signupController = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: "body is required",
    });
  }

  const { firstName, lastName, userName, password, email } = req.body;

  const passwordRegx =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  if (!firstName || !lastName || !userName || !password || !email) {
    return res.status(400).json({
      success: false,
      message: "username or password or email is required",
    });
  }

  if (!passwordRegx.test(password)) {
    return res.status(400).json({
      success: false,
      message: "password should be 8 characters should be uppercase....",
    });
  }

  try {
    const SALT_ROUNDS = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = new User({
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      password: hashedPassword,
      email: email,
    });

    await user.save();
    res.status(201).json({
      sucess: true,
      message: "user created successfully",
      data: user,
    });
  } catch (error) {
    console.log("signup error", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//getuser controller
const getuserController = async (req, res) => {
  try {
    const users = await User.find({ username: "kritiiiii" });
    res.status(200).json({
      success: true,
      message: "user fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
  await User.find({});
};

//updateduserController
const updatedUserController = async (req, res) => {
  const { filter, nameToChange } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { userName: filter },
      { userName: nameToChange }
    );
    res.status(200).json({
      success: true,
      message: "user updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

//deleteuserController

const deleteUserController = async (req, res) => {
  const { userName } = req.body;
  try {
    const deletedUser = await User.findOneAndUpdate({ userName: userName });
    res.status(200).json({
      success: true,
      message: "user deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

//login controller
const loginController = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName, password });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed, User not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed, User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User loged in successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  signupController,
  loginController,
  getuserController,
  updatedUserController,
  deleteUserController,
};
