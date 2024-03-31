import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

const Search = () => {
    const [results,setResults]=useState(null);
  return (
    <div className="poppins-regular">
        <SearchBar setResults={setResults}/>
        <SearchResults results={results}/>
    </div>
  );
};

export default Search;
