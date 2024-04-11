import { useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../store/atoms/user";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
import InfoBanner from "../components/InfoBanner";
import LoadingSpin from "../components/LoadingSpin";

const AddItem = () => {
  const user = useRecoilValue(UserAtom);
  const [itemname, setItemname] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDesription] = useState("");
  const [condition, setCondition] = useState("");
  const [file, setFile] = useState("");
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [successData, setSuccessData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const options = ["Best", "Good", "Fine", "Bad"];
  const handlePhoto = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFile(file);
    setImage(window.URL.createObjectURL(file));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("name", itemname);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("sold", "false");
    formData.append("ownerName", user.user.username);
    formData.append("city", user.user.city);
    try {
      const res = await axios.post(
        import.meta.env.VITE_APP_BACKEND_URL + "api/item/additem",
        formData,
        {
          headers: {
            username: user.username,
            authorization: "Bearer " + user.token,
          },
        }
      );
      console.log(res.data);
      setSuccessData(res.data);
      setTimeout(() => {
        navigate("/profile");
      }, 8000);
      setIsLoading(false);
    } catch (err: any) {
      console.error(err.response.data);
      setError(err.response.data.error);
      setIsLoading(false);
    }
  };
  return (
    <section className="flex flex-col justify-center p-5">
      {error && <Alert message={error} />}
      {successData && <InfoBanner message={"Item has been added"} />}
      <div className="poppins-regular border-2 shadow-lg p-8">
        <h1 className="text-4xl">Add Item</h1>
        <div className="flex justify-between">
          <form
            className="flex  justify-between w-1/2"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div>
              <input
                type="text"
                className="border-2 border-gray-500 p-4  my-3 w-11/12"
                required
                placeholder="Item Name"
                value={itemname}
                onChange={(e) => setItemname(e.target.value)}
              />
              <input
                type="file"
                className="border-2 border-gray-500 p-4  my-3 w-11/12"
                accept=".png, .jpg, .jpeg"
                name="photo"
                onChange={handlePhoto}
              />
              <textarea
                className="border-2 border-gray-500 p-4  my-3 w-11/12"
                name="description"
                cols={30}
                rows={10}
                required
                value={description}
                onChange={(e) => setDesription(e.target.value)}
                placeholder="Description"
              />
              <select
                className="border-2 border-gray-500 p-4  my-3 w-11/12"
                name="Condition"
                onChange={(e) => setCondition(e.target.value)}
              >
                <option>Select Condition</option>
                {options.map((option, index) => {
                  return <option key={index}>{option}</option>;
                })}
              </select>
              <input
                type="number"
                className="border-2 border-gray-500 p-4  my-3 w-11/12"
                required
                placeholder="Price"
                min={0}
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
              <br />
              <button className="p-4 text-white bg-green-600 hover:bg-green-500 rounded-md">
                {isLoading && <LoadingSpin />}
                {!isLoading && <div>Add Item</div>}
              </button>
            </div>
          </form>
          <div className="border-2  w-1/2">
            {image && (
              <img src={image} className="w-5/6 h-5/6 shadow-md" alt="" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddItem;
