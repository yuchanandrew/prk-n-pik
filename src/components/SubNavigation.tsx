import React from "react";
import { Link } from "react-router-dom";

const SubNavigation = () => {
  return (
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
  );
};

export default SubNavigation;
