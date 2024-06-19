import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import LoadingSpin from "../components/LoadingSpin";
import Alert from "../components/Alert";
import { AuthQuote } from "../components/AuthQuote";
import { LabelledInput } from "../components/LabelledInput";
import { SubmitButton } from "../components/SubmitButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  // const error = "true";
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen relative">
      {error && <Alert message={error} />}
      <div className="hidden lg:block md:block">
        <AuthQuote quote="Sustainable shopping at" title="Discover" />
      </div>
      <div className="flex justify-center items-center">
        <form
          className="flex flex-col justify-center items-center  poppins-regular"
          onSubmit={handleSubmit}
        >
          <h2 className="m-8 text-4xl ">Login Here</h2>
          <LabelledInput
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <LabelledInput
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLoading ? (
            <SubmitButton label="Login" />
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
