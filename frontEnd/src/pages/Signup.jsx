import Header from "../components/Header";
import Footer from "../components/Footer";
import SignupLoginForm from "../components/SignupLoginForm";

const Signup = () => {
  return (
    <>
      <Header />
      <div>
        <h1>Signup</h1>
        <SignupLoginForm action="signup" />
      </div>
      <Footer />
    </>
  );
};

export default Signup;
