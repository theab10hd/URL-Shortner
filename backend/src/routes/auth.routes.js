const express = require("express");
const {
  signUp,
  logout,
  login,
  fetchUserById,
  updateUser,
} = require("../controllers/authController");
jwtMiddleware = require("../middlewares/jwtMiddleware");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logout);
router.get("/user/:id", jwtMiddleware, fetchUserById);
router.put("/update", jwtMiddleware, updateUser);

module.exports = router;
