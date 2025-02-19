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
    return res.status(404).json({ message: "Email is required" });
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
    res
      .status(500)
      .json({
        message:
          "Something error occurred while adding new user" || error.message,
      });
  }
};
