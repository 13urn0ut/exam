import { useEffect, useState } from "react";
import axios from "axios";
import CategoryForm from "../components/CategoryForm";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL;

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data: result } = await axios.get(`${API_URL}/categories`, {
          withCredentials: true,
        });

        setCategories(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);
  return (
    <>
      <Header />
      <Main>
        <h1>Categories</h1>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
        <CategoryForm />
      </Main>
      <Footer />
    </>
  );
};

export default Categories;
