import { useNavigate } from "react-router-dom";
import { CartType } from "./Products";

interface SearchResultsType {
  results: Array<CartType> | null;
}

const SearchResults = ({ results }: SearchResultsType) => {
  const navigate = useNavigate();
  return (
    <div className="w-full rounded-md shadows mt-2 overflow-y-scroll max-h-32 no-scrollbar text-xl">
      {results &&
        results.map((item: CartType, id: number) => {
          return (
            <div
              className="p-1 text-gray-700 hover:bg-slate-100"
              onClick={() => navigate(`/item/${item.id}`)}
              key={id}
            >
              {item.itemname}
            </div>
          );
        })}
      {results && results.length === 0 && <h2>No results found</h2>}
    </div>
  );
};

export default SearchResults;
