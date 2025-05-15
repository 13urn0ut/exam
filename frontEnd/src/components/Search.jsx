import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";

const Search = ({ setQuery }) => {
  const { register, handleSubmit } = useForm();

  const search = (data) => {
    setQuery((prev) => ({ ...prev, ...data, page: 1 }));
  };

  return (
    <form
      className="search-form"
      onSubmit={handleSubmit(search)}
    >
      <input
        type="search"
        id="search"
        placeholder="Search..."
        {...register("name", { required: true })}
      />

      <input
        type="number"
        id="limit"
        placeholder="Limit"
        {...register("limit")}
        defaultValue={10}
      />
      <button type="submit">
        <CiSearch />
      </button>
    </form>
  );
};

export default Search;
