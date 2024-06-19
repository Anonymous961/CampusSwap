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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message);
        if (error.response?.status === 405) {
          logout();
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };
  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 poppins-regular p-10 min-h-screen">
      <div className="lg:col-span-2 ">
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
        <div className="lg:col-span-4 w-full flex flex-col justify-center items-center">
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
      {roomId && <Chat />}
    </div>
  );
};

export default Chats;
