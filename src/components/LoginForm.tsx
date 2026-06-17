import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { loginApi } from "../services/studentApi";

import { toast } from "react-toastify";

const LoginForm = () => {
  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {
    const response =
      await loginApi({
        email,
        password
      });

    if (
      response.data.success
    ) {
      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      toast.success(
        "Login Successful"
      );

      window.location.href =
        "/dashboard";
    }
  } catch (error) {
    toast.error(
      "Invalid Credentials"
    );
  }
};

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
      <h2 className="text-3xl font-bold text-center mb-6">
        Login
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-xl"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-xl"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl"
        >
          Login
        </button>
      </form>

      <p className="text-center mt-5">
        Don't have an account?
      </p>

      <button
        onClick={() =>
          navigate(
            "/register"
          )
        }
        className="w-full mt-2 text-blue-600 font-semibold"
      >
        Register Here
      </button>
    </div>
  );
};

export default LoginForm;