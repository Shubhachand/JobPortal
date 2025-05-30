import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { USER_API_END_POINT } from "@/utils/constant";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        input,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>

          <div className="my-2">
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              id="fullname"
              type="text"
              placeholder="enter your name"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              required
            />
          </div>

          <div className="my-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="enter email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              required
            />
          </div>

          <div className="my-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="text"
              placeholder="enter your number"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              required
            />
          </div>

          <div className="my-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="enter password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              required
            />
          </div>

          <RadioGroup
            value={input.role}
            onValueChange={(value) =>
              setInput((prev) => ({ ...prev, role: value }))
            }
            className="flex items-center gap-4 my-5"
          >
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                id="student"
                name="role"
                value="student"
                className="cursor-pointer"
                checked={input.role === "student"}
                onChange={changeEventHandler}
              />
              <Label htmlFor="student">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                id="recruiter"
                name="role"
                value="recruiter"
                className="cursor-pointer"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
              />
              <Label htmlFor="recruiter">Recruiter</Label>
            </div>
          </RadioGroup>

          <Button
            type="submit"
            className="w-full my-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors font-medium cursor-pointer"
          >
            Signup
          </Button>

          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
