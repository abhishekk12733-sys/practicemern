import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function Navbar() {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav className="p-4 flex justify-between bg-gradient-to-r from-indigo-300 to-purple-800">
      <div className="flex gap-4">
        {user && (
          <div className="flex gap-4">
            <Link
              to="/posts"
              className="bg-amber-500 px-2 py-2 rounded-md font-semibold text-gray-700 hover:text-indigo-600 transitio-colors"
            >
              Posts
            </Link>

            <Link
              to="/postform"
              className="bg-amber-500 px-2 py-2 rounded-md font-semibold text-gray-700 hover:text-indigo-600 transitio-colors"
            >
              Create Post
            </Link>
          </div>
        )}
      </div>
      <div className="flex gap-4">
        {user ? (
          <>
            <Link
              to="/profile"
              className="bg-amber-500 px-2 py-2 rounded-md font-semibold text-gray-700 hover:text-indigo-600 transitio-colors"
            >
              {user.username}
            </Link>
            <button
              onClick={handleLogout}
              className="bg-amber-500 px-2 py-2 rounded-md font-semibold text-gray-700 hover:text-indigo-600 transitio-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-amber-500 px-2 py-2 rounded-md font-semibold text-gray-700 hover:text-indigo-600 transitio-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-amber-500 px-2 py-2 rounded-md font-semibold text-gray-700 hover:text-indigo-600 transitio-colors"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
