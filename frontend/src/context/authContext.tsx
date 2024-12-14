"use client";
import {User} from "@/types/User";
import axios from "axios";
import {useRouter} from "next/navigation";
import {createContext, useContext, useState, useEffect} from "react";

type Props = {
  children: React.ReactNode;
};

interface IAuthContext {
  loggedIn: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  setUser: (user: User) => void;
}

export const AuthContext = createContext<IAuthContext>({
  loggedIn: false,
  user: null,
  loading: true,
  token: null,
  setUser: () => {},
});

export const AuthProvider = ({children}: Props) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleNoToken = (error: any) => {
    alert("Please login to continue");
    router.push("/");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("voter_token");
      setToken(token);
      console.log(token);
      if (!token) {
        setUser(null);
        handleNoToken(null);
        return;
      }
      try {
        const response = await axios.get("http://localhost:8080/validate", {
          headers: {Authorization: `Bearer ${token}`},
        });
        setUser(response.data);
        setLoading(false);
      } catch (error: any) {
        handleNoToken(error);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedIn: !!user,
        user,
        loading,
        token,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
