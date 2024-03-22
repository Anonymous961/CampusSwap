import axios from "axios";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { UserAtom } from "../store/atoms/user";

interface userType{
    fname:string,
    lname:string,
    email:string,
    password:string
}

export const useSignup = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setUser=useSetRecoilState(UserAtom);
  const signup = async (params:userType) => {
    const {fname,lname,email,password}=params;
    try {
      setLoading(true);
      const res = await axios.post(
        import.meta.env.VITE_APP_BACKEND_URL + "api/user/signup",
        { firstname: fname, lastname: lname, username: email, password }
      );
      localStorage.setItem("user",JSON.stringify(res.data));
      setUser(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
      console.log(error);
    }
  };
  return { signup, error, isLoading };
};
