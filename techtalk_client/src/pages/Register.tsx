import React from "react";
import { useForm } from "react-hook-form";

type RegisterFromInputs = {
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFromInputs>();

  const onSubmit = async (data: RegisterFromInputs) => {
    try {
      console.log("success", data);
      
    } catch (error) {
      console.log("Registeration failed", error);
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
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
            className="block w-full"
          />
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}
        </div>
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
            {...register("password", { required: "Password is required" })}
            className="block w-full"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <button type="submit" className="w-full bg-green-500 text-white py-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
