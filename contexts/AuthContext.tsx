"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import axios from "axios";

import { useRouter } from "next/navigation";
interface IAuthContext {
  user: { name: string; email: string } | null;
  login: (username: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const router = useRouter();

  const validateUser = useCallback(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        // Clear local storage if the user session has expired
        if (
          parsedUser.expiresAt &&
          new Date().getTime() > parsedUser.expiresAt
        ) {
          console.log("User session expired");
          setUser(null);
          localStorage.removeItem("user");
          router.push("/");
          return;
        }

        setUser({ name: parsedUser.name, email: parsedUser.email });
      } catch (error) {
        console.error("Error parsing stored user:", error);
        setUser(null);
        localStorage.removeItem("user");
      }
    } else {
      setUser(null);
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    validateUser();
  }, [validateUser]);

  const login = async (username: string, email: string) => {
    try {
      console.log("Attempting login with:", username, email);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          name: username,
          email: email,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Login response:", response.status, response.data);

      if (response.status === 200) {
        const userData = {
          name: username,
          email: email,
          expiresAt: new Date().getTime() + 60 * 60 * 1000, // 1 hour from now in milliseconds
        };
        setUser({ name: username, email: email });
        localStorage.setItem("user", JSON.stringify(userData));

        router.push("/search");
      } else {
        console.error(`Login failed: ${response.data.error}`);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        setUser(null);
        router.push("/");
        localStorage.removeItem("user");
      } else {
        console.error(`Logout failed: ${response.data.error}`);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
