import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      <div>
        <p className="text-2xl font-bold md:text-4xl">Welcome</p>
      </div>
      <form>
        <div className="border rounded-md flex flex-col gap-6 px-4 py-6">
          <span className="flex flex-col gap-2">
            <p className="text-neutral-400">Email</p>
            <Input type="text" className="w-75 md:w-96" />
          </span>
          <span className="flex flex-col gap-2">
            <p className="text-neutral-400">Password</p>
            <Input type="password" className="w-75 md:w-96" />
          </span>
          <Button className="w-75 cursor-pointer md:w-96">Log In</Button>
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
