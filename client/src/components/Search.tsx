const Search = () => {
    return ( 
        <div className="flex gap-2">
            <input type="text" placeholder="Search for sustainable products" className="border-2 p-4 border-gray-500 w-80"/>
            <input className="border-2 border-black p-4 font-bold" type="submit" value="Search" />
        </div>
     );
}
 
export default Search;