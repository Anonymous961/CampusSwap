const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../models/user.sql");

//signup user
router.post("/signup", async (req, res) => {
  const { username, firstname, lastname, password } = req.body;
  if (!username || !password || !firstname || !lastname) {
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

    const user = await User.create({
      username,
      firstName:firstname,
      lastName:lastname,
      password: hash,
    });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: err.message });
  }
});

//

module.exports = router;
