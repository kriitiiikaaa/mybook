const express = require("express");

const User = require("./models/User");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const { connectDb } = require("./config/db");
// const {
//   getuserController,
//   updatedUserController,
//   deleteUserController,
// } = require("./controllers/userController");

const server = express();
server.use(express.json());

connectDb()
  .then(() => {
    console.log("database is connected");
  })
  .catch((err) => {
    console.log("something went wrong on connection of database", err);
  });

// //controllers
// server.get("/profile", adminProfile);
// server.get("/user", userProfile);

//middleware
// server.use("/admin", adminMiddleware);

//......
// server.post("/signup", signupController);
// server.post("/login", loginController);

server.use("/auth", authRoutes);
server.use("/user", userRoutes);
// server.get("/getUser", getuserController);

// server.patch("/updateUser", updatedUserController);

// server.delete("/deleteUser", deleteUserController);

//read
// const users = await User.find(userName: "kritiiiii");

// res.status(201).json({
//   success: true,
//   message: "User fetched successfully ",
//   data: user,
// });

// await User.find();

server.listen(5545, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is connected Successfully");
  }
});

server.post("/insertData", async (req, res) => {
  const obj = {
    firstName: "Kritika",
    lastName: "Chaudhary",
    username: "kritii27",
    password: "password123",
    email: "kritii@gmail.com",
  };

  const user = new User(obj);

  await user.save();
  res.send(`User inserted successfully`, User);
});
