import Header from "../components/Header";
import ItemForm from "../components/ItemForm";
import Main from "../components/Main";
import Footer from "../components/Footer";

const Item = () => {
  return (
    <>
      <Header />
      <Main>
        <ItemForm action="create" />
      </Main>
      <Footer />
    </>
  );
};

export default Item;
