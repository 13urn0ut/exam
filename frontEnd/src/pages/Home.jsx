import Footer from "../components/Footer";
import Header from "../components/Header";
import ItemsList from "../components/ItemsList";

const Home = () => {
  return (
    <>
      <Header />
      <div>
        <ItemsList />
      </div>
      <Footer />
    </>
  );
};

export default Home;
