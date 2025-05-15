import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import SignupLoginForm from "../components/SignupLoginForm";

const Login = () => {
  return (
    <>
      <Header />
      <Main>
        <SignupLoginForm action="login" />
      </Main>
      <Footer />
    </>
  );
};

export default Login;
