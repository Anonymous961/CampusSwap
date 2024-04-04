import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { UserAtom } from "../store/atoms/user";
import axios from "axios";
import Chat from "./Chat";
import { useLogout } from "../hooks/useLogout";

const Chats = () => {
  const user = useRecoilValue(UserAtom);
  const { roomId } = useParams();
  const [chatRooms, setChatRooms] = useState([]);
  const navigate = useNavigate();
  const { logout } = useLogout();
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
      if (error.response.status === 405) {
        logout();
      }
    }
  };
  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <div className="flex poppins-regular p-10 overflow-y-scroll no-scrollbar h-screen">
      <div className="w-1/4">
        <h1 className="text-3xl">Chatrooms</h1>
        {chatRooms &&
          chatRooms.map((room, index) => (
            <div
              className="border-2 p-4"
              onClick={() => navigate(`/chats/${room}`)}
              key={index}
            >
              {`Chat ${index + 1}`}
            </div>
          ))}
        {chatRooms.length === 0 && <div>No chat room</div>}
      </div>
      {!roomId && (
        <div className="w-3/4 flex flex-col justify-center items-center">
          <img
            className="max-h-96"
            src="https://i.postimg.cc/wvL5GBFZ/chatss.png"
            alt=""
          />
          <h2 className="text-3xl text-gray-700 font-medium">
            Click Chat to Enter
          </h2>
        </div>
      )}
      {roomId && <Chat user={user} />}
    </div>
  );
};

export default Chats;
