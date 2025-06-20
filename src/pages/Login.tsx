import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-6">
      <h2 className="heading">Login</h2>
      <div className="w-full max-w-lg">
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
            <label htmlFor="password">Password</label>
            <input
              className="input-field w-full py-2 px-3"
              id="password"
              type="text"
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
