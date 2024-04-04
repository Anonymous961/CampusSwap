import Products from "../components/Products";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { UserAtom } from "../store/atoms/user";
import axios from "axios";
import { CartAtom } from "../store/atoms/cart";
import Herosection from "../components/Herosection";

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
      <Herosection/>
      <Products />
    </div>
  );
};

export default Home;
