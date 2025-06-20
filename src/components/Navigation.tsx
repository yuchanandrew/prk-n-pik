import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="flex top-0 w-full bg-amber-800 items-center justify-center">
      <div className="grid grid-cols-3 gap-8">
        <a href="/" className="navbar-text">
          Home
        </a>
        <a href="/" className="navbar-text">
          Store
        </a>
        <a href="/" className="navbar-text">
          Kate
        </a>
      </div>
    </div>
  );
};

export default Navigation;
