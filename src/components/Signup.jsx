import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Button } from "./index";
import service from "../AppWrite/Auth";
import { useForm } from "react-hook-form";
import { login as authLogin } from "../Storage/AuthSlice";
import { useNavigate } from "react-router-dom";
import {Logo} from "./index";
import { Link } from "react-router-dom";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const create = async (data) => {
    setError("");
    try {
      const userSession = await service.signUp(data);
      if (userSession) {
        const currentUser = await service.getCurrentUser();
        if (currentUser) {
          const session = await dispatch(authLogin(currentUser));
          if (session) {
            navigate("/");
          }
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
          Create Account
        </h2>
        <p className="mt-3 text-center text-base text-gray-600">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-semibold text-blue-600 transition-all duration-200 hover:text-indigo-600 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center bg-red-50 p-3 rounded-lg">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
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
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg py-3">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
