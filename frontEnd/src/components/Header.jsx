import { NavLink, useNavigate } from "react-router";
import { useContext } from "react";
import axios from "axios";
import { Context } from "../contexts/Context";

const API_URL = import.meta.env.VITE_API_URL;

const Header = () => {
  const { user, setUser } = useContext(Context);

  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.post(
        `${API_URL}/users/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      setUser(null);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log(error.response.data.message);
        } else if (error.request) {
          console.log("Something went wrong. Try again later.");
        } else {
          console.log("Network error. Try again later.");
        }
      } else {
        console.log("Something went wrong. Try again later.");
      }
    }
  };

  return (
    <header className="header">
      <nav className="nav">
        <NavLink to="/">MyApp</NavLink>

        {user ? (
          <NavLink onClick={logout}>Logout</NavLink>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
