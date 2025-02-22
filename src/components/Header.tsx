import { useNavigate } from "react-router-dom";
import { Sun, Moon, LogOut } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";
import { useAuth } from "../context/AuthContext";
const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header
      className={`w-full ${
        isDark ? "bg-gray-800" : "bg-white"
      } shadow-sm transition-colors duration-200`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Todo App</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
            } transition-colors duration-200`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {user && (
            <>
              <span className="text-sm">{user.name}</span>
              <button
                onClick={handleLogout}
                className={`p-2 rounded-full ${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                } transition-colors duration-200`}
              >
                <LogOut size={20} />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
