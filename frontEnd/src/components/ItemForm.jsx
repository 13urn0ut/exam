import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const ItemForm = ({ action }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      await axios.post(`${API_URL}/items`, data, {
        withCredentials: true,
      });

      toast.success("Item added successfully!", {
        duration: 3000,
        id: "added",
      });
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data: result } = await axios.get(`${API_URL}/categories`, {
          withCredentials: true,
        });

        setCategories(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <form className="form item-form" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          {...register("name", {
            required: {
              value: true,
              message: "Name is required",
            },
          })}
        />
        {errors.name && <p className="form-error">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          {...register("category", {
            required: {
              value: true,
              message: "Category is required",
            },
          })}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="form-error">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          type="textarea"
          id="description"
          {...register("description", {
            required: {
              value: true,
              message: "Description is required",
            },
          })}
        />
        {errors.description && (
          <p className="form-error">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          step="0.01"
          {...register("price", {
            required: {
              value: true,
              message: "Price is required",
            },
          })}
        />
        {errors.price && <p className="form-error">{errors.price.message}</p>}
      </div>

      <div>
        <label htmlFor="image">Image</label>
        <input
          type="text"
          id="image"
          defaultValue="default.jpg"
          {...register("image")}
        />
        {errors.image && <p className="form-error">{errors.image.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ItemForm;
