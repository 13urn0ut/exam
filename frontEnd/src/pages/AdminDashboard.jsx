import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { Context } from "../contexts/Context";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

const AdminDashboard = () => {
  const { user } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== "admin") {
      console.log(user);

      //   navigate("/home");
    }
  }, []);

  return (
    <>
      <Header />
      <Main>
        <h1>Admin Dashboard</h1>
      </Main>
      <Footer />
    </>
  );
};

export default AdminDashboard;
