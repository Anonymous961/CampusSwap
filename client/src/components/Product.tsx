import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function Product({
  item,
  getClassForCondition,
  handleCart,
  handleContact,
  user
}) {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col justify-between max-w-sm hover:border-2   rounded-md"
      key={item.id}
    >
      <img
        className="rounded-t-md object-fill w-full"
        src={import.meta.env.VITE_APP_BACKEND_URL + "images/" + item.image}
        onClick={() => navigate(`/item/${item.id}`)}
        alt=""
      />
      <div className="p-2">
        <div className="grid grid-col-1 lg:grid-cols-2 justify-between">
          <h4 className="text-2xl my-2 ">{item.itemname}</h4>
          <p className="text-xl my-2 text-orange-700">₹{item.price}</p>
        </div>
        <p className="my-2 font-medium">
          Condition :
          <span className={getClassForCondition(item.condition)}>
            {item.condition}
          </span>
        </p>
        <p className="font-bold">
          {formatDistanceToNow(new Date(item.createdAt), {
            addSuffix: true,
          })}
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-between">
          <button
            className="p-4 w-full lg:w-24 bg-yellow-400 hover:bg-yellow-300 rounded-md shadow-md flex justify-center items-center"
            onClick={() => {
              if (user) {
                handleCart(item);
              } else {
                navigate("/login");
              }
            }}
          >
            <AiOutlineShoppingCart className="" />
          </button>
          {item.sold ? (
            <button className="p-4 w-full lg:w-24 bg-gray-300 rounded-md shadow-md">
              Sold
            </button>
          ) : (
            <button
              className="p-4 w-full lg:w-24 bg-slate-800 text-white hover:bg-green-300 rounded-md shadow-md"
              onClick={() => handleContact(item)}
            >
              Contact Owner
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
