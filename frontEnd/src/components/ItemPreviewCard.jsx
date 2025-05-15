const VITE_PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;

const ItemPreviewCard = ({ item }) => {
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
        <p>Duration: {item.duration}</p>
        <p>Rating: {item.rating}</p>
        <p>Category: {item.category.name}</p>
      </div>
    </article>
  );
};

export default ItemPreviewCard;
