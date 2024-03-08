import { FaCartPlus, FaUser } from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate=useNavigate();
  return (
    <div className="flex flex-row justify-between p-2 px-4 mx-8 my-5 border-b-2  border-gray-300 shadow-lg poppins-regular">
      <div className="flex flex-row items-center justify-between gap-10">
        <img
          src="https://i.postimg.cc/dVrQJR9g/campus-Swap-Png.png"
          width={"100px"}
          onClick={()=>navigate("/")}
        />

        <ul className="flex flex-row items-center gap-5">
          <Link to="/">
          <li className="p-2 text-xl">Home</li>
          </Link>
          <li className="p-2 text-xl">Contact</li>
          <li className="p-2 text-xl">About</li>
        </ul>
      </div>
      <div className="flex justify-items-end items-center gap-10">
        <FaCartPlus className="text-4xl" />
        <Link to="/login">
          <FaUser className="text-4xl" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
