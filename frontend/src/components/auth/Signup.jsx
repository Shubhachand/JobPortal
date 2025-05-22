import React, { useState } from "react";
import Navbar from "../shared/Navbar";
// import { Input } from 'postcss'
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroupItem, RadioGroup } from "../ui/radio-group";
// import { Button } from "../ui/button";
import { USER_API_END_POINT } from '@/utils/constant'; 
// Adjust the path based on where you saved it

import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { toast, } from "sonner";

import axios from "axios";
// import { Button } from "../ui/button";
// import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const nagivate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if(input.file){
            formData.append("file",input.file);
        }
    try{
        const res = await axios.post(`${USER_API_END_POINT}/register`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true,
        })
        if(res.data.success){
            nagivate("/login");
            toast.success(res.data.message);
        }
    }catch(error){
        console.log(error);
        toast.error(error.response.data.message);
    }
    console.log(input);
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
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
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="enter your name"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="enter email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="text"
              placeholder="enter your number"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>password</Label>
            <Input
              type="password"
              placeholder="enter password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup
              defaultValue="comfortable"
              className="flex items-center gap-4 my-5"
            >
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  className="cursor-pointer"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input accept="image/*" type="file" className="cursor-pointer" />
            </div>
          </div>
          <Button type="submit" className="w-full my-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors font-medium cursor-pointer">
        
            Signup
          </Button>
          <span className="text-sm">
            Already have an account ?
            <Link to="/login" className="text-blue-600 ">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
