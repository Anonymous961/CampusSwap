import axios from "axios";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { UserAtom } from "../store/atoms/user";

export const useLogin = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setUser = useSetRecoilState(UserAtom);
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await axios.post(
        import.meta.env.VITE_APP_BACKEND_URL + "api/user/login",
        {
          username: email,
          password,
        }
      );
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || "An error occurred");
      } else {
        setError((err as Error).message);
      }
      console.log(err);
    }
  };
  return { login, error, isLoading };
};
