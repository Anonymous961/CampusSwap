const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../models/user.sql");
const { User: UserMongo } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const getUserId = require("../utils/getUserId");

function createToken(_id, username) {
  return jwt.sign({ _id, username }, process.env.SECRET, { expiresIn: "3d" });
}

const userSignUp = async (req, res) => {
  const { username, firstname, lastname, password, city } = req.body;
  if (!username || !password || !firstname || !lastname || !city) {
    return res.status(400).json("All fields required!");
  }
  try {
    if (!validator.isEmail(username)) {
      throw Error("Username not valid");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error(
        "Password not strong enough. Password must contain capital letter, small letter, number and symbol."
      );
    }
    const exists = await User.findOne({ where: { username: username } });
    if (exists) {
      throw Error("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const userMongo = await UserMongo.create({ username });
    const user = await User.create({
      id: userMongo.id,
      username,
      firstName: firstname,
      lastName: lastname,
      password: hash,
      city,
    });
    const token = createToken(user.id, username);
    const newUser = Object.fromEntries(
      Object.entries(user.dataValues).filter(
        ([key, value]) => key !== "password"
      )
    );
    res.json({ user: newUser, token });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      throw Error("All fields are required!!");
    }
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      throw Error("User does not exist");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw Error("Password is incorrect!");
    }
    const token = createToken(user.id, username);
    // res.json({ user, userMongo,token });
    const newUser = Object.fromEntries(
      Object.entries(user.dataValues).filter(
        ([key, value]) => key !== "password"
      )
    );
    res.json({ user: newUser, token });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { username } = req.params;
  try {
    const response = await User.destroy({
      where: { username },
    });
    const deleteFromMongo = await UserMongo.findOneAndDelete({
      username: username,
    });
    res.json("User deleted successfully");
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err.message);
  }
};

const getCartDetails = async (req, res) => {
  const { authorization } = req.headers;
  const ownerId = getUserId(authorization);
  try {
    const user = await UserMongo.findOne({ _id: ownerId });
    res.json({ cart: user.cart });
  } catch (err) {
    console.error(err.message);
    res.status(404).json(err.message);
  }
};

const updateCart = async (req, res) => {
  const { authorization } = req.headers;
  const ownerId = getUserId(authorization);
  const { cart } = req.body;
  try {
    // console.log(cart);
    // console.dir(cart, { depth: null });
    const response = await UserMongo.findOneAndUpdate(
      { _id: ownerId },
      { cart },
      { new: true }
    );
    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Cart Updated", res });
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ message: err.message });
  }
};

const getChats = async (req, res) => {
  const { authorization } = req.headers;
  const ownerId = getUserId(authorization);
  // console.log(ownerId);
  try {
    const user = await UserMongo.findOne({ _id: ownerId });
    const chatRooms = user.chatRooms;
    res.json({ chatRooms });
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  userSignUp,
  userLogin,
  deleteUser,
  getCartDetails,
  updateCart,
  getChats,
};
