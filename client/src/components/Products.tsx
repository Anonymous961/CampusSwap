import { AiOutlineShoppingCart } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpin from "./LoadingSpin";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
interface Item {
  id: string;
  itemname: string;
  condition: string;
  price: number;
  sold: boolean;
  description: string;
  image: string;
}
const Products = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const getItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        import.meta.env.VITE_APP_BACKEND_URL + `api/item/allitems`
      );
      console.log(response.data);
      setItems(response.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  function getClassForCondition(condition:string) {
    switch(condition.toLowerCase()) {
      case 'best':
        return 'text-blue-500'; // Blue color for 'best'
      case 'good':
        return 'text-green-500'; // Green color for 'good'
      case 'bad':
        return 'text-yellow-500'; // Yellow color for 'bad'
      case 'worst':
        return 'text-red-500'; // Red color for 'worst'
      default:
        return ''; // Default color
    }
  }
  useEffect(() => {
    getItems();
  }, []);
  return (
    <section className="grid grid-cols-6 mx-8">
      <div className="rounded-md p-5">
        <h3 className="text-2xl">Filter</h3>
      </div>
      <div className="col-span-5 p-5 border-2">
        <h3 className="text-4xl mx-2 mb-5">All Items</h3>
        <span className="flex justify-center">
          {isLoading && <LoadingSpin />}
        </span>
        <div className="grid grid-cols-4 gap-5 m-2">
          {items.map((item) => {
            return (
              <div
                className="flex flex-col justify-between max-w-sm hover:border-2   rounded-md"
                key={item.id}
              >
                <img
                  className="rounded-t-md object-fill w-full"
                  src={
                    import.meta.env.VITE_APP_BACKEND_URL +
                    "images/" +
                    item.image
                  }
                  alt=""
                />
                <div className="p-2">
                  <div className="flex flex-row justify-between">
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
                  <div className="flex flex-row justify-between">
                    <button className="p-4 w-16 bg-yellow-400 hover:bg-yellow-300 rounded-md shadow-md flex justify-center items-center">
                      <AiOutlineShoppingCart className="" />
                    </button>
                    {item.sold ? (
                      <button className="p-4 w-24 bg-gray-300 rounded-md shadow-md">
                        Sold
                      </button>
                    ) : (
                      <button className="p-4 w-24 bg-slate-800 text-white hover:bg-green-300 rounded-md shadow-md">
                        Buy now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
