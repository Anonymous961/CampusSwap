import { atom, selector } from "recoil";

// export const UserAtom = atom({
//   key: "User",
//   default: null,
// });
export const UserAtom = atom({
  key: "User",
  default: selector({
    key: "localUser",
    get: async () => {
      const userData = await localStorage.getItem("user");
      if (userData) {
        const user=JSON.parse(userData);
        return user;
      }
      return null;
    },
  }),
});
