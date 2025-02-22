import React, { useEffect, useState, createContext, useContext } from "react";
interface User {
  email: string;
  name: string;
  password: string;
}
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>(
    JSON.parse(localStorage.getItem("users") || null)
  );
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    const savedUser = localStorage.getItem("user");

    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user", JSON.stringify(user));
  }, [user, users]);
  const login = async (email: string, password: string) => {
    const existingUser = users.find(
      (client) => client.email === email && client.password === password
    );

    if (!existingUser) {
      return "invalid credentials.";
    } else {
      setUser(existingUser);
    }
    return user;
  };
  const register = async (email: string, password: string, name: string) => {
    const mockUser = {
      email,
      name,
      password,
    };
    setUsers((prev) => {
      return [...prev, mockUser];
    });
    localStorage.setItem("users", JSON.stringify(users));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
