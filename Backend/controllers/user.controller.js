const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
require("dotenv").config();
const key = process.env.KEY_PASS;

exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({
      massage: "Please provide all required fields!",
    });
    return;
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await UserModel.create({
      username,
      password: hashedPassword,
    });
    res.status(200).send({
      message: "User register successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.massage ||
        "Something error occurred while registering a new user",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({
      message: "Please provide all required fields!",
    });
    return;
  }

  try {
    // Check if user exists
    const user = await UserModel.findOne({ username });
    if (!user) {
      res.status(404).send({
        message: "User not found!",
      });
      return;
    }

    // Compare provided password with stored hashed password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      res.status(401).send({
        message: "Invalid credentials!",
      });
      return;
    }
    //login success
    jwt.sign({ username, id: user._id }, key, {}, (err, token) => {
      if (err)
        return res.send(500).send({
          message: "Internal server error : Cannot login",
        });
         //token generated
        res.send({
          message: "Login successful!",
          id:user._id,
          username: user.username,
          accessToken: token,
        });
    });
    // const token = jwt.sign({ id: user.username }, key, {
    //   expiresIn: 86400,
    // });

  } catch (error) {
    res.status(500).send({
      message: error.message || "Something went wrong while logging in",
    });
  }
};

