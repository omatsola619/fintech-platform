import { type ReactNode, createContext, useContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  userName: string;
  kycStatus: string;
  login: (token: string, name?: string, kycStatus?: string) => void;
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
  const [kycStatus, setKycStatus] = useState<string>(() => {
    return localStorage.getItem("kycStatus") || "";
  });

  const login = (token: string, name?: string, kycStatus?: string) => {
    localStorage.setItem("authToken", token);
    if (name) {
      localStorage.setItem("userName", name);
      setUserName(name);
    }
    if (kycStatus) {
      localStorage.setItem("kycStatus", kycStatus);
      setKycStatus(kycStatus);
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("kycStatus");
    setIsAuthenticated(false);
    setUserName("");
    setKycStatus("");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, kycStatus, login, logout }}>
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
