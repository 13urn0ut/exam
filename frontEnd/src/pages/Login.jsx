import Header from "../components/Header";
import Footer from "../components/Footer";
import SignupLoginForm from "../components/SignupLoginForm";

const Login = () => {
  return (
    <>
      <Header />
      <div>
        <h1>Login</h1>
        <SignupLoginForm action="login" />
      </div>
      <Footer />
    </>
  );
};

export default Login;
