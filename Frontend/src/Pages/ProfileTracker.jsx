import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "../Components/ui/button";
import { Card } from "../Components/ui/card";
import { FaChevronUp, FaExternalLinkAlt } from "react-icons/fa";
import {
  SiLeetcode,
  SiGithub,
  SiCodeforces,
  SiGeeksforgeeks,
} from "react-icons/si";

// Icon mapping
const platformIcons = {
  leetcode: <SiLeetcode className="w-5 h-5 text-yellow-500" />,
  github: <SiGithub className="w-5 h-5 text-black dark:text-white" />,
  codeforces: <SiCodeforces className="w-5 h-5 text-blue-600" />,
  geeksforgeeks: <SiGeeksforgeeks className="w-5 h-5 text-green-500" />,
};

const ProfileTracker = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handlePlatformClick = (platform, username) => {
    if (username?.trim()) {
      navigate(`/profile/${platform}`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <div className="py-3">
        <h2 className="font-bold text-3xl text-gray-600">
          Your Coding Journey
        </h2>
        <p className="text-gray-500 text-base py-1">
          Track your progress, achievements, and skill growth all in one place.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4  dark:bg-gray-900 gap-4 min-h-screen">
        {/* Sidebar */}
        <div className="flex flex-col gap-6  dark:bg-gray-800 rounded-lg  md:rounded-r-lg">
          {/* Profile Card */}
          <Card className="flex flex-col items-center gap-3 p-6 bg-gradient-to-r from-[#FFF045] via-[#00CDD7] to-[#2086D7] text-white rounded-lg">
            <img
              src={
                user?.profilePic?.url ||
                "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
              }
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-white"
            />
            <h2 className="text-lg font-semibold">{user?.name || "User"}</h2>
          </Card>

          {/* Platform Links */}
          <Card className="p-1 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div
              className="flex items-center justify-between cursor-pointer bg-gray-100 dark:bg-gray-700 p-2 rounded-md"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <Button
                variant="ghost"
                className="text-sm font-semibold text-left w-full text-gray-800 dark:text-white"
              >
                Platforms
              </Button>
              <FaChevronUp
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {isOpen && (
              <div className="mt-3 flex flex-col gap-2">
                {Object.entries(user?.platforms || {})
                  .filter(([_, username]) => username?.trim())
                  .map(([platform, username]) => (
                    <div
                      key={platform}
                      className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-md cursor-pointer hover:shadow"
                      onClick={() => handlePlatformClick(platform, username)}
                    >
                      <div className="flex items-center gap-2">
                        {platformIcons[platform]}
                        <span className="capitalize text-sm font-medium text-gray-800 dark:text-white">
                          {platform}
                        </span>
                      </div>
                      <FaExternalLinkAlt className="text-gray-500 w-4 h-4" />
                    </div>
                  ))}
              </div>
            )}
          </Card>
        </div>

        {/* Main Content */}
        <div className="col-span-3 dark:bg-gray-800 rounded-lg">
          <Outlet />
        </div>
      </div>{" "}
    </div>
  );
};

export default ProfileTracker;
