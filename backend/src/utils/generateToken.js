const jwt = require("jsonwebtoken");

exports.generateToken = (userId, res) => {
  if (!userId) {
    console.log("No User ID Found!");
    return null;
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
