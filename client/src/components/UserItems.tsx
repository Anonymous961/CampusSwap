import { useNavigate } from "react-router-dom";
import ToggleButton from "./ToggleButton";
import { CartType } from "./Products";
import { UserItemsSkeleton } from "./UserItemSkeleton";

interface UserItemsPropTypes {
  itemList: CartType[];
  isLoading: boolean;
}

const UserItems = ({ itemList, isLoading }: UserItemsPropTypes) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-4xl mb-8">User Items</h2>
        <button
          className="p-2 max-h-14 text-white w-64 bg-slate-700 hover:bg-green-500 ease-in duration-200"
          onClick={() => navigate("/additem")}
        >
          List Item
        </button>
      </div>
      {isLoading ? (
        <UserItemsSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 overflow-y-scroll gap-5 m-2">
          {itemList.map((item) => {
            return (
              <div
                className="flex flex-col justify-between max-w-sm rounded-md hover:border-gray-300 hover:scale-105 hover:shadow-md ease-in duration-200"
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
