const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
require("dotenv").config();
const key = process.env.KEY_PASS;

exports.sign = async (req, res) => {
  const { email } = req.body;
  //check if email is existing
  if (!email) {
    return res.status(404).json({ message: "Email is required" });
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Email not found" });
  }

  //sign jwt token
  const token = jwt.sign(
    { email: user.email, role: user.role },
    process.env.KEY_PASS,
    { expiresIn: "1h" }
  );
  const userInfo = {
    token: token,
    email: user.email,
    role: user.role,
  };
  res.json(userInfo);
};

exports.addUser = async (req, res) => {
  const { email } = req.body;
  //check if email is existing
  if (!email) {
    return res.status(200).json({ message: "Email is required" });
  }
  try {
    const checkUser = await UserModel.findOne({ email });
    if (checkUser) {
      return res.status(200).json({ message: "Email is already existed" });
    }
    //create new user
    const user = new UserModel({ email });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message:
        "Something error occurred while adding new user" || error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    if (!users) {
      return res.status(200).json({ message: "No Users" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Something error occurred while getting users" || error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, role } = req.body;
  //check if email is existing
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const user = await UserModel.findByIdAndUpdate(
      id,
      { email, role },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Something error occurred while updating users" || error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User was deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Something error occurred while deleting users" || error.message,
    });
  }
};

exports.makeAdmin = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.role = "admin";
    user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message:
        "Something error occurred while updating user role to admin" ||
        error.message,
    });
  }
};
exports.makeUser = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.role = "user";
    user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message:
        "Something error occurred while updating user role to user" ||
        error.message,
    });
  }
};

exports.getRoleByEmail = async (email) => {
  const { email:emailR } = req.params;
  try {
    const user = await UserModel.findOne({ email: emailR });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ role: user.role });
  } catch (error) {
    res.status(500).json({
      message:
        "Something error occurred while getting user role " || error.message,
    });
  }
};
