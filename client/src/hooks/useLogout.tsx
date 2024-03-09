import { useSetRecoilState } from "recoil";
import { UserAtom } from "../store/atoms/user";

export const useLogout=()=>{
    const setUser=useSetRecoilState(UserAtom);
    const logout=()=>{
        localStorage.removeItem("user");
        setUser(null);
    }
    return {logout};
}