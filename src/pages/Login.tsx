import { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import AuthContext from "../components/Context/Authprovider";

const Login = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { setAuth } = authContext;

  const userRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLInputElement>(null);

  const [email_address, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [email_address, password]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: email_address,
        plain_pw: password,
      });

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth({ email_address, password, roles, accessToken });

      if (response.data.status === 200) {
        setSuccess(true);
      }

      console.log("Status:", response.data.message);

      alert("Successfully logged in!");
    } catch (error: any) {
      if (!error?.response) {
        setErrorMessage("No server response");
      } else if (error.response?.status === 400) {
        setErrorMessage("Missing username or password");
      } else if (error.response?.status === 401) {
        setErrorMessage("Unauthorized");
      } else if (error.response?.status === 404) {
        setErrorMessage("User does not exist");
      } else {
        setErrorMessage("Login failed");
      }

      errorRef.current?.focus();
    }
  };
  return (
    <>
      {success ? (
        <div className="bg-white">Successfully logged in!</div>
      ) : (
        <div className="flex flex-col justify-center items-center space-y-6">
          {errorMessage && (
            <div
              ref={errorRef}
              role="alert"
              aria-live="assertive"
              className="text-red-500 py-2"
            >
              {errorMessage}
            </div>
          )}
          <h2 className="heading">Login</h2>
          <div className="w-full max-w-lg">
            <form onSubmit={handleLogin} className="bg-gray-200 p-6 rounded-xl">
              <div className="mb-4">
                <label htmlFor="email_address">Email Address</label>
                <input
                  className="input-field w-full py-2 px-3"
                  id="email_address"
                  ref={userRef}
                  type="email"
                  value={email_address}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="john.doe@gmail.com"
                  required
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
                  required
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
      )}
    </>
  );
};

export default Login;
