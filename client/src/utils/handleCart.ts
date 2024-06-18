import axios from "axios";
import { Item, User } from "../store/dataTypes";

export const updateCart = async (cart: Item[], user: User) => {
  try {
    const res = await axios.post(
      import.meta.env.VITE_APP_BACKEND_URL + "api/user/cart",
      { cart },
      {
        headers: {
          authorization: "Bearer " + user.token,
        },
      }
    );
    console.log(res.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {

      console.log(err.response?.data.message);
    } else {
      console.log((err as Error).message)
    }
  }
};