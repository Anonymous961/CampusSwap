import { useNavigate } from "react-router-dom";
import LoadingSpin from "./LoadingSpin";
import ToggleButton from "./ToggleButton";

const UserItems = ({itemList,isLoading}) => {
    const navigate=useNavigate();
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-4xl mb-8">User Items</h2>
        <button
          className="p-2 text-white bg-green-600 hover:bg-green-500 rounded-md"
          onClick={() => navigate("/additem")}
        >
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
              className="flex flex-col justify-between max-w-sm rounded-md hover:border-gray-300 hover:border-2"
              key={item.id}
            >
              <img
                className="rounded-t-md object-fill w-full"
                src={
                  import.meta.env.VITE_APP_BACKEND_URL + "images/" + item.image
                }
                alt=""
              />
              <div className="p-2">
                <div className="flex flex-row justify-between">
                  <h4 className="text-xl my-2">{item.itemname}</h4>
                  <p className="text-xl my-2">₹{item.price}</p>
                </div>
                <p className="my-2">Condition: {item.condition}</p>
                {/* <div className="flex flex-row "> */}
                {item.sold ? (
                  <button className="p-4 w-24 bg-gray-300 rounded-md shadow-md">
                    Resell
                  </button>
                ) : (
                  <ToggleButton />
                )}
                {/* </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserItems;
