const express = require("express");
const {
  signupController,
  loginController,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signupController);
router.get("/login", loginController);

module.exports = router;
