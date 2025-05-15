import { createContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const value = {
    user,
    setUser,
    error,
    setError,
    loading,
    setLoading,
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const { data: result } = await axios.get(`${API_URL}/users/me`, {
          withCredentials: true,
        });

        setUser(result.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (!user) fetchUser();
  }, []);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
