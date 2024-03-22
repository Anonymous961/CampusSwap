import axios from "axios";

export const updateCart = async (cart,user) => {
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
      console.log(err.response.data.message);
    }
  };