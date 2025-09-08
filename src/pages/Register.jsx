import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useChat } from "../context/ChatContext";

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useChat();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://gpt-0-09.onrender.com/api/auth/register",
        data,
        {
          withCredentials: true,
        }
      );

      const result = response.data.user;
      if (result) {
        setUser(result);
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light text-dark transition-colors">
      <div className="w-full max-w-md p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="space-y-5"
        >
          <div className="grid grid-cols-6 gap-5">
            <div className="col-span-3">
              <label htmlFor="firstName" className="block mb-1 font-medium">
                First Name
              </label>
              <input
                id="firstName"
                {...register("firstName", {
                  required: "First name is required",
                })}
                type="text"
                autoComplete="off"
                className="input w-full px-4 py-2 rounded-lg border border-secondary bg-light/80 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className="col-span-3">
              <label htmlFor="lastName" className="block mb-1 font-medium">
                Last Name
              </label>
              <input
                id="lastName"
                {...register("lastName", { required: "Last name is required" })}
                type="text"
                autoComplete="off"
                className="input w-full px-4 py-2 rounded-lg border border-secondary bg-light/80 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.lastName && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>
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
              className="input w-full px-4 py-2 rounded-lg border border-secondary bg-light/80 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1 block">
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
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
              type="password"
              autoComplete="off"
              className="input w-full px-4 py-2 rounded-lg border border-secondary bg-light/80 focus:outline-none focus:ring-2 focus:ring-primary"
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
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        {/* 🔹 Add Login link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-indigo-600 hover:underline font-medium"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
