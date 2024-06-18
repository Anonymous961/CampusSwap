import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useRecoilState, useRecoilValue } from "recoil";
import { CartAtom } from "../store/atoms/cart";
import { Item } from "../store/dataTypes";
import { UserAtom } from "../store/atoms/user";
import { CartType } from "../components/Products";
import { CustomButton } from "../components/CustomButton";
import { ItemSkeleton } from "../components/ItemDetailsSkeleton";

const ItemPage = () => {
  const [item, setItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const [cart, setCart] = useRecoilState(CartAtom);
  const productId = params.id;
  const user = useRecoilValue(UserAtom);
  const navigate = useNavigate();
  const fetchItem = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}api/item/allitems/${productId}`
      );
      setItem(res.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const handleContact = (item: Item) => {
    const buyerId = user.user.id;
    const sellerId = item.ownerId;
    navigate(`/chats/${buyerId}_${sellerId}`);
  };
  const handleCart = (item: Item) => {
    const existingItemIndex = cart.findIndex(
      (cartItem: Item) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      setCart((prevCart: CartType[]) => {
        const updatedCart = prevCart.map((cartItem, index) => {
          if (index === existingItemIndex) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        });
        return updatedCart;
      });
    } else {
      const newItem: Item = { ...item, quantity: 1 };
      setCart([...cart, newItem]);
    }
  };
  useEffect(() => {
    fetchItem();
  }, []);
  return (
    <section className="flex flex-col justify-center min-h-screen p-4">
      <div className="poppins-regular">
        {isLoading ? (
          <ItemSkeleton />
        ) : (
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl mb-10">Item details</h1>
            {item && (
              <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2">
                <img
                  className="rounded-t-md w-full"
                  src={
                    `${import.meta.env.VITE_APP_BACKEND_URL}` +
                    "images/" +
                    item.image
                  }
                  alt=""
                />
                <div className=" p-10">
                  <div>
                    <h1 className="text-4xl mb-5">{item.itemname}</h1>
                    <p className="text-2xl text-gray-500 mb-4">
                      {item.description}
                    </p>
                    <p className="text-gray-800 text-2xl mb-10">
                      Location :
                      <span className="text-blue-400">{item.city}</span>
                    </p>
                    <p className="text-red-300 text-3xl mb-10">
                      Rs{item.price}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-2">
                    <CustomButton
                      onClick={() => handleContact(item)}
                      label={"Contact Owner"}
                    />
                    <CustomButton
                      onClick={() => handleCart(item)}
                      label={<AiOutlineShoppingCart size={30} />}
                      color="yellow"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ItemPage;
