import { type ReactNode, createContext, useContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  userName: string;
  login: (token: string, name?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("authToken");
  });
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem("userName") || "";
  });

  const login = (token: string, name?: string) => {
    localStorage.setItem("authToken", token);
    if (name) {
      localStorage.setItem("userName", name);
      setUserName(name);
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    setIsAuthenticated(false);
    setUserName("");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
