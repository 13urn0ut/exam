import { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import { Context } from "../contexts/Context";

const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useContext(Context);

  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [loading]);

  return <Outlet />;
};

export default ProtectedRoutes;
