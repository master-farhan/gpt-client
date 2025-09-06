import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        data,
        {
          withCredentials: true,
        }
      );

      const result = response.data;
      if (result) {
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light text-dark transition-colors">
      <div className="w-full max-w-md p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="space-y-5"
        >
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /.+@.+\..+/, message: "Invalid email" },
              })}
              type="email"
              autoComplete="off"
              className="input w-full px-4 py-2 rounded-lg border border-accent bg-light/80 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.email && (
              <span className="text-red text-sm mt-1 block">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              id="password"
              {...register("password", { required: "Password is required" })}
              type="password"
              autoComplete="off"
              className="input w-full px-4 py-2 rounded-lg border border-accent bg-light/80 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.password && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.password.message}
              </span>
            )}
          </div>
          <button
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-60"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
