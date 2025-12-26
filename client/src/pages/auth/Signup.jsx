import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [isDateOpen, setIsDateOpen] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [date, setDate] = useState(undefined);
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      firstname,
      lastname,
      gender,
      birthdate: date,
      email,
      password,
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/api/signup", {
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
      navigate("/home")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      <div>
        <p className="text-2xl font-bold md:text-4xl">Create an account</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="border rounded-md flex flex-col gap-6 px-4 py-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <span className="flex flex-col gap-2">
              <p className="text-neutral-600">Firstname</p>
              <Input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-72 md:w-72"
              />
            </span>
            <span className="flex flex-col gap-2">
              <p className="text-neutral-600">Lastname</p>
              <Input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-72 md:w-72"
              />
            </span>
          </div>
          <div className="flex justify-between gap-2">
            <div className="flex flex-col gap-2">
              <p className="text-neutral-600">Birthdate</p>
              <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
                <PopoverTrigger asChild>
                  <Button className="bg-white text-black border w-36 md:w-72 cursor-pointer hover:bg-neutral-50">
                    {date ? date : "Select Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={date ? new Date(date) : undefined}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      if (!date) return;

                      const formatted = date.toISOString().split("T")[0];
                      setDate(formatted);
                      setIsDateOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-neutral-600">Gender</p>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="w-36 md:w-72 cursor-pointer hover:bg-neutral-50">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="w-36 md:w-72">
                    <SelectLabel>Select your gender</SelectLabel>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Binary">Binary</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-col">
            <span className="flex flex-col gap-2">
              <p className="text-neutral-600">Email</p>
              <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-72 md:w-full"
              />
            </span>
            <span className="flex flex-col gap-2">
              <p className="text-neutral-600">Password</p>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-72 md:w-full"
              />
            </span>
          </div>
          <Button type="submit" className="cursor-pointer">Sign Up</Button>
        </div>
      </form>
      <div>
        <p className="text-sm md:text-base">
          Already have an account? Click here to{" "}
          <Link to="/auth/login" className="text-blue-500 underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
