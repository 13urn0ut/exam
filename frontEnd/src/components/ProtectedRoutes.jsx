import { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import { Context } from "../contexts/Context";

const ProtectedRoutes = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      //   navigate("/login");
    }
  }, []);

  return <Outlet />;
};

export default ProtectedRoutes;
