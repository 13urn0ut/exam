const Pagination = ({ setQuery }) => {
  const nextPage = () => {
    setQuery((prev) => ({ ...prev, page: prev.page + 1 }));
  };
  const prevPage = () => {
    setQuery((prev) => ({ ...prev, page: prev.page - 1 }));
  };

  return (
    <div className="pagination flex justify-between ">
      <button onClick={prevPage}>Previous</button>
      <button onClick={nextPage}>Next</button>
    </div>
  );
};

export default Pagination;
