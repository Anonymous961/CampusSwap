import { useRecoilState, useRecoilValue } from "recoil";
import { CartAtom } from "../store/atoms/cart";
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect,  useState } from "react";
import { Item } from "../store/dataTypes";
import { UserAtom } from "../store/atoms/user";
import { updateCart } from "../utils/updateCart";
// import {io} from "socket.io-client"
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useRecoilState(CartAtom);
  // const socket = useMemo(() => io("http://localhost:4000"), []);
  const user = useRecoilValue(UserAtom);
  const navigate=useNavigate()
  const [totalAmount, setTotalAmount] = useState<number>(0);
  // console.log(cart)
  // console.log(user);
  const handleContact=(item:Item)=>{
    const buyerId=user.user.id;
    const sellerId=item.ownerId;
    // socket.emit('joinRoom', { buyerId, sellerId });
    navigate(`/chats/${buyerId}_${sellerId}`);
  }
  const getTotalAmount = () => {
    let t = 0;
    cart.map((item: Item) => {
      t = t + item.price * item.quantity;
    });
    setTotalAmount(t);
  };
  const handleDelete = (item: Item) => {
    const newCart = cart.filter((it: Item) => {
      return it.id !== item.id;
    });
    setCart(newCart);
  };
  const handleIncrease = (item: Item) => {
    const updatedCart = cart.map((it: Item) => {
      if (it.id === item.id) {
        return { ...it, quantity: it.quantity + 1 };
      }
      return it;
    });
    setCart(updatedCart);
  };
  const handleDeccrease = (item: Item) => {
    const updatedCart = cart.map((it: Item) => {
      if (it.id === item.id && it.quantity > 1) {
        return { ...it, quantity: it.quantity - 1 };
      }
      return it;
    });
    setCart(updatedCart);
  };
  useEffect(() => {
    getTotalAmount();
    updateCart(cart,user);
  }, [cart]);
  return (
    <section className="flex flex-col justify-center p-5">
      <div className="poppins-regular border-2 shadow-lg p-8">
        <h1 className="text-3xl">Your Cart!</h1>
        {cart.map((item: CartItem) => {
          return (
            <div
              className="items-center grid grid-cols-6 border-2 p-2 m-1"
              key={item.id}
            >
              <img
                src={`${import.meta.env.VITE_APP_BACKEND_URL}/images/${
                  item.image
                }`}
                className="max-w-48 max-h-36"
                alt=""
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
                  onClick={() => handleDeccrease(item)}
                >
                  <span className="text-2xl">-</span>
                </button>
              </div>
              <p className="text-xl text-orange-700"> Rs.{item.price}</p>
              <button className="border-2 p-2 bg-gray-950 text-white hover:text-yellow-300 rounded-md " onClick={()=>handleContact(item)}>
                Contact Owner
              </button>
              <div className="flex justify-center">
                <FaRegTrashAlt size={30} onClick={() => handleDelete(item)} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-around p-8 bg-white border-2">
        <h1 className="text-3xl">Total amount</h1>
        <p className="text-2xl font-semibold text-orange-700">
          Rs. {totalAmount}
        </p>
      </div>
    </section>
  );
};

export default Cart;
