import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import LoadingSpin from "../components/LoadingSpin";
import Alert from "../components/Alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <div className="flex flex-col justify-center items-center p-10">
      {error && <Alert message={error} />}
      <div className=" flex flex-row border-2  rounded-md w-3/5 shadow-lg">
        <div className="flex flex-col justify-center p-10 bg-slate-800 w-1/2 poppins-regular rounded-l-lg">
          <h1 className="text-4xl text-gray-100">Discover</h1>
          <p className="text-white">
            Sustainable shopping at{" "}
            <span className="underline text-blue-300">CampusSwap</span>
          </p>
        </div>
        <form
          className="flex flex-col justify-center items-center p-10 border-2 w-1/2 poppins-regular"
          onSubmit={handleSubmit}
        >
          <h2 className="m-8 text-4xl ">Login Here</h2>
          <input
            className="border-2 border-gray-500 p-4  my-3 w-11/12"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border-2 border-gray-500 p-4  my-3 w-11/12"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLoading ? (
            <input
              className="border-2 border-gray-400 w-11/12 my-3 mb-4 bg-slate-800 text-white py-3 px-4"
              type="submit"
              value="login"
            />
          ) : (
            <button className="border-2 border-gray-400 w-11/12 my-3 mb-4 bg-slate-800 text-white py-3 px-4">
              <LoadingSpin />
            </button>
          )}

          <p>
            New user?
            <Link to="/signup" className="underline text-blue-400">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
