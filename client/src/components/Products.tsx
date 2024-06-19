import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { CartAtom } from "../store/atoms/cart";
import { Item } from "../store/dataTypes";
import { useNavigate } from "react-router-dom";
import { UserAtom } from "../store/atoms/user";
import Product from "./Product";
import { FilterLabel } from "./FilterLabel";
import { ProductsSkeleton } from "./ProductsSkeleton";
import { Pagination } from "./Pagination";

export interface CartType {
  condition: string;
  createdAt: string;
  description: string;
  id: string;
  image: string;
  itemname: string;
  ownerId: string;
  price: number;
  quantity: number;
  sold: boolean;
  updatedAt: string;
  _id: string;
}

export interface PageMetaTypes {
  total: number;
  page: number;
  pages: number;
}

const Products = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useRecoilState(CartAtom);
  const [filter, setFilter] = useState("allitems");
  const [pageMeta, setPageMeta] = useState<PageMetaTypes>({
    total: 0,
    page: 1,
    pages: 0,
  });
  const user = useRecoilValue(UserAtom);
  const navigate = useNavigate();
  const getItems = async (page: number) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        import.meta.env.VITE_APP_BACKEND_URL +
          `api/item/allitems?page=${page}&limit=8`
      );
      setItems(response.data.data);
      setPageMeta(response.data.meta);
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
    getItems(pageMeta.page);
  }, [pageMeta.page]);

  const handlePageChange = (newPage: number) => {
    setPageMeta((prev) => ({ ...prev, page: newPage }));
  };

  if (isLoading) {
    return <ProductsSkeleton />;
  }
  return (
    <section className="grid lg:grid-cols-6 grid-cols-1 mx-8">
      <div className="rounded-md p-5">
        <h3 className="text-3xl font-semibold">Filter</h3>
        <FilterLabel
          checked={filter === "allitems"}
          onChange={() => setFilter("allitems")}
          name="filter"
          id="allItems"
          label="All items"
        />
        {user && (
          <FilterLabel
            checked={filter === "mycity"}
            onChange={() => setFilter("mycity")}
            name="filter"
            id="myCity"
            label="My city"
          />
        )}
      </div>
      <div className="lg:col-span-5 p-5 ">
        <h3 className="text-4xl mx-2 mb-5">All Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 m-2">
          {items.map(
            (item: Item) =>
              (filter !== "mycity" ||
                item.city.toLowerCase() === user.user.city.toLowerCase()) && (
                <Product
                  key={item.id}
                  item={item}
                  handleCart={handleCart}
                  handleContact={handleContact}
                  user={user}
                />
              )
          )}
        </div>
        <div className="w-full flex justify-center m-4">
          <Pagination
            totalPages={pageMeta.pages}
            currentPage={pageMeta.page}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  );
};

export default Products;
