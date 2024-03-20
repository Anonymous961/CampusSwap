import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

const Search = () => {
    const [results,setResults]=useState([]);
  return (
    <div className="poppins-regular">
        <SearchBar setResults={setResults}/>
        <SearchResults results={results}/>
      {/* <input
        type="text"
        placeholder="Search for sustainable products"
        className="border-2 p-4 border-gray-500 w-80"
      />
      <input
        className="border-2 border-black p-4 font-bold hover:bg-slate-800 hover:text-white"
        type="submit"
        value="Search"
      /> */}
    </div>
  );
};

export default Search;
