import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./Context/Authprovider";

import axios from "axios";

const SubNavigation = () => {
  const authContext = useContext(AuthContext);

  const authCredentials = authContext?.auth?.accessToken;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");

  const fetchUser = async () => {
    const accessToken = authCredentials;

    try {
      const response = await axios.get("http://localhost:3000/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const first_name = response.data.user.first_name;

      console.log("User first name:", first_name);

      setName(first_name);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (authCredentials) {
      fetchUser();
    }
  }, [authCredentials]);

  useEffect(() => {
    if (authCredentials) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [authCredentials]);

  const handleLogOut = async () => {
    try {
      const response = await axios.post("http://localhost:3000/logout");

      console.log(response.data.message);

      setIsLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleLogOut();
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <div className="bg-amber-600 py-1">
          <div className="flex justify-end mr-4">
            <p>Welcome back, {name}</p>
            <p>/</p>
            <Link
              to="/logout"
              onClick={handleLogOut}
              className="hover:text-sky-400"
            >
              Logout
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-amber-600 py-1">
          <div className="flex justify-end mr-4">
            <Link to="/register" className="hover:text-sky-400">
              Register
            </Link>
            <p>/</p>
            <Link to="/login" className="hover:text-sky-400">
              Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SubNavigation;
