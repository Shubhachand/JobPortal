import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
const Navbar = () => {
  const user = false;
  return (
    <div className=" bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>
          {!user ? (
            <div className="flex items-centre gap-2">
              <Button
                variant="outline"
                className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-2 text-sm font-medium transition-colors duration-200"
              >
                Login
              </Button>

              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 text-sm font-medium shadow-sm transition-colors duration-200">
                Signup
              </Button>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 space-y-4">
                {/* Profile Section */}
                <div className="flex items-center gap-4 border-b pb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="User Avatar"
                    />
                  </Avatar>
                  <div>
                    <h4 className="text-lg font-semibold">Shubham</h4>
                    <p className="text-sm text-gray-500">
                      Software Engineer at Job Portal
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <Button
                    variant="link"
                    className="justify-start text-left hover:text-blue-600"
                  >
                    View Profile
                  </Button>
                  <Button
                    variant="link"
                    className="justify-start text-left hover:text-red-500"
                  >
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
