import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";

const Explore = () => {
  const [search, setSearch] = useState("");
  const [sheets, setSheets] = useState([]);

  // ⭐ Fetch sheets
  const fetchSheets = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/sheets/data`,
        { withCredentials: true },
      );

      // ✅ Correct path based on your API structure
      const sheetsData = response.data?.data?.sheets || [];

      setSheets(sheetsData);

      console.log("this is sheets", sheetsData);
    } catch (error) {
      console.error("Error fetching sheets:", error);
    }
  };

  useEffect(() => {
    fetchSheets();
  }, []);

  return (
    <div className="flex flex-col w-full h-full md:py-10 md:px-5 gap-8 no-scrollbar relative">
      {/* Header */}
      <div className="flex flex-col">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-darkText-300">
          Track Coding Sheets in One Place
        </h3>
        <p className="text-sm text-gray-600 dark:text-darkText-400">
          Choose from 30+ structured coding paths
        </p>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-[26rem]">
        <Search className="absolute w-5 h-5 text-gray-400 right-3 top-1/2 -translate-y-1/2" />
        <Input
          type="text"
          placeholder="Search any coding sheet"
          className="w-full p-2 pr-10 text-gray-800 bg-white border shadow-sm dark:border-darkBorder-700 dark:bg-dark-900 dark:text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Sheets Grid */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-medium text-gray-500 dark:text-darkText-400">
          All Sheets
        </h2>

        <div className="grid gap-4 md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {Array.isArray(sheets) &&
            sheets.map((sheet, idx) => (
              <Link key={idx} to={`sheet/${sheet.sheet._id}`}>
                <div className="w-full bg-white dark:bg-dark-900 border border-gray-200 dark:border-darkBorder-700 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
                  {/* ⭐ Top Beige Progress Strip */}
                  <div className="w-full h-12 bg-[#e6d3b5] flex items-center justify-end px-4">
                    <span className="text-black font-semibold">0%</span>
                  </div>

                  {/* ⭐ Content */}
                  <div className="p-5 flex flex-col gap-4">
                    {/* Title + Followers */}
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {sheet.sheet?.name}
                      </h3>

                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        👥 {26795} Followers
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {sheet.sheet?.description}
                    </p>

                    <hr className="border-gray-200 dark:border-darkBorder-700" />

                    {/* Bottom Section */}
                    <div className="flex justify-between items-center">
                      <div className="text-gray-600 text-sm">
                        ✔ {sheet.config?.questionOrder?.length || 0} questions
                      </div>

                      <button
                        className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-medium transition"
                        onClick={(e) => e.preventDefault()} // prevents Link navigation
                      >
                        Follow
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
