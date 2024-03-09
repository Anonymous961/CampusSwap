import { useLogout } from "../hooks/useLogout";

const Profile = () => {
  const { logout } = useLogout();
  return (
    <div>
      Profile page
      <button className="bg-red-500 p-4 rounded-md text-white" onClick={logout}>
        Sign Out
      </button>
    </div>
  );
};

export default Profile;
