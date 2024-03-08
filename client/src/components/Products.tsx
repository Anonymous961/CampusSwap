import { AiOutlineShoppingCart } from "react-icons/ai";
import axios from 'axios';
import {useEffect, useState} from 'react'
interface Item{
  id:string,
  itemname:string,
  condition:string,
  price:number,
  sold:boolean,
  description:string,
  image:string
}
const Products = () => {
  const [items,setItems]=useState<Item[]>([]);
  const getItems=async()=>{
    try {
      const response=await axios.get(import.meta.env.VITE_APP_BACKEND_URL+`api/item/allitems`)
      console.log(response.data)
      setItems(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(()=>{
    getItems();
  },[])
  return (
    <section className="grid grid-cols-6 mx-8">
      <div className="rounded-md p-5">
        <h3 className="text-2xl">Filter</h3>
      </div>
      <div className="col-span-5 p-5 ">
        <h3 className="text-3xl mx-2 mb-5">All Items</h3>
        <div className="grid grid-cols-4 gap-5 m-2">
          {items.map((item) => {
            return (
              <div
                className="flex flex-col justify-between max-w-sm border-2 border-gray-300 rounded-md"
                key={item.id}
              >
                <img
                  className="rounded-t-md object-fill w-full"
                  src={import.meta.env.VITE_APP_BACKEND_URL+'images/'+item.image}
                  alt=""
                />
                <div className="p-2">
                  <div className="flex flex-row justify-between">
                    <h4 className="text-xl my-2">{item.itemname}</h4>
                    <p className="text-xl my-2">₹{item.price}</p>
                  </div>
                  <p className="my-2">Condition: {item.condition}</p>
                  <div className="flex flex-row justify-between">
                    <button className="p-4 w-16 bg-yellow-300 rounded-md shadow-md flex justify-center items-center">
                      <AiOutlineShoppingCart className="" />
                    </button>
                    {item.sold ? (
                      <button className="p-4 w-24 bg-gray-300 rounded-md shadow-md">
                        Sold
                      </button>
                    ) : (
                      <button className="p-4 w-24 bg-green-300 rounded-md shadow-md">
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
