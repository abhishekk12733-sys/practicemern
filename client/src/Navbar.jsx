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
    <nav className="p-4 bg-gray-200 flex justify-between">
      <div className="flex gap-4">
        {user && (
          <div>
            <Link to="/posts" className="font-semibold">
              Posts
            </Link>

            <Link to="/postform" className="font-semibold">
              Create Post
            </Link>
          </div>
        )}
      </div>
      <div className="flex gap-4">
        {user ? (
          <>
            <Link to="/profile" className="font-semibold">
              {user.username}
            </Link>
            <button onClick={handleLogout} className="font-semibold">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="font-semibold">
              Login
            </Link>
            <Link to="/signup" className="font-semibold">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
