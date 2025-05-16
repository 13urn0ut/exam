import axios from "axios";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { Context } from "../contexts/Context";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const SignupLoginForm = ({ action }) => {
  const { user, setUser, error, setError } = useContext(Context);

  const navigate = useNavigate();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = async (data) => {
    try {
      const { data: result } = await axios.post(
        `${API_URL}/users/${action}`,
        data,
        {
          withCredentials: true,
        }
      );

      setUser(result.data);
      setError(null);
      toast.success(`Welcome${action === "login" ? " back" : ""}!`, {
        duration: 3000,
        id: "success",
      });

      navigate("/home");
    } catch (error) {
      // console.log(error);
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
      <form className={`${action}-form`} onSubmit={handleSubmit(submit)}>
        {error && <p className="error">{error}</p>}
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: { value: true, message: "Password is required" },
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
          />
          {errors.password && (
            <p className="form-error">{errors.password.message}</p>
          )}
        </div>

        {action === "signup" && (
          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              id="passwordConfirm"
              type="password"
              placeholder="Confirm Password"
              {...register("passwordConfirm", {
                required: [true, "Please confirm your password"],
                validate: [
                  (value) => value === watch("password"),
                  "Passwords do not match",
                ],
              })}
            />
          </div>
        )}

        <button type="submit">{action.toUpperCase()}</button>

        <div>
          <p>
            {action === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <Link to={action === "login" ? "/signup" : "/login"}>
            {action === "login" ? "Signup" : "Login"}
          </Link>
        </div>
      </form>
    </>
  );
};

export default SignupLoginForm;
