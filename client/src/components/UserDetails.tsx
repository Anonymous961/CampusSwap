import DetailBox from "./DetailBox";

const UserDetails = ({ itemList, userDetails, userCreateDate }) => {
  return (
    <div>
      <h2 className="text-4xl">User Details</h2>
      {userDetails && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 gap-5 border-2 my-5 rounded-md">
          <DetailBox label={"First name:"} value={userDetails.firstName} />
          <DetailBox label={"Last name:"} value={userDetails.lastName} />
          <DetailBox label={"Username:"} value={userDetails.username} />
          <DetailBox label={"Account created:"} value={userCreateDate} />
          <DetailBox label={"User's city:"} value={userDetails.city} />

          {itemList && (
            <DetailBox
              label={"Number of items listed:"}
              value={itemList.length}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UserDetails;
