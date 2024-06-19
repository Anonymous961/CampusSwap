import { FaCartPlus, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../store/atoms/user";
import { Avatar } from "./Avatar";

const Navbar = () => {
  const navigate = useNavigate();
  const User = useRecoilValue(UserAtom);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 p-2  border-b-2  border-gray-300 shadow-lg poppins-regular">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:col-span-2 gap-15">
        <div className="flex justify-center">
          <img
            src="https://i.postimg.cc/BvXyZQcc/campus-Swaplogo.png"
            width={"100px"}
            className="hover:animate-tada"
            onClick={() => navigate("/")}
          />
        </div>

        <ul className="grid grid-cols-1 text-center lg:grid-cols-4 md:grid-cols-2 items-center gap-5 ">
          <Nav path={"/"} label={"Home"} />
          <Nav path={"/contact"} label={"Contact"} />
          {/* <Nav path={"/about"} label={"About"} /> */}
          {User && <Nav path={"/chats"} label={"Chats"} />}
        </ul>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        <div className="flex justify-center lg:justify-end m-5">
          {User && (
            <Link to="/cart">
              <FaCartPlus className="text-4xl" />
            </Link>
          )}
        </div>
        <div className="flex justify-center lg:justify-start">
          <Link to={User ? "/profile" : "/login"}>
            {User ? (
              <Avatar name={User.user.firstName.toUpperCase()} size="big" />
            ) : (
              <FaUser className="text-4xl" />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};
interface NavType {
  label: string;
  path: string;
}

export function Nav({ label, path }: NavType) {
  return (
    <Link to={path}>
      <li className="p-2 text-xl hover:scale-105 ease-in duration-200">
        {label}
      </li>
    </Link>
  );
}

export default Navbar;
