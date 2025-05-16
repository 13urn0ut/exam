import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../contexts/Context";
const API_URL = import.meta.env.VITE_API_URL;

const Categories = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { setError, user } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    setError(null);

    if (!user) {
      navigate("/login");
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.post(`${API_URL}/categories`, data, {
        withCredentials: true,
      });

      toast.success("Category added successfully!", {
        duration: 3000,
        id: "added",
      });
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
    }
  };

  return (
    <>
      <div>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Category Name</label>
            <input
              type="text"
              {...register("name", {
                required: {
                  value: true,
                  message: "Category name is required",
                },
              })}
            />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    </>
  );
};

export default Categories;
