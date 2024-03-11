import { useEffect, useState } from "react";
import { useLogout } from "../hooks/useLogout";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../store/atoms/user";
import LoadingSpin from "../components/LoadingSpin";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { logout } = useLogout();
  const [isLoading, setIsLoading] = useState(false);
  const [itemList, setItemList] = useState([]);
  const user = useRecoilValue(UserAtom);
  const navigate=useNavigate();
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
      console.log(List.data);
      setItemList(List.data.itemList);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err.response.data);
    }
  };
  useEffect(() => {
    getUserItems();
  }, []);
  return (
    <section className="flex flex-col justify-center p-5">
      <div className="poppins-regular border-2 shadow-lg p-8">
        <h1 className="text-4xl">Profile</h1>
        <div>
          <h2 className="text-3xl">User Details</h2>
        </div>
        <div>
          <div className="flex justify-between">
            <h2 className="text-3xl">User Items</h2>
            <button className="p-2 text-white bg-green-600 hover:bg-green-500 rounded-md" onClick={()=>navigate("/additem")}>
              Add Item
            </button>
          </div>
          <span className="flex justify-center">
            {isLoading && <LoadingSpin />}
          </span>
          <div className="grid grid-cols-5 gap-5 m-2">
            {itemList.map((item) => {
              return (
                <div
                  className="flex flex-col justify-between max-w-sm border-2 rounded-md"
                  key={item.id}
                >
                  <img
                    className="rounded-t-md object-fill w-full"
                    src={
                      import.meta.env.VITE_APP_BACKEND_URL +
                      "images/" +
                      item.image
                    }
                    alt=""
                  />
                  <div className="p-2">
                    <div className="flex flex-row justify-between">
                      <h4 className="text-xl my-2">{item.itemname}</h4>
                      <p className="text-xl my-2">₹{item.price}</p>
                    </div>
                    <p className="my-2">Condition: {item.condition}</p>
                    <div className="flex flex-row justify-between">
                      {item.sold ? (
                        <button className="p-4 w-24 bg-gray-300 rounded-md shadow-md">
                          Resell
                        </button>
                      ) : (
                        <button className="p-4 w-24 bg-slate-800 text-white hover:bg-green-300 rounded-md shadow-md">
                          Mark As Sold
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <button
            className="bg-red-500 p-4 rounded-md text-white"
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
