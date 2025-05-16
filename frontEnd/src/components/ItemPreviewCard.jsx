import { useContext } from "react";
import { Context } from "../contexts/Context";
import axios from "axios";

const VITE_PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;
const API_URL = import.meta.env.VITE_API_URL;

const ItemPreviewCard = ({ item, setRefresh }) => {
  const { user } = useContext(Context);

  const bookmark = async (itemId) => {
    try {
      await axios.post(
        `${API_URL}/bookmarks`,
        { itemId },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const editItem = () => {};

  const blockItem = async (itemId) => {
    try {
      await axios.patch(
        `${API_URL}/items/${itemId}`,
        { blocked: true },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`${API_URL}/items/${itemId}`, {
        withCredentials: true,
      });

      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="item-preview-card">
      <div className="img-container">
        <img
          src={`${VITE_PUBLIC_URL}/imgs/${item.image || "default.jpg"}`}
          alt={item.name}
        />
      </div>
      <div>
        <h3>{item.name}</h3>
        <p>Price: {item.price}</p>
        <p>Description: {item.description}</p>
        <p>Category: {item.category.name}</p>
        {user?.role === "user" && (
          <>
            <div>
              <button>Coment</button>
              <button onClick={() => bookmark(item.id)}>Bookmark</button>
            </div>
            {item.creatorId === user.id && (
              <div>
                <button onClick={editItem}>Edit</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </div>
            )}
          </>
        )}
        {user?.role === "admin" && (
          <div>
            <button onClick={() => blockItem(item.id)}>Block Item</button>
            <button onClick={() => blockUser(item.creatorId)}>
              Block User
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default ItemPreviewCard;
