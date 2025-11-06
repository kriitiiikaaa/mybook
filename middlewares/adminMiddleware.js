const adminMiddleware = (req, res, next) => {
  console.log("admin middleware called");
  const adminName = "Kritika";
  if (adminName === "Kritika") {
    next();
  } else {
    res.status(401).send("You are not authorized to access admin routes");
  }
};
module.exports = adminMiddleware;
