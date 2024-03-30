import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { UserAtom } from "../store/atoms/user";
import axios from "axios";
import Chat from "./Chat";

const Chats = () => {
  const user = useRecoilValue(UserAtom);
  const {roomId}=useParams();
  const [chatRooms, setChatRooms] = useState([]);
  const navigate = useNavigate();

  const fetchChats = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_APP_BACKEND_URL + "api/user/chats",
        {
          headers: {
            authorization: "Bearer " + user.token,
          },
        }
      );
      setChatRooms(res.data.chatRooms);
    } catch (error: any) {
      console.log(error.response.data.mesage);
    }
  };
  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <div className="flex">
      <div>
        <h1 className="text-3xl">Chatrooms</h1>
        {chatRooms &&
          chatRooms.map((room, index) => (
            <div
              className="border-2 p-4"
              onClick={() => navigate(`/chats/${room}`)}
              key={index}
            >
              {room}
            </div>
          ))}
      </div>
      {roomId && <Chat user={user} />}
    </div>
  );
};

export default Chats;
