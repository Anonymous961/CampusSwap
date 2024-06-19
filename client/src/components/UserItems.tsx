import { useNavigate } from "react-router-dom";
import ToggleButton from "./ToggleButton";
import { CartType } from "./Products";
import { UserItemsSkeleton } from "./UserItemSkeleton";
import { getClassForCondition } from "../utils/ClassHelper";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../store/atoms/user";
import { useState } from "react";
import { InfoAlert } from "./InfoAlert";

interface UserItemsPropTypes {
  itemList: CartType[];
  isLoading: boolean;
  setItemList: (item: CartType[]) => void;
}

const UserItems = ({
  itemList,
  isLoading,
  setItemList,
}: UserItemsPropTypes) => {
  const user = useRecoilValue(UserAtom);
  const navigate = useNavigate();
  const [info, setInfo] = useState<boolean>(false);
  async function handleDelete(item: CartType) {
    const newItemList = itemList.filter((i) => {
      return item.id !== i.id;
    });
    setItemList(newItemList);
    try {
      console.log("delete press ", item);
      console.log(item.id);
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_BACKEND_URL}api/item/deleteitem/${item.id}`,
        {
          headers: {
            username: user.username,
            authorization: "Bearer " + user.token,
          },
        }
      );
      if (response.status === 200) {
        setInfo(true);
        setTimeout(() => {
          setInfo(false);
        }, 5000);
      }
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="pb-4">
      {info && <InfoAlert />}
      <div className="flex justify-between">
        <h2 className="text-4xl mb-8">User Items</h2>
        <button
          className="p-2 max-h-14 text-white w-64 bg-slate-700 hover:bg-green-500 hover:rounded-md ease-in duration-200"
          onClick={() => navigate("/additem")}
        >
          List Item
        </button>
      </div>
      {isLoading ? (
        <UserItemsSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 m-2">
          {itemList.map((item) => {
            return (
              <div
                className="flex flex-col justify-between max-w-sm rounded-md hover:border-gray-300 hover:scale-105 hover:shadow-md ease-in duration-200 relative"
                key={item.id}
              >
                <div className=" z-10 absolute top-2 hover:bg-red-400 hover:scale-105 p-2 rounded-md ease-in duration-200 hover:shadow-md">
                  <FaRegTrashAlt size={30} onClick={() => handleDelete(item)} />
                </div>
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
                  <p
                    className={`my-2 font-medium ${getClassForCondition(
                      item.condition
                    )}`}
                  >
                    Condition: {item.condition}
                  </p>
                  {item.sold ? (
                    <button className="p-4 w-24 bg-gray-300 rounded-md shadow-md">
                      Resell
                    </button>
                  ) : (
                    <ToggleButton />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserItems;
