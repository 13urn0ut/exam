import { useContext } from "react";
import { Navigate } from "react-router";
import { Context } from "../contexts/Context";

const ProtectedRoutes = ({ children }) => {
  const { user } = useContext(Context);

  return <>{user ? children : <Navigate to="/login" />}</>;
};

export default ProtectedRoutes;
