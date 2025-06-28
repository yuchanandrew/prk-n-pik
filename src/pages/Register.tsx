import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

{
  /* TO-DO: Fix the post response or something (maybe on backend), user is not being created! */
}

const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email_address, setEmailAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");

      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/register", {
        first_name: firstname,
        last_name: lastname,
        email: email_address,
        phone_number: phone,
        plain_pw: password,
      });

      console.log("Created user:", response.data);
    } catch (error) {
      console.log("Oops! Could not create account.", error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center space-y-6">
      <h2 className="heading">Register</h2>
      <div className="w-full max-w-md">
        <form onSubmit={handleRegister} className="bg-gray-200 p-6 rounded-xl">
          <div className="mb-4">
            <label htmlFor="firstname">First Name</label>
            <input
              className="input-field w-full py-2 px-3"
              id="firstname"
              type="text"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastname">Last Name</label>
            <input
              className="input-field w-full py-2 px-3"
              id="lastname"
              type="text"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email_address">Email Address</label>
            <input
              className="input-field w-full py-2 px-3"
              id="email_address"
              type="email"
              value={email_address}
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder="johndoe@gmail.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone">Phone Number</label>
            <input
              className="input-field w-full py-2 px-3"
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="800-555-1234"
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
          <div className="mb-4">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="input-field w-full py-2 px-3"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
            />
          </div>
          <div className="flex mt-4 justify-center">
            <button
              type="submit"
              className="flex hover-primary px-6 py-3 rounded-xl text-xl"
            >
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
