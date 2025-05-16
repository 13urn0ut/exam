import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const Search = ({ setQuery }) => {
  const { register, handleSubmit } = useForm();

  const [categories, setCategories] = useState([]);

  const search = (data) => {
    setQuery((prev) => ({ ...prev, ...data, page: 1 }));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data: result } = await axios.get(`${API_URL}/categories`, {
          withCredentials: true,
        });

        console.log(result);

        setCategories(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <form className="search-form" onSubmit={handleSubmit(search)}>
      <input
        type="search"
        id="search"
        placeholder="Search..."
        {...register("name", { required: true })}
      />

      <select {...register("categoryId")}>
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <button type="submit">
        <CiSearch />
      </button>
    </form>
  );
};

export default Search;
