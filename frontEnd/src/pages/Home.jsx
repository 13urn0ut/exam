import Footer from "../components/Footer";
import Main from "../components/Main";
import Header from "../components/Header";
import ItemsList from "../components/ItemsList";

const Home = () => {
  return (
    <>
      <Header />
      <Main>
        <ItemsList />
      </Main>
      <Footer />
    </>
  );
};

export default Home;
