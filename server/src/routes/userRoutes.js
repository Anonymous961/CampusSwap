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

    const userMongo = await UserMongo.create({ username });
    const user = await User.create({
      id:userMongo.id,
      username,
      firstName: firstname,
      lastName: lastname,
      password: hash,
    });
    const token = createToken(user.id, username);
    res.json({ user, token });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
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
    res.status(400).json({message:err.message});
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
    res.status(400).json({message:err.message});
  }
});

//get user cart details
router.get("/cart",async(req,res)=>{
  const {username}=req.body.user;
  try {
    const user=await UserMongo.findOne({username:username});
    res.json({cart:user.cart});
  } catch (err) {
    console.error(err.message);
    res.status(404).json(err.message);
  }
})

//add item to cart
// router.post("/cart/:itemid",async (req,res)=>{
//   const {itemId}=req.params;
//   const {username}=req.body.user;
//   try {
//     const user=await UserMongo.findOneAndUpdate({username},{
//       "$push":{
//         cart:itemId
//       }
//     })
//     res.json({message:"item successfully added",user});
//   } catch (err) {
//     console.error(err.message);
//     res.status(404).json(err.message);
//   } 
// })


// //update user details
// router.patch("/:username",async);

module.exports = router;
