import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { PiBookmarkFill } from "react-icons/pi";
import { Button } from "../ui/button";
import DropdownTable from "./DropdownTables";
import axios from "axios";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#16a34a", "#e5e7eb"];

const SheetDetails = () => {
  const { id: sheetId } = useParams();

  const [isFollowing, setIsFollowing] = useState(false);
  const [sheetMeta, setSheetMeta] = useState(null);
  const [sheetQuestions, setSheetQuestions] = useState([]);

  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);

  // ================= FETCH DATA =================
  const fetchSheetQuestions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/sheets/details/${sheetId}`,
        {
          withCredentials: true,
        }
      );

      const apiData = response.data.data;

      setSheetMeta(apiData.sheet);
      setSheetQuestions(apiData.mappings || []);

      setIsFollowing(apiData.sheet?.isFollowing || false);

      const solvedCount =
        apiData.mappings?.filter((q) => q.isSolved).length || 0;

      setCompleted(solvedCount);
      setTotal(apiData.mappings?.length || 0);
    } catch (error) {
      console.error("Error fetching sheet:", error);
    }
  };

  useEffect(() => {
    if (sheetId) {
      fetchSheetQuestions();
    }
  }, [sheetId]);

  // ================= GROUP DATA =================
  const groupedTopics = useMemo(() => {
    if (!sheetMeta || !sheetQuestions?.length) return [];

    const topicMap = {};

    sheetQuestions.forEach((q) => {
      const topic = q.topic || "Untitled Topic";
      const subTopic = q.subTopic || "General";

      if (!topicMap[topic]) topicMap[topic] = {};
      if (!topicMap[topic][subTopic]) topicMap[topic][subTopic] = [];

      topicMap[topic][subTopic].push(q);
    });

    return (sheetMeta.config?.topicOrder || Object.keys(topicMap))
      .filter((topic) => topicMap[topic])
      .map((topic) => ({
        topic,
        subTopics: (
          sheetMeta.config?.subTopicOrder?.[topic] ||
          Object.keys(topicMap[topic])
        )
          .filter((sub) => topicMap[topic][sub])
          .map((sub) => ({
            sub,
            questions: topicMap[topic][sub],
          })),
      }));
  }, [sheetMeta, sheetQuestions]);

  // ================= FOLLOW =================
  const handleFollow = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/sheets/follow`,
        { sheetId },
        { withCredentials: true }
      );

      setIsFollowing((prev) => !prev);
    } catch (error) {
      console.error("Follow error:", error);
    }
  };

  // ================= CHART =================
  const chartData = [
    { name: "Completed", value: completed },
    { name: "Remaining", value: total - completed },
  ];

  return (
    <div className="mt-5 max-w-7xl mx-auto">

      {/* ================= BANNER ================= */}
      {sheetMeta?.banner && (
        <img
          src={sheetMeta.banner}
          alt="sheet banner"
          className="w-full h-60 object-cover rounded-xl"
        />
      )}

      {/* ================= HEADER ================= */}
      <header className="w-full flex flex-col lg:flex-row justify-between px-4 py-6 gap-6">

        {/* LEFT */}
        <div className="w-full lg:w-3/4 flex flex-col gap-3">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            {sheetMeta?.name}
          </h2>

          <p className="text-gray-500 whitespace-pre-line leading-relaxed">
            {sheetMeta?.description}
          </p>

          {/* AUTHOR */}
          <div className="flex items-center gap-3 mt-2">
            <img
              src={sheetMeta?.authorDetails?.imageUrl}
              alt="author"
              className="w-10 h-10 rounded-full"
            />

            <div>
              <p className="font-medium">
                {sheetMeta?.authorDetails?.profileName}
              </p>
              <p className="text-sm text-gray-500">
                {sheetMeta?.authorDetails?.college}
              </p>
            </div>
          </div>

          {/* META */}
          <div className="flex gap-4 flex-wrap text-sm text-gray-600">
            <span>👥 {sheetMeta?.followers} followers</span>

            {(sheetMeta?.tag || []).map((tag, i) => (
              <span
                key={i}
                className="bg-gray-100 px-2 py-1 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* LINK */}
          <a
            href={sheetMeta?.link}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline text-sm"
          >
            Open Original Sheet
          </a>

          {/* FOLLOW BUTTON */}
          <Button
            variant="outline"
            className={`flex items-center gap-2 w-fit ${
              isFollowing
                ? "border-green-500 text-green-600"
                : ""
            }`}
            onClick={handleFollow}
          >
            <PiBookmarkFill size={18} />
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>

        {/* RIGHT CHART */}
        <div className="w-full lg:w-1/4 flex justify-center items-center">
          <div className="relative">

            <PieChart width={160} height={160}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={70}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>

            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-2xl font-bold">{completed}</div>
              <div className="text-gray-400">/</div>
              <div className="text-xl text-gray-500">{total}</div>
            </div>

          </div>
        </div>
      </header>

      <hr />

      {/* ================= QUESTIONS ================= */}
      <div className="p-4">
        <DropdownTable topics={groupedTopics} sheetId={sheetId} />
      </div>
    </div>
  );
};

export default SheetDetails;