import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { io } from "socket.io-client";
import { UserAtom } from "../store/atoms/user";
const Chat = () => {
  const user = useRecoilValue(UserAtom);
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = useMemo(() => io("http://localhost:4000"), [roomId]);
  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    socket.emit("sendMessage", {
      roomId,
      message: newMessage,
      sender: user.user.id,
    });
    setNewMessage("");
  };
  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      console.log("connected", socket.id);
      const temp = roomId?.split("_");
      const buyerId = temp[0];
      const sellerId = temp[1];
      socket.emit("joinRoom", { buyerId, sellerId });
    });
    socket.on("previousMessages", (messages) => {
      setMessages(messages);
    });
    socket.on("newMessage", (message) => {
      setMessages([...messages, message]);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket, roomId]);
  return roomId ? (
    <div>
      <h1 className="text-3xl">Chats</h1>
      <div className="max-h-96 overflow-y-scroll">
        {messages &&
          messages.map((msg, index) => (
            <div className="border-2 p-4  border-black" key={index}>
              <p>
                {msg.sender === user.user.id ? (<span className="text-red-500 font-semibold text-xl">You</span>) : `${msg.sender}`}:{" "}
                {msg.content}
              </p>
            </div>
          ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          className="p-4 border-2"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter message"
        />
        <input
          className="bg-blue-400 p-3 rounded-md text-white"
          type="submit"
          value="send"
        />
      </form>
    </div>
  ) : (
    ""
  );
};

export default Chat;
