import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeProvider";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { user } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result: any = await login(email, password);
      if (result !== "invalid credentials") {
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, []);

  return (
    <div
      className={`max-w-md mx-auto mt-16 p-6 ${
        isDark ? "bg-gray-800" : "bg-white"
      } rounded-lg shadow-md transition-colors duration-200`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-2 border rounded ${
              isDark
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            } transition-colors duration-200`}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-2 border rounded ${
              isDark
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            } transition-colors duration-200`}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-200"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-500 hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
};
export default Login;
