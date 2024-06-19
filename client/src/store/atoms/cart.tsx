import axios from "axios";
import { atom, selector } from "recoil";
import { UserAtom } from "./user";

export const CartAtom = atom({
  key: "Cart",
  default: selector({
    key: "fetchcart",
    get: async ({ get }) => {
      const user = await get(UserAtom);
      try {
        const res = await axios.get(
          import.meta.env.VITE_APP_BACKEND_URL + "api/user/cart",
          {
            headers: {
              authorization: "Bearer " + user.token,
            },
          }
        );
        if (!res.data.cart) {
          return [];
        }
        return res.data.cart;
      } catch (error) {
        console.error("Error fetching cart: ", error);
        return [];
      }
    },
  }),
});
