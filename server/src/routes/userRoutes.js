const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../models/user.sql");
const UserMongo = require("../models/userModel");
const jwt = require("jsonwebtoken");

//signup user
function createToken(_id, username) {
  return jwt.sign({ _id, username }, process.env.SECRET, { expiresIn: "3d" });
}

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
      firstName: firstname,
      lastName: lastname,
      password: hash,
    });
    const userMongo = await UserMongo.create({ username });
    const token = createToken(user.id, username);
    res.json({ user, userMongo, token });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: err.message });
  }
});

//login user
router.post("/login", async (req, res) => {
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
    res.json({ username: user.username, token });
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err.message);
  }
});

// //delete user
router.delete("/:username", async(req, res) => {
  const {username}=req.params;
  try {
    const response= await User.destroy({
      where:{username}
    })
    const deleteFromMongo= await UserMongo.findOneAndDelete({username:username})
    res.json("User deleted successfully");
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err.message);
  }
});

//get user details
router.get("/:username",async(req,res)=>{
  const {username}=req.params;
  try {
    const user=await User.findOne({where:{username}});
    const userMongo= await UserMongo.findOne({username});
    res.json({user, userMongo})
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err.message);
  }
});

// //update user details
// router.patch("/:username",async);

module.exports = router;
