import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import SignupLoginForm from "../components/SignupLoginForm";

const Signup = () => {
  return (
    <>
      <Header />
      <Main>
        <SignupLoginForm action="signup" />
      </Main>
      <Footer />
    </>
  );
};

export default Signup;
