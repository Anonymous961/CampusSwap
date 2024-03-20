const SearchResults = ({results}) => {
    return ( 
        <div className="w-full rounded-md shadows mt-2 overflow-y-scroll max-h-32 no-scrollbar text-xl">
            {results.map((item,id)=>{
                return <div className="p-1 text-gray-700 hover:bg-slate-100" key={id}>
                    {item.itemname}
                </div>
            })}
        </div>
     );
}
 
export default SearchResults;