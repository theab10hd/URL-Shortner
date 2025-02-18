const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

exports.logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.signUp = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({ email, password: hashedPassword });
    const userId = user._id;
    generateToken(userId, res);
    await user.save();

    return res.status(201).json({ success: "Signup Successful!", userId });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }
    const userId = user._id;
    generateToken(userId, res);

    return res.status(200).json({ success: "Login Successful!", userId });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.fetchUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    return res.status(200).json({ success: "User Found!", user });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  const { email, password } = req.body;
  const { id } = req.body;

  if (!email && !password) {
    return res.status(400).json({ error: "Email or password is required" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email is already in use" });
      }
      user.email = email;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    await user.save();

    return res.status(200).json({
      success: "User updated successfully!",
      user: {
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error updating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
