const ItemPreviewCard = ({ item }) => {
  return (
    <div className="item-preview-card">
      <img
        src={item.image || null}
        alt={item.name}
      />
      <h3>{item.name}</h3>
      <p>Price: {item.price}</p>
      <p>Duration: {item.duration}</p>
      <p>Rating: {item.rating}</p>
      <p>Category: {item.category.name}</p>
    </div>
  );
};

export default ItemPreviewCard;
