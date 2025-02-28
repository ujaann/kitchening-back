const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config();
const User = require("../models/User");
const SECRET_KEY = process.env.SECRET_KEY;
const { OK, INTERNAL_SERVER_ERROR, CREATED, FORBIDDEN, BAD_REQUEST } = require("../utils/constants/http");

const findAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(OK).json(users);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json(error);
  }
};

const register = async (req, res) => {
  try {
    const { username, password, email, image } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const cred = new User({ username, password: hashedPassword, email, image });
    await cred.save();
    res.status(CREATED).json(cred);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json(error);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const cred = await User.findOne({ username });
    if (!cred || !(await bcrypt.compare(password, cred.password))) {
      return res.status(FORBIDDEN).send("Invalid username or password");
    }
    //TODO add role here
    const token = jwt.sign({ username: cred.username }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(OK).json({ token });
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ error: error });
  }
};

const findById = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    res.status(OK).json(user);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json(error);
  }
};

const deleteById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const result = await user.deleteOne();
    res
      .status(OK
      )
      .json({ message: `User: '${user.username}' deleted`, ...result });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json(error);
  }
};

const update = async (req, res) => {
  const updated = req.body;
  const user = User.findByIdAndUpdate(req.params.id, updated);
  res
    .status(OK)
    .json({ message: `User: '${user.username}' updated`, ...user });
};

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(BAD_REQUEST).json({ message: "No files were uploaded." });
    } else {
      res.status(OK).json({ success: true, file: req.file.filename });
    }
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json(error);
  }
};

const getImage=async(req,res)=>{
const { imageName } = req.params;
  console.log(imageName);
  const filePath = path.join(__dirname, `../public/uploads/profile/${imageName}`);
  console.log(filePath);
  res.sendFile(filePath);
}
module.exports = { findAll, register, findById, deleteById, update, login, uploadImage ,getImage};
