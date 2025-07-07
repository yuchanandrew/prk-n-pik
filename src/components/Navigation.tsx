import { Link } from "react-router-dom";
import Cart from "./Cart";

const Navigation = () => {
  return (
    <div className="flex top-0 w-full bg-amber-800 items-center justify-center">
      <div className="grid grid-cols-2 gap-8">
        <Link to="/" className="navbar-text">
          Home
        </Link>
        <Link to="/store" className="navbar-text">
          Store
        </Link>
      </div>
      <div className="absolute right-6">
        <Cart />
      </div>
    </div>
  );
};

export default Navigation;
