import axios from "axios";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { UserAtom } from "../store/atoms/user";

export interface userType {
  fname: string;
  lname: string;
  email: string;
  password: string;
  city: string;
}

export const useSignup = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setUser = useSetRecoilState(UserAtom);
  const signup = async (params: userType) => {
    const { fname, lname, email, password, city } = params;
    try {
      setLoading(true);
      const res = await axios.post(
        import.meta.env.VITE_APP_BACKEND_URL + "api/user/signup",
        { firstname: fname, lastname: lname, username: email, password, city }
      );
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || "An error occured");
        console.error(err);
      } else {
        setError((err as Error).message);
      }
    }
  };
  return { signup, error, isLoading };
};
