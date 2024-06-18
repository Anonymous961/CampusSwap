import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import { CartType } from "./Products";

const Search = () => {
  const [results, setResults] = useState<CartType[] | null>(null);
  return (
    <div className="poppins-regular">
      <SearchBar setResults={setResults} />
      <SearchResults results={results} />
    </div>
  );
};

export default Search;
