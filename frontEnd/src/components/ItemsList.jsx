import axios from "axios";
import { useEffect, useContext, useState } from "react";
// import { useSearchParams } from "react-router";
import { Context } from "../contexts/Context";
import ItemPreviewCard from "./ItemPreviewCard";
import Search from "./Search";
import Pagination from "./Pagination";

const API_URL = import.meta.env.VITE_API_URL;

const ItemsList = () => {
  const { setLoading, setError, query, setQuery } = useContext(Context);

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const queryString = Object.entries(query)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      try {
        setLoading(true);

        const { data: result } = await axios.get(
          `${API_URL}/items?${queryString}`,
          {
            withCredentials: true,
          }
        );

        setItems(result.data);
        setError(null);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            setError(error.response.data.message);
          } else if (error.request) {
            setError("Something went wrong. Try again later.");
          } else {
            setError("Network error. Try again later.");
          }
        } else {
          setError("Something went wrong. Try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [query]);

  return (
    <section className="items-list">
      <Search setQuery={setQuery} />
      {items.map((item) => (
        <ItemPreviewCard
          key={item.id}
          item={item}
        />
      ))}
      <Pagination setQuery={setQuery} />
    </section>
  );
};

export default ItemsList;
