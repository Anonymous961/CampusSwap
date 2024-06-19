import { UserDetailsType } from "../store/dataTypes";
import DetailBox from "./DetailBox";
import { CartType } from "./Products";

interface UserDetailsPropType {
  itemList: CartType[];
  userDetails: UserDetailsType | null;
  userCreateDate: string | null;
}

const UserDetails = ({
  itemList,
  userDetails,
  userCreateDate,
}: UserDetailsPropType) => {
  return (
    <div>
      <h2 className="text-4xl">User Details</h2>
      {userDetails && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5  my-5 rounded-md">
          <DetailBox label={"First name:"} value={userDetails.firstName} />
          <DetailBox label={"Last name:"} value={userDetails.lastName} />
          <DetailBox label={"Username:"} value={userDetails.username} />
          {userCreateDate !== null && (
            <DetailBox label={"Account created:"} value={userCreateDate} />
          )}
          <DetailBox label={"User's city:"} value={userDetails.city} />

          {itemList && (
            <DetailBox
              label={"Number of items listed:"}
              value={itemList.length.toString()}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UserDetails;
