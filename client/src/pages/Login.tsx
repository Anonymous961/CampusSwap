import { useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
  return (
    <div className="flex justify-center items-center p-10">
      <div className=" flex flex-row border-2  rounded-md w-3/5 shadow-lg">
        <div className="flex flex-col justify-center p-10 bg-gray-600 w-1/2 poppins-regular rounded-l-lg">
          <h1 className="text-4xl text-gray-100">Discover</h1>
          <p className="text-white">
            Sustainable shopping at{" "}
            <span className="underline text-blue-300">CampusSwap</span>
          </p>
        </div>
        <div className="flex flex-col justify-center items-center p-10 border-2 w-1/2 poppins-regular">
          <h2 className="m-8 text-4xl ">Login Here</h2>
          <input
            className="border-2 border-gray-500 p-4  my-3 w-11/12"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <input
            className="border-2 border-gray-500 p-4  my-3 w-11/12"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <input
            className="border-2 border-gray-400 w-11/12 my-3 mb-4 bg-slate-900 text-white py-3 px-4"
            type="submit"
            value="login"
          />
          <p>
            New user?
            <Link to="/signup" className="underline text-blue-400">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
