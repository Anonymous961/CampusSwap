const UserDetails = ({itemList,userDetails,userCreateDate}) => {
    return ( 
        <div>
          <h2 className="text-4xl">User Details</h2>
          {userDetails && (
            <div className="grid grid-cols-4 p-4 gap-5 border-2 my-5 rounded-md">
              <div className="col-span-2 flex text-2xl">
                <p className="w-1/2">First Name: </p>
                <span className="text-xl col-span-1 w-1/2 text-stone-700 border-2 p-2 border-grey-200 bg-blue-100 rounded-md">
                  {userDetails.firstName}
                </span>
              </div>
              <div className="col-span-2 flex text-2xl">
                <p className="w-1/2">Last Name: </p>
                <span className="text-xl col-span-1 w-1/2 text-stone-700 border-2 p-2 border-grey-200 bg-blue-100 rounded-md">
                  {userDetails.lastName}
                </span>
              </div>
              <div className="col-span-2 flex text-2xl">
                <p className="w-1/2">Username: </p>
                <span className="text-xl col-span-1 w-1/2 text-stone-700 border-2 p-2 border-grey-200 bg-blue-100 rounded-md">
                  {userDetails.username}
                </span>
              </div>
              <div className="col-span-2 flex text-2xl">
                <p className="w-1/2">Account created: </p>
                <span className="text-xl col-span-1 w-1/2 text-stone-700 border-2 p-2 border-grey-200 bg-blue-100 rounded-md">
                  {userCreateDate}
                </span>
              </div>
              {itemList && (
                <div className="col-span-2 flex text-2xl">
                  <p className="w-1/2">Number of items listed: </p>
                  <span className="text-xl col-span-1 w-1/2 text-stone-700 border-2 p-2 border-grey-200 bg-blue-100 rounded-md">
                    {itemList.length}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
     );
}
 
export default UserDetails;