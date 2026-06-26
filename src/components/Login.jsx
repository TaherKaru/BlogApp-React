import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "../components/index";
import { Link, useNavigate } from "react-router-dom";
import service from "../AppWrite/Auth";
import { login as authLogin } from "../Storage/AuthSlice";

function Login() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await service.login(data);
      if (session) {
        const userData = await service.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };


return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
    <div
      className={`mx-auto w-full max-w-lg bg-white rounded-2xl p-8 shadow-xl border border-blue-100`}
    >
      <div className="mb-6 flex justify-center">
        <span className="inline-block w-full max-w-[100px]">
          <Logo width="100%" />
        </span>
      </div>
      <h2 className="text-center text-3xl font-bold leading-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Sign in to your account
      </h2>
      <p className="mt-3 text-center text-base text-gray-600">
        Don&apos;t have any account?&nbsp;
        <Link
          to="/signup"
          className="font-semibold text-blue-600 transition-all duration-200 hover:text-indigo-600 hover:underline"
        >
          Sign Up
        </Link>
      </p>
      {error && <p className="text-red-600 mt-8 text-center bg-red-50 p-3 rounded-lg">{error}</p>}

      <form onSubmit={handleSubmit(login)} className="mt-8">
        <div className="space-y-5">
          <Input
            type="email"
            placeholder="Enter your email"
            label="Email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />

          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
            })}
          />

          <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg py-3">
            Sign in
          </Button>
        </div>
      </form>
    </div>
  </div>
);
}

export default Login;
