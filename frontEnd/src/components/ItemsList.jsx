import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { Context } from "../contexts/Context";
import ItemPreviewCard from "./ItemPreviewCard";
import Search from "./Search";

const API_URL = import.meta.env.VITE_API_URL;

const ItemsList = () => {
  const { setLoading, setError } = useContext(Context);

  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);

        const { data: result } = await axios.get(
          `${API_URL}/items?${searchQuery}`,
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
  }, [searchQuery]);

  return (
    <section className="items-list">
      <Search setSearchQuery={setSearchQuery} />
      {items.map((item) => (
        <ItemPreviewCard
          key={item.id}
          item={item}
        />
      ))}
    </section>
  );
};

export default ItemsList;
