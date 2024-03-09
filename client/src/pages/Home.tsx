import Search from "../components/Search";
import Products from "../components/Products";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { UserAtom } from "../store/atoms/user";

const Home = () => {
  const setUser=useSetRecoilState(UserAtom);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      // console.log(user);
      setUser(user);
    }
  }, []);
  return (
    <div>
      <div className="flex flex-row justify-around items-center p-5  mx-8">
        <div className="poppins-regular">
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
        <img src="https://i.postimg.cc/xdvkVtV0/Image.png" alt="" />
      </div>
      <Products />
    </div>
  );
};

export default Home;
