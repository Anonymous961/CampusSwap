import Search from "../components/Search";
import Products from "../components/Products";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { UserAtom } from "../store/atoms/user";
import axios from "axios";
import { CartAtom } from "../store/atoms/cart";

const Home = () => {
  const setCart = useSetRecoilState(CartAtom);
  const setUser = useSetRecoilState(UserAtom);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await localStorage.getItem("user");
        if (userData) {
          const user = JSON.parse(userData);
          setUser(user);
          if (user.token) {
            const res = await axios.get(
              import.meta.env.VITE_APP_BACKEND_URL + "api/user/cart",
              {
                headers: {
                  authorization: "Bearer " + user.token,
                },
              }
            );
            setCart(res.data.cart);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [setCart, setUser]);
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
