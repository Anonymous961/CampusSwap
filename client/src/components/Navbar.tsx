import { FaCartPlus, FaUser } from "react-icons/fa";
const Navbar = () => {
  return (
      <div className="flex flex-row justify-between p-2 px-4 mx-8 my-5 border-b-2  border-gray-300 shadow-lg poppins-regular">
        <div className="flex flex-row items-center justify-between gap-10">
          {/* <h1 className="text-5xl ">CampusSwap</h1>
           */}
          <img
            src="https://i.postimg.cc/dVrQJR9g/campus-Swap-Png.png"
            width={"100px"}
          />

          <ul className="flex flex-row items-center gap-5">
            <li className="p-2 text-xl">Home</li>
            <li className="p-2 text-xl">Contact</li>
            <li className="p-2 text-xl">About</li>
          </ul>
        </div>
        <div className="flex justify-items-end items-center gap-10">
          <FaCartPlus className="text-4xl" />
          <FaUser className="text-4xl" />
        </div>
      </div>
  );
};

export default Navbar;
