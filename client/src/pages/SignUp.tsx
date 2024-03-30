import { Link } from "react-router-dom";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import LoadingSpin from "../components/LoadingSpin";
import Alert from "../components/Alert";

const SignUp = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const {signup,error,isLoading}=useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup({fname,lname,email,password,city});
  };
  return (
    <div className="flex flex-col justify-center items-center p-10">
      {error && <Alert message={error} />}
      <div className=" flex flex-row border-2 w-3/5 shadow-lg">
        <form
          className="flex flex-col justify-center items-center p-10 border-2 w-1/2 poppins-regular rounded-l-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="m-8 text-4xl ">Sign Up Here</h2>
          <div className="flex flex-row w-11/12">
            <input
              className="border-2 border-gray-500 p-4  my-2 w-1/2"
              type="text"
              placeholder="First Name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
            <input
              className="border-2 border-gray-500 p-4  my-2 w-1/2"
              type="text"
              placeholder="Last Name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </div>
          <input
            className="border-2 border-gray-500 p-4  my-2 w-11/12"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border-2 border-gray-500 p-4  my-2 w-11/12"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="border-2 border-gray-500 p-4  my-2 w-11/12"
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {!isLoading ? (
            <input
              className="border-2 border-gray-400 w-11/12 my-3 mb-4 bg-slate-800 text-white py-3 px-4"
              type="submit"
              value="Register"
            />
          ) : (
            <button className="border-2 border-gray-400 w-11/12 my-3 mb-4 bg-slate-800 text-white py-3 px-4">
              <LoadingSpin />
            </button>
          )}
          <p>
            New user?
            <Link to="/login" className="underline text-blue-400">
              Login
            </Link>
          </p>
        </form>
        <div className="flex flex-col justify-center p-10 bg-slate-800 w-1/2 poppins-regular rounded-r-lg">
          <h1 className="text-3xl text-gray-100">Join the club</h1>
          <p className="text-white">turn your dorm clutter into cash!</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
