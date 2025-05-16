import Footer from "../components/Footer";
import Main from "../components/Main";
import Header from "../components/Header";
import ItemsList from "../components/ItemsList";

const Home = () => {
  return (
    <>
      <Header />
      <Main>
        <ItemsList myItems={true} />
      </Main>
      <Footer />
    </>
  );
};

export default Home;
