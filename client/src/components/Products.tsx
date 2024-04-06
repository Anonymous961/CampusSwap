import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpin from "./LoadingSpin";

import { useRecoilState, useRecoilValue } from "recoil";
import { CartAtom } from "../store/atoms/cart";
import { Item } from "../store/dataTypes";
import { useNavigate } from "react-router-dom";
import { UserAtom } from "../store/atoms/user";
import Product from "./Product";

const Products = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useRecoilState(CartAtom);
  const [filter, setFilter] = useState("allitems");
  const user = useRecoilValue(UserAtom);
  console.log(filter);
  const navigate = useNavigate();
  const getItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        import.meta.env.VITE_APP_BACKEND_URL + `api/item/allitems`
      );
      setItems(response.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  const handleContact = (item: Item) => {
    const buyerId = user.user.id;
    const sellerId = item.ownerId;
    navigate(`/chats/${buyerId}_${sellerId}`);
  };
  function getClassForCondition(condition: string) {
    switch (condition.toLowerCase()) {
      case "best":
        return "text-blue-500"; // Blue color for 'best'
      case "good":
        return "text-green-500"; // Green color for 'good'
      case "bad":
        return "text-yellow-500"; // Yellow color for 'bad'
      case "worst":
        return "text-red-500"; // Red color for 'worst'
      default:
        return ""; // Default color
    }
  }
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
    getItems();
  }, []);
  return (
    <section className="grid lg:grid-cols-6 grid-cols-1 mx-8">
      <div className="rounded-md p-5">
        <h3 className="text-3xl font-semibold">Filter</h3>
        <div>
          <input
            type="radio"
            value="allitems"
            checked={filter === "allitems"}
            onChange={() => setFilter("allitems")}
            name="filter"
            id="allItems"
          />
          <label htmlFor="allItems">All items</label>
        </div>
        {user && (
          <div>
            <input
              type="radio"
              value="mycity"
              checked={filter === "mycity"}
              onChange={() => setFilter("mycity")}
              name="filter"
              id="myCity"
            />
            <label htmlFor="myCity">My City</label>
          </div>
        )}
      </div>
      <div className="lg:col-span-5 p-5 border-2">
        <h3 className="text-4xl mx-2 mb-5">All Items</h3>
        <span className="flex justify-center">
          {isLoading && <LoadingSpin />}
        </span>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-2">
          {items.map((item: Item) => {
            if (filter === "mycity") {
              if (item.city === user.user.city) {
                return (
                  <Product
                    key={item.id}
                    item={item}
                    getClassForCondition={getClassForCondition}
                    handleCart={handleCart}
                    handleContact={handleContact}
                    user={user}
                  />
                );
              }
            } else {
              return (
                <Product
                  key={item.id}
                  item={item}
                  getClassForCondition={getClassForCondition}
                  handleCart={handleCart}
                  handleContact={handleContact}
                  user={user}
                />
              );
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
