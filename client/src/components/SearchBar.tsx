import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { Item } from "../store/dataTypes";
import { CartType } from "./Products";

export interface SearchBarType {
  setResults: (results: Array<CartType>) => void;
}

const SearchBar = ({ setResults }: SearchBarType) => {
  const [input, setInput] = useState("");
  const fetchData = (value: string) => {
    axios
      .get(import.meta.env.VITE_APP_BACKEND_URL + `api/item/allitems`)
      .then((res) => {
        const newValue = value.toLowerCase();
        const results = res.data.filter((item: Item) => {
          return (
            item &&
            item.itemname &&
            item.itemname.toLowerCase().includes(newValue)
          );
        });

        setResults(results);
      });
  };
  const handleChange = (value: string) => {
    if (!value) {
      setResults([]);
    }
    setInput(value);
    fetchData(value);
  };
  return (
    <div className="flex items-center input-wrapper gap-2 border-2 border-gray-700 p-3">
      <FaSearch
        className="  bg-white text-blue-800"
        size={25}
        id="search-icon"
      />
      <input
        type="text"
        className="focus:outline-none text-2xl w-full"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Type to search"
      />
    </div>
  );
};

export default SearchBar;
