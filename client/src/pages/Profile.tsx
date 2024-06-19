import { useEffect, useState } from "react";
import { useLogout } from "../hooks/useLogout";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../store/atoms/user";
import UserDetails from "../components/UserDetails";
import UserItems from "../components/UserItems";
import { UserDetailsType } from "../store/dataTypes";
import { CartType, PageMetaTypes } from "../components/Products";
import { Pagination } from "../components/Pagination";

const Profile = () => {
  const { logout } = useLogout();
  const [isLoading, setIsLoading] = useState(false);
  const [itemList, setItemList] = useState<CartType[]>([]);
  const [pageMeta, setPageMeta] = useState<PageMetaTypes>({
    total: 0,
    page: 1,
    pages: 0,
  });
  const [userDetails, setUserDetails] = useState<UserDetailsType | null>(null);
  const [userCreateDate, setUserDate] = useState<string | null>(null);
  // const [deleteMessage,setDeleteMessage]=useState<string>("")
  const user = useRecoilValue(UserAtom);

  const getUserItems = async (page: number) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        import.meta.env.VITE_APP_BACKEND_URL +
          `api/item/userItem?page=${page}&limit=10`,
        {
          headers: {
            username: user.username,
            authorization: "Bearer " + user.token,
          },
        }
      );
      setPageMeta(response.data.meta);
      setItemList(response.data.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (axios.isAxiosError(err)) {
        console.log(err.response?.status);
        if (err.response?.status === 405) {
          logout();
        }
        console.log(err.response?.data);
      } else {
        console.error("An unexpected error occurred:", err);
      }
    }
  };
  useEffect(() => {
    getUserItems(pageMeta.page);
    if (user != null) {
      setUserDetails(user.user);
    }
    const date = new Date(user.user.createdAt).toDateString();
    setUserDate(date);
  }, [pageMeta.page]);

  const handlePageChange = (newPage: number) => {
    setPageMeta((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <section className="flex flex-col justify-center ">
      <div className="poppins-regular shadow-lg p-8">
        <UserDetails
          userCreateDate={userCreateDate}
          userDetails={userDetails}
          itemList={itemList}
        />
        <UserItems
          itemList={itemList}
          isLoading={isLoading}
          setItemList={setItemList}
        />
        <div className="flex justify-center m-4">
          <Pagination
            totalPages={pageMeta.pages}
            currentPage={pageMeta.page}
            onPageChange={handlePageChange}
          />
        </div>
        <div>
          <button
            className="bg-red-500 hover:bg-red-400 p-4 rounded-md text-white"
            onClick={logout}
          >
            Sign Out
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
