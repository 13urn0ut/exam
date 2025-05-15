import { useForm } from "react-hook-form";
// import { useSearchParams } from "react-router";
import { CiSearch } from "react-icons/ci";

const Search = ({ setSearchQuery }) => {
  const {
    register,
    // watch,
    // formState: { errors },
    handleSubmit,
  } = useForm();

  const searchParams = new URLSearchParams({});

  const search = (data) => {
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      }
    });

    setSearchQuery(searchParams.toString());
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
      />
      <button type="submit">
        <CiSearch />
      </button>
    </form>
  );
};

export default Search;
