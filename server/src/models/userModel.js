const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  itemListId: [
    {
      type: mongoose.Schema.Types.UUID,
    },
  ],
  cart:[
    {
      type: mongoose.Schema.Types.UUID
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
