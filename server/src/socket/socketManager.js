const { Server } = require("socket.io");
const { Message, User } = require("../models/userModel");

function setupSocket(server) {
  // console.log("frontend url:", process.env.FRONTEND_URL);
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected", socket.id);
    socket.on("joinRoom", async ({ buyerId, sellerId }) => {
      const roomId = generateRoomId(buyerId, sellerId);
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
      const messages = await Message.find({ roomId });
      io.to(roomId).emit("previousMessages", messages);
      await updateChatRooms(buyerId, sellerId, roomId);
    });
    socket.on("chatChange", async (roomId) => {
      console.log("room changed to ", roomId);
      try {
        const messages = await Message.find({ roomId });
        io.to(roomId).emit("previousMessages", messages);
      } catch (error) {
        console.error("Error changing room:", error);
      }
    });
    socket.on("leaveRoom", ({ roomId }) => {
      socket.leave(roomId);
      console.log(`User left room : ${roomId}`);
    });
    socket.on(
      "sendMessage",
      async ({ roomId, message, sender, senderName }) => {
        const newMessage = new Message({
          roomId,
          content: message,
          sender,
          senderName,
        }); //need itemName and sender's username
        await newMessage.save();

        io.to(roomId).emit("newMessage", newMessage);
      }
    );

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  });
}

function generateRoomId(buyerId, sellerId) {
  return `${buyerId}_${sellerId}`;
}
async function updateChatRooms(buyerId, sellerId, roomId) {
  try {
    // Update chatRooms field for buyer
    await User.findByIdAndUpdate(buyerId, { $addToSet: { chatRooms: roomId } });

    // Update chatRooms field for seller
    await User.findByIdAndUpdate(sellerId, {
      $addToSet: { chatRooms: roomId },
    });
  } catch (error) {
    console.error("Error updating chatRooms:", error);
  }
}

module.exports = { setupSocket };
