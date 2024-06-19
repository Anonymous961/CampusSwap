import { Link } from "react-router-dom";
import { FormEvent, useState } from "react";
import { useSignup } from "../hooks/useSignup";
import LoadingSpin from "../components/LoadingSpin";
import Alert from "../components/Alert";
import { LabelledInput } from "../components/LabelledInput";
import { SubmitButton } from "../components/SubmitButton";
import { AuthQuote } from "../components/AuthQuote";

const SignUp = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup({ fname, lname, email, password, city });
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 ">
      {error && <Alert message={error} />}
      <div>
        <form
          className="flex flex-col justify-center items-center p-10 poppins-regular"
          onSubmit={handleSubmit}
        >
          <h2 className="m-8 text-4xl ">Sign Up Here</h2>
          <div className="grid lg:grid-cols-2 grid-cols-1 w-full">
            <div className="flex justify-center lg:justify-end">
              <LabelledInput
                placeholder="First Name"
                onChange={(e) => setFname(e.target.value)}
              />
            </div>
            <div className="flex justify-center lg:justify-start">
              <LabelledInput
                placeholder="Last Name"
                onChange={(e) => setLname(e.target.value)}
              />
            </div>
          </div>
          <LabelledInput
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <LabelledInput
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <LabelledInput
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
          />
          <div className="text-left">
            <p className="font-bold">
              *NOTE: Enter full name of city, eg: mumbai or Mumbai
            </p>
          </div>
          {!isLoading ? (
            <SubmitButton label="Register" />
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
      </div>
      <div className="hidden lg:block md:block">
        <AuthQuote
          quote="turn your dorm clutter into cash!"
          title="Join the club"
        />
      </div>
    </div>
  );
};

export default SignUp;
