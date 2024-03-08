import { Link } from "react-router-dom";
import {useState} from'react'
const SignUp = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
  return (
    <div className="flex justify-center items-center p-10">
      <div className=" flex flex-row border-2 w-3/5 shadow-lg">
        <div className="flex flex-col justify-center items-center p-10 border-2 w-1/2 poppins-regular rounded-l-lg">
          <h2 className="m-8 text-4xl ">Sign Up Here</h2>
          <input
            className="border-2 border-gray-500 p-4  my-2 w-11/12"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <input
            className="border-2 border-gray-500 p-4  my-2 w-11/12"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <input
            className="border-2 border-gray-500 p-4  my-2 w-11/12"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <input
            className="border-2 border-gray-400 w-11/12 mb-4 bg-slate-900 text-white py-3 px-4"
            type="submit"
            value="Register"
          />
          <p>
            New user?
            <Link to="/login" className="underline text-blue-400">
              Login
            </Link>
          </p>
        </div>
        <div className="flex flex-col justify-center p-10 bg-gray-600 w-1/2 poppins-regular rounded-r-lg">
          <h1 className="text-3xl text-gray-100">Join the club</h1>
          <p className="text-white">
            turn your dorm clutter into cash!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
