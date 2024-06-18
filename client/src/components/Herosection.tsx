import Search from "./Search";

export default function Herosection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 justify-around items-center p-5 mx-8">
      <div className=" flex flex-col justify-center poppins-regular">
        <h1 className="text-4xl m-2">
          Discover sustainable options for <br /> your furry friends
        </h1>
        <p className="m-2 text-xl text-gray-600">
          Browse by category, brand or eco-friendly deals
        </p>
        <div className="mx-2 my-8">
          <Search />
        </div>
      </div>
      <div className="flex justify-center items-align">
        <img src="https://i.postimg.cc/xdvkVtV0/Image.png" alt="" />
      </div>
    </div>
  );
}
