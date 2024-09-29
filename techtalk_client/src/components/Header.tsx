import { Link, useNavigate } from "react-router-dom";
import { useGetMeQuery } from "../redux/services/authApi";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const { data: user } = useGetMeQuery(undefined, {
    skip: !token,
  });

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <Link to="/" className="text-xl font-bold">
        BlogApp
      </Link>
      <div className="flex space-x-4">
        <Link to="/posts" className="hover:underline">
          Posts
        </Link>
        {user ? (
          <>
            {user.role === "admin" && (
              <Link to="/admin" className="hover:underline">
                Admin
              </Link>
            )}
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
