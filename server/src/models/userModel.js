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

const messageSchema=new Schema({
  sender:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  content:{
    type:String,
    required:true
  },
  timestamp:{
    type:Date,
    default:Date.now
  },
  roomId:{
    type:String,
    required:true
  },
  senderName:{
    type:String,
    required:true
  }
})

const chatSchema=new Schema({
  participants:[{
    type:Schema.Types.ObjectId,
    ref:"User"
  }],
  messages:[messageSchema]
})

const userSchema = new Schema({
  username: String,
  itemListId: [
    {
      type: mongoose.Schema.Types.UUID,
    },
  ],
  cart:[cartItemSchema],
  online:{
    type:Boolean,
    default:false
  },
  chatRooms:[{
    type:String
  }]
});

const User = mongoose.model('User', userSchema);
const Message = mongoose.model('Message', messageSchema);
const Chat= mongoose.model('Chat',chatSchema)
module.exports = {User,Message,Chat};

