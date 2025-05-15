import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { Context } from "../contexts/Context";
import ItemPreviewCard from "./ItemPreviewCard";

const API_URL = import.meta.env.VITE_API_URL;

const ItemsList = () => {
  const { loading, setLoading, error, setError } = useContext(Context);

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const { data: result } = await axios.get(`${API_URL}/items`, {
          withCredentials: true,
        });

        setItems(result.data);
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
  }, []);
  return (
    <div>
      {items.map((item) => (
        <ItemPreviewCard
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
};

export default ItemsList;
