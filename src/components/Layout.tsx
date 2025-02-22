import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import { useTheme } from "../context/ThemeProvider";
const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isDark } = useTheme();
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <div
      className={`min-h-screen w-full ${
        isDark ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {!isAuthPage && <Header />}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};
export default Layout;
