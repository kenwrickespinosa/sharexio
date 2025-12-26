import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = { email, password };

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to login");
      }

      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      <div>
        <p className="text-2xl font-bold md:text-4xl">Welcome</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="border rounded-md flex flex-col gap-6 px-4 py-6">
          <span className="flex flex-col gap-2">
            <p className="text-neutral-400">Email</p>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-75 md:w-96"
            />
          </span>
          <span className="flex flex-col gap-2">
            <p className="text-neutral-400">Password</p>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-75 md:w-96"
            />
          </span>
          <Button type="submit" className="w-75 cursor-pointer md:w-96">Log In</Button>
        </div>
      </form>
      <div>
        <p className="text-sm md:text-base">
          Create an account? Click here to{" "}
          <Link to="/auth/signup" className="text-blue-500 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
