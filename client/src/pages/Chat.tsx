import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { io } from "socket.io-client";
import { UserAtom } from "../store/atoms/user";

const Chat = () => {
  const user = useRecoilValue(UserAtom);
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = useMemo(
    () => io(import.meta.env.VITE_APP_BACKEND_URL),
    [roomId]
  );
  const scrollableDivRef = useRef(null);
  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    socket.emit("sendMessage", {
      roomId,
      message: newMessage,
      sender: user.user.id,
      senderName: user.user.username,
    });
    setNewMessage("");
  };
  useEffect(() => {
    // Scroll to the bottom of the container when the component mounts or updates
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop =
        scrollableDivRef.current.scrollHeight;
    }
  }, [messages]);
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
    <div className="lg:col-span-4 w-full">
      <h1 className="text-3xl">Chats</h1>
      <div
        className="max-h-screen overflow-y-scroll no-scollbar"
        ref={scrollableDivRef}
      >
        {messages &&
          messages.map((msg, index) => (
            <div className="border-2 p-4" key={index}>
              <p>
                {msg.sender === user.user.id ? (
                  <span className="text-red-500 font-semibold text-lg">
                    You
                  </span>
                ) : (
                  <span className="text-blue-400 font-semibold text-lg">
                    {msg.senderName}
                  </span>
                )}
                <br />
                <p className="text-lg">{msg.content}</p>
              </p>
            </div>
          ))}
      </div>
      <form
        className="flex justify-between items-center input-wrapper gap-2  border-2"
        onSubmit={sendMessage}
      >
        <input
          className="p-4 w-full"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter message"
        />
        <input
          className="bg-slate-800 p-3 float-right rounded-md text-white"
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
