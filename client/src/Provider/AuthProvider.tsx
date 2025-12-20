import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface User {
  id: number;
  documentId?: string;
  username: string;
  email: string;
  jwt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (
    identifier: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/local`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.jwt) {
        // Fetch full profile to get documentId (standard /auth/local might not return it)
        const profileRes = await fetch(
          `${import.meta.env.VITE_API_URL}/users/me`,
          {
            headers: { Authorization: `Bearer ${data.jwt}` },
          }
        );
        const profileData = await profileRes.json();

        const userData = {
          id: data.user.id,
          documentId: profileData.documentId || data.user.documentId,
          username: data.user.username,
          email: data.user.email,
          jwt: data.jwt,
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/local/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.jwt) {
        // Fetch full profile to get documentId
        const profileRes = await fetch(
          `${import.meta.env.VITE_API_URL}/users/me`,
          {
            headers: { Authorization: `Bearer ${data.jwt}` },
          }
        );
        const profileData = await profileRes.json();

        const userData = {
          id: data.user.id,
          documentId: profileData.documentId || data.user.documentId,
          username: data.user.username,
          email: data.user.email,
          jwt: data.jwt,
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
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
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
