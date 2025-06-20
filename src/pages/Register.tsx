import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-6">
      <h2 className="heading">Register</h2>
      <div className="w-full max-w-md">
        <form className="bg-gray-200 p-6 rounded-xl">
          <div className="mb-4">
            <label htmlFor="username">Username</label>
            <input
              className="input-field w-full py-2 px-3"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email">Email Address</label>
            <input
              className="input-field w-full py-2 px-3"
              id="email"
              type="email"
              placeholder="johndoe@gmail.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              className="input-field w-full py-2 px-3"
              id="password"
              type="text"
              placeholder="Password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              className="input-field w-full py-2 px-3"
              id="confirm-password"
              type="text"
              placeholder="Confirm password"
            />
          </div>
          <div className="flex mt-4 justify-center">
            <button className="flex hover-primary px-6 py-3 rounded-xl text-xl">
              Register
            </button>
          </div>
        </form>
        <div className="mt-4">
          <Link to="/login" className="hover:text-sky-500">
            Already have an account with us?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
