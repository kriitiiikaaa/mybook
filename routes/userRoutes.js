const {
  getuserController,
  updatedUserController,
  deleteUserController,
} = require("../controllers/userController");

const express = require("express");

const router = express.Router();

router.get("/getUser", getuserController);
router.patch("/updateUser", updatedUserController);
router.delete("/deleteUser", deleteUserController);

module.exports = router;
