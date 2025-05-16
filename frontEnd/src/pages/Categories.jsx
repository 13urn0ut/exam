import { useEffect, useState } from "react";
import axios from "axios";
import CategoryForm from "../components/CategoryForm";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL;

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${API_URL}/categories/${id}`, {
        withCredentials: true,
      });

      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

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
  }, [refresh]);
  return (
    <>
      <Header />
      <Main>
        <h1>Categories</h1>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              {category.name}{" "}
              <button type="button" onClick={() => deleteCategory(category.id)}>
                x
              </button>
            </li>
          ))}
        </ul>
        <CategoryForm setRefresh={setRefresh} />
      </Main>
      <Footer />
    </>
  );
};

export default Categories;
