import { useState } from "react";
import axios from "axios";
import {
  FaExclamationTriangle,
  FaSpinner,
  FaCheckCircle,
  FaFilePdf,
  FaSearch,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { FiUpload, FiAlertCircle } from "react-icons/fi";
import Icon from "../Icon/AppIcon";
import FeatureHighlights from "../Icon/FeatureHighlights";

function ATSResume() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [resData, setresData] = useState(true);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const [jobs, setJobs] = useState([]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError("");
      setResponse(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError("Please upload a resume (PDF format).");
      return;
    }

    setLoading(true);
    setError("");
    setResponse(null);
    setJobs([]);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", category);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/resume/analyze`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResponse(res.data);
      setresData(false);
      const jobRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/jobs?category=${category}`
      );
      setJobs(jobRes.data);
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const popularCategories = [
    "Software Engineer",
    "Data Scientist",
    "Product Manager",
    "Marketing Manager",
    "Sales Representative",
    "Business Analyst",
    "UI/UX Designer",
    "DevOps Engineer",
  ];

  return (
    <div className="min-h-screen py-8 px-2 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="py-3">
          <h2 className="font-bold text-3xl text-gray-600">
            Upload Your Resume
          </h2>
          <p className="text-gray-500 text-base py-1">
            Get personalized job recommendations based on your skills and
            experience.
          </p>
        </div>

        <div className=" rounded-lg border overflow-hidden mb-8">
          <div className="p-2 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload */}
              <div className="bg-gray-100 hover:bg-gray-200 transition-all ease-in-out rounded-2xl ">
                <div className="mt-1 flex justify-center px-6 py-12  border-2 border-blue-200 border-dashed rounded-xl">
                  <div className="space-y-1 text-center">
                    {file ? (
                      <div className="flex items-center justify-center space-x-2">
                        <FaFilePdf className="h-10 w-10 text-red-500" />
                        <span className="text-sm font-medium text-gray-900 truncate max-w-xs">
                          {fileName}
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-center">
                          <FiUpload className="h-10 w-10 text-gray-400" />
                        </div>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer   rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              accept="application/pdf"
                              onChange={handleFileChange}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF up to 5MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Job Category */}
              <div className="w-full space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold text-gray-700">
                    Target Job Category
                  </h3>
                  <p className="text-muted-foreground">
                    Specify your target role for personalized analysis and
                    recommendations
                  </p>
                </div>
                <div className="space-y-4">
                  <Icon
                    name="Search"
                    size={20}
                    className="text-blue-500 absolute mt-3.5 ml-2"
                  />
                  <input
                    type="text"
                    id="category"
                    value={category}
                    placeholder="e.g., Software Engineer, Data Scientist, Product Manager"
                    onChange={(e) => setCategory(e.target.value)}
                    description="Enter the specific role you're targeting for tailored ATS optimization"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 py-3 bg-gray-100 hover:bg-gray-200 transition-all ease-in-out border-gray-300 rounded-full"
                  />

                  <div className="space-y-3">
                    {resData ? (
                      <>
                        <div className="flex items-center gap-2">
                          <Icon
                            name="Sparkles"
                            size={16}
                            className="text-blue-500"
                          />
                          <span className="text-sm font-medium text-foreground">
                            Popular Categories
                          </span>
                        </div>{" "}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {popularCategories?.map((category, index) => (
                            <p
                              key={index}
                              onClick={() => setCategory(category)}
                              className={`
                  px-3 py-2 text-sm rounded-lg border transition-all duration-200
                  ${
                    popularCategories === category
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground hover:bg-primary/5"
                  }
               
                `}
                            >
                              {category}
                            </p>
                          ))}
                        </div>{" "}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FiAlertCircle className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        {error}
                      </h3>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !file}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  loading || !file
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                } transition-colors duration-200`}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Resume & Find Jobs"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Results Section */}
        {response && (
          <div className="space-y-8">
            {/* Analysis Overview */}
            <div className="bg-white rounded-xl  overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex items-center mb-6">
                  <div className="p-2 rounded-full bg-green-100 mr-4">
                    <FaCheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Analysis Results
                  </h2>
                </div>

                {/* Match Percentage */}
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      ATS Compatibility
                    </span>
                    <span className="text-sm font-semibold text-blue-600">
                      {response.matchPercentage}% Match
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        response.matchPercentage >= 70
                          ? "bg-green-500"
                          : response.matchPercentage >= 40
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${response.matchPercentage}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Your resume matches{" "}
                    <span className="font-semibold">
                      {response.matchPercentage}%
                    </span>{" "}
                    of the typical requirements for a{" "}
                    <span className="font-semibold">"{category}"</span> role.
                  </p>
                </div>

                {/* Strengths */}
                <div className="mb-8">
                  <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                    <span className="w-6 h-6 rounded-full  text-green-600 flex items-center justify-center mr-3">
                      ✓
                    </span>
                    Strengths
                  </h3>
                  <ul className="space-y-3">
                    {response.strengths.map((point, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-2">
                          •
                        </span>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Missing Keywords */}
                <div className="mb-8">
                  <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                    <span className="w-6 h-6 rounded-full  text-red-600 flex items-center justify-center mr-3">
                      !
                    </span>
                    Missing Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {response.missingKeywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Suggestions */}
                <div className="mb-6">
                  <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                    <span className="w-6 h-6 rounded-full  text-blue-600 flex items-center justify-center mr-3">
                      💡
                    </span>
                    Improvement Suggestions
                  </h3>
                  <ul className="space-y-3">
                    {response.suggestions.map((suggestion, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5 mr-2">
                          •
                        </span>
                        <span className="text-gray-700">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Summary */}
                <div>
                  <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                    <span className="w-6 h-6 rounded-full text-purple-600 flex items-center justify-center mr-3">
                      📄
                    </span>
                    Summary
                  </h3>
                  <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                    {response.summary}
                  </p>
                </div>
              </div>
            </div>

            {/* Jobs Section */}
            {jobs.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Recommended Jobs for "{category}"
                  </h2>
                  <div className="space-y-4">
                    {jobs.map((job, idx) => (
                      <div
                        key={idx}
                        className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-start">
                          <img
                            src={job.logo}
                            alt={`${job.company} logo`}
                            className="h-12 w-12 rounded-md object-contain mr-4"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {job.title}
                              </h3>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {job.duration}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {job.company}
                            </p>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <span className="inline-flex items-center text-sm text-gray-500">
                                📍 {job.location}
                              </span>
                              <span className="inline-flex items-center text-sm text-gray-500">
                                💰 {job.stipend}
                              </span>
                            </div>
                            <a
                              href={job.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                            >
                              View Job{" "}
                              <FaExternalLinkAlt className="ml-1 h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {resData ? <FeatureHighlights /> : ""}
      </div>
    </div>
  );
}

export default ATSResume;
