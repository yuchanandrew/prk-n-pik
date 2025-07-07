import axios from "axios";
import { useContext } from "react";
import AuthContext from "./Context/Authprovider";

const AddtoCart = () => {
  const authContext = useContext(AuthContext);
  const authCredentials = authContext?.auth?.accessToken;

  return (
    <div className="flex w-11/12">
      <button className="subheading hover-primary w-full py-5 rounded">
        Add to Cart
      </button>
    </div>
  );
};

export default AddtoCart;
