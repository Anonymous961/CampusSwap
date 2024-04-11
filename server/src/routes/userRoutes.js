const express = require("express");
const router = express.Router();
// const jwt = require("jsonwebtoken");
const requireAuth = require("../middlewares/requireAuth");
const {
  userSignUp,
  userLogin,
  deleteUser,
  getCartDetails,
  updateCart,
  getChats,
} = require("../controllers/userController");

router.post("/signup", userSignUp);

//login user
router.post("/login", userLogin);

// //delete user
router.delete("/:username", deleteUser);

router.use(requireAuth);
//get user cart details
router.get("/cart", getCartDetails);

//update cart
router.post("/cart", updateCart);

router.get("/chats", getChats);

module.exports = router;
