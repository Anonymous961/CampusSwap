import { FaRegTrashAlt } from "react-icons/fa";
import { Item } from "../store/dataTypes";
import { CustomButton } from "./CustomButton";

interface CartItemType {
  item: Item;
  navigate: (text: string) => void;
  handleDecrease: (item: Item) => void;
  handleIncrease: (item: Item) => void;
  handleContact: (item: Item) => void;
  handleDelete: (item: Item) => void;
}

export function CartItem({
  item,
  navigate,
  handleDecrease,
  handleIncrease,
  handleContact,
  handleDelete,
}: CartItemType) {
  return (
    <div
      className="items-center grid grid-col-1 lg:grid-cols-6 border-2 p-2"
      key={item.id}
    >
      <img
        src={`${import.meta.env.VITE_APP_BACKEND_URL}/images/${item.image}`}
        className="max-w-48 max-h-36"
        alt=""
        onClick={() => navigate(`/item/${item.id}`)}
      />
      <h3 className="text-2xl">{item.itemname}</h3>
      <div className="flex items-center gap-2">
        <button
          className="border-2 p-4 item-center bg-blue-300 hover:bg-blue-400 rounded-md"
          onClick={() => handleIncrease(item)}
        >
          <span className="text-2xl">+</span>
        </button>
        <p>{item.quantity}</p>
        <button
          className="border-2 p-4 item-center bg-red-300 hover:bg-red-400 rounded-md"
          onClick={() => handleDecrease(item)}
        >
          <span className="text-2xl">-</span>
        </button>
      </div>
      <p className="text-xl text-orange-700"> Rs.{item.price}</p>
      <CustomButton
        onClick={() => handleContact(item)}
        label={"Contact Owner"}
      />
      <div className="flex justify-center">
        <FaRegTrashAlt size={30} onClick={() => handleDelete(item)} />
      </div>
    </div>
  );
}
