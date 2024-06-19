import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { CartAtom } from "../store/atoms/cart";
import { Suspense, useEffect, useState } from "react";
import { Item } from "../store/dataTypes";
import { UserAtom } from "../store/atoms/user";
import { updateCart } from "../utils/handleCart";
import { useNavigate } from "react-router-dom";
import LoadingSpin from "../components/LoadingSpin";
import { CartItem } from "../components/CartItem";

const Cart = () => {
  const [cart, setCart] = useRecoilState(CartAtom);
  const user = useRecoilValue(UserAtom);
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const cartLoadable = useRecoilValueLoadable(CartAtom);
  const handleContact = (item: Item) => {
    const buyerId = user.user.id;
    const sellerId = item.ownerId;
    navigate(`/chats/${buyerId}_${sellerId}`);
  };
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
  const handleDecrease = (item: Item) => {
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
    if (cartLoadable.state === "hasValue") {
      updateCart(cart, user);
    }
  }, [cart]);
  return (
    <Suspense fallback={<LoadingSpin />}>
      <section className="flex flex-col justify-center p-5 min-h-screen">
        <div className="poppins-regular border-2 shadow-lg p-8">
          <h1 className="text-3xl">Your Cart!</h1>
          {cart.map((item: Item) => {
            return (
              <CartItem
                item={item}
                navigate={navigate}
                handleDecrease={handleDecrease}
                handleIncrease={handleIncrease}
                handleContact={handleContact}
                handleDelete={handleDelete}
              />
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
    </Suspense>
  );
};

export default Cart;
