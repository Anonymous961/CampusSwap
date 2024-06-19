import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Item, User } from "../store/dataTypes";
import { CustomButton } from "./CustomButton";
import { getClassForCondition } from "../utils/ClassHelper";

export interface ProductType {
  item: Item;
  handleCart: (item: Item) => void;
  handleContact: (item: Item) => void;
  user: User;
}

export default function Product({
  item,
  handleCart,
  handleContact,
  user,
}: ProductType) {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col justify-between max-w-sm hover:scale-105 hover:shadow-lg hover:bg-white ease-in duration-300 rounded-md cursor-pointer"
      key={item.id}
    >
      <img
        className="rounded-t-md object-fill w-full"
        src={import.meta.env.VITE_APP_BACKEND_URL + "images/" + item.image}
        onClick={() => navigate(`/item/${item.id}`)}
        alt=""
      />
      <div>
        <div className="p-2">
          <h4 className="text-2xl my-2 ">{item.itemname}</h4>
          <p className="text-xl my-2 text-orange-700 ">₹{item.price}</p>
          <p
            className={`my-2 font-medium ${getClassForCondition(
              item.condition
            )}`}
          >
            Condition: {item.condition}
          </p>
          <p className="font-bold">
            {formatDistanceToNow(new Date(item.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-between">
          <CustomButton
            onClick={() => {
              if (user) {
                handleCart(item);
              } else {
                navigate("/login");
              }
            }}
            label={<AiOutlineShoppingCart size={30} />}
            color="yellow"
          />
          {item.sold ? (
            <button className="p-4 w-full lg:w-24 bg-gray-300 rounded-md shadow-md">
              Sold
            </button>
          ) : (
            <CustomButton
              onClick={() => handleContact(item)}
              label={"Contact Owner"}
            />
          )}
        </div>
      </div>
    </div>
  );
}
