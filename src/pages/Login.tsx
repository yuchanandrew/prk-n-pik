import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

{
  /* TO-DO: Remove username and replace with email address */
}

const Login = () => {
  const [email_address, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: email_address,
        plain_pw: password,
      });

      console.log("Status:", response.data.message);

      alert("Successfully logged in!");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center space-y-6">
      <h2 className="heading">Login</h2>
      <div className="w-full max-w-lg">
        <form onSubmit={handleLogin} className="bg-gray-200 p-6 rounded-xl">
          <div className="mb-4">
            <label htmlFor="email_address">Email Address</label>
            <input
              className="input-field w-full py-2 px-3"
              id="email_address"
              type="email"
              value={email_address}
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder="john.doe@gmail.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              className="input-field w-full py-2 px-3"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className="flex mt-4 justify-center">
            <button className="flex hover-primary px-6 py-3 rounded-xl text-xl">
              Login
            </button>
          </div>
        </form>
        <div className="mt-4">
          <Link to="/register" className="hover:text-sky-500">
            Don't have an account with us?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
