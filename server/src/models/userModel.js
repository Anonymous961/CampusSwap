const mongoose = require("mongoose");
// const cartItemSchema=require("./cartModel");

const Schema = mongoose.Schema;
const cartItemSchema = new Schema({
  condition: String,
  createdAt: Date,
  description: String,
  id: String,
  image: String,
  itemname: String,
  ownerId: String,
  price: Number,
  quantity: Number,
  sold: Boolean,
  updatedAt: Date
});

const userSchema = new Schema({
  username: String,
  itemListId: [
    {
      type: mongoose.Schema.Types.UUID,
    },
  ],
  cart:[cartItemSchema]
});

module.exports = mongoose.model("User", userSchema);
