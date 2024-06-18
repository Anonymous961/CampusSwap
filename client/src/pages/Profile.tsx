import { useEffect, useState } from "react";
import { useLogout } from "../hooks/useLogout";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../store/atoms/user";
import UserDetails from "../components/UserDetails";
import UserItems from "../components/UserItems";
import { UserDetailsType } from "../store/dataTypes";

const Profile = () => {
  const { logout } = useLogout();
  const [isLoading, setIsLoading] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [userDetails, setUserDetails] = useState<UserDetailsType | null>(null);
  const [userCreateDate, setUserDate] = useState<string | null>(null);
  const user = useRecoilValue(UserAtom);

  const getUserItems = async () => {
    try {
      setIsLoading(true);
      const List = await axios.get(
        import.meta.env.VITE_APP_BACKEND_URL + "api/item/userItem",
        {
          headers: {
            username: user.username,
            authorization: "Bearer " + user.token,
          },
        }
      );
      setItemList(List.data.itemList);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (axios.isAxiosError(err)) {
        console.log(err.response?.status);
        if (err.response?.status === 405) {
          logout();
        }
        console.log(err.response?.data);
      } else {
        console.error("An unexpected error occurred:", err);
      }
    }
  };
  useEffect(() => {
    getUserItems();
    if (user != null) {
      setUserDetails(user.user);
      console.log(user.user);
    }
    const date = new Date(user.user.createdAt).toDateString();
    setUserDate(date);
  }, []);
  return (
    <section className="flex flex-col justify-center p-5">
      <div className="poppins-regular shadow-lg p-8">
        {/* <h1 className="text-4xl">Profile</h1> */}
        <UserDetails
          userCreateDate={userCreateDate}
          userDetails={userDetails}
          itemList={itemList}
        />
        <UserItems itemList={itemList} isLoading={isLoading} />
        <div>
          <button
            className="bg-red-500 hover:bg-red-400 p-4 rounded-md text-white"
            onClick={logout}
          >
            Sign Out
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
