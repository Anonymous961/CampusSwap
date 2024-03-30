import axios from "axios";

import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import LoadingSpin from "../components/LoadingSpin";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { CartAtom } from "../store/atoms/cart";
import { Item } from "../store/dataTypes";

const ItemPage = () => {
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const [cart, setCart] = useRecoilState(CartAtom);
  const productId = params.id;
  console.log(productId);
  const fetchItem = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `http://localhost:4000/api/item/allitems/${productId}`
      );
      console.log(res.data);
      setItem(res.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const handleCart = (item: Item) => {
    const existingItemIndex = cart.findIndex(
      (cartItem: Item) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      setCart((prevCart) => {
        const updatedCart = prevCart.map((cartItem, index) => {
          if (index === existingItemIndex) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        });
        return updatedCart;
      });
    } else {
      // Item doesn't exist in the cart, add it with quantity 1
      const newItem: Item = { ...item, quantity: 1 };
      setCart([...cart, newItem]);
    }
  };
  useEffect(() => {
    fetchItem();
  }, []);
  return (
    <section className="flex flex-col justify-center p-5">
      <div className="poppins-regular border-2 shadow-lg p-8">
        {/* <h1 className="text-4xl">{item.itemname}</h1> */}

        {isLoading ? (
          <LoadingSpin />
        ) : (
          <div>
            <h1 className="text-4xl mb-10">Item details</h1>
          </div>
        )}
        {item && (
          <div className="flex justify-around">
            <img
              className="rounded-t-md w-96"
              src={"http://localhost:4000/" + "images/" + item.image}
              alt=""
            />
            <div className="">
              <div>
                <h1 className="text-4xl mb-5">{item.itemname}</h1>
                <p className="text-2xl text-gray-500 mb-4">{item.description}</p>
                <p className="text-red-300 text-3xl mb-10">Rs{item.price}</p>
              </div>
              <div className="flex gap-5">
                <button className="p-4 w-24 bg-slate-800 text-white hover:bg-green-300 rounded-md shadow-md">
                  Contact Owner
                </button>
                <button
                  className="p-4 w-16 bg-yellow-400 hover:bg-yellow-300 rounded-md shadow-md flex justify-center items-center"
                  onClick={() => handleCart(item)}
                >
                  <AiOutlineShoppingCart className="" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ItemPage;
