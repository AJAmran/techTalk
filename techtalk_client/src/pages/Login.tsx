import { useForm } from "react-hook-form";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      console.log("success", data);
    } catch (error) {
      console.log("Login failed", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 bg-white shadow-md rounded"
      >
        <div className="mb-2">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="block w-full"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is" })}
            className="block w-full"
          />
          {errors.password && (
            <span className="text-red-500">{errors.email?.message}</span>
          )}
        </div>
        <button className="w-full bg-blue-500 text-white py-2" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
