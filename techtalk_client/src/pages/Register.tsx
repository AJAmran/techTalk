import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../redux/services/authApi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

type RegisterFormInputs = {
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormInputs>({
    mode: "onBlur",
  });
  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await registerUser(data).unwrap();
      // Clear existing token from cookies
      Cookies.remove("token");
      toast.success("Registration successful! Redirecting to login...");
      reset();
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after 2 seconds
      }, 2000);
    } catch (error: any) {
      if (error.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register("username", { required: "Username is required" })}
              className={`block w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring focus:ring-opacity-50 focus:ring-green-500 ${
                errors.username
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email address",
                },
              })}
              className={`block w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring focus:ring-opacity-50 focus:ring-green-500 ${
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className={`block w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring focus:ring-opacity-50 focus:ring-green-500 ${
                errors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition ${
              isSubmitting ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
