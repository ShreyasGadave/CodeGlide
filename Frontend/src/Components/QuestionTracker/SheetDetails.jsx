import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  PiBookmarkSimpleFill,
  PiBookmarkSimple,
  PiArrowSquareOut,
  PiUsers,
  PiTrophy,
  PiTarget,
  PiLightning,
} from "react-icons/pi";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Progress } from "../ui/progress";
import DropdownTable from "./DropdownTables";
import axios from "axios";

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
        { withCredentials: true }
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
    if (sheetId) fetchSheetQuestions();
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

  // ================= DERIVED =================
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const remaining = total - completed;

  // SVG donut chart
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

      {/* ================= BANNER ================= */}
      {sheetMeta?.banner && (
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={sheetMeta.banner}
            alt="sheet banner"
            className="w-full h-48 sm:h-56 md:h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      )}

      {/* ================= MAIN CARD ================= */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">

            {/* ---- LEFT SECTION ---- */}
            <div className="flex-1 p-6 md:p-8 space-y-5">

              {/* Title + Follow */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    {sheetMeta?.name}
                  </h1>
                  <p className="text-muted-foreground text-sm md:text-base whitespace-pre-line leading-relaxed max-w-2xl">
                    {sheetMeta?.description}
                  </p>
                </div>

                <Button
                  variant={isFollowing ? "default" : "outline"}
                  size="sm"
                  className={`shrink-0 gap-2 transition-all duration-200 ${
                    isFollowing
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
                      : "hover:border-emerald-500 hover:text-emerald-600"
                  }`}
                  onClick={handleFollow}
                >
                  {isFollowing ? (
                    <PiBookmarkSimpleFill size={16} />
                  ) : (
                    <PiBookmarkSimple size={16} />
                  )}
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </div>

              <Separator />

              {/* Author */}
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11 ring-2 ring-border">
                  <AvatarImage
                    src={sheetMeta?.authorDetails?.imageUrl}
                    alt={sheetMeta?.authorDetails?.profileName}
                  />
                  <AvatarFallback className="text-xs font-semibold">
                    {sheetMeta?.authorDetails?.profileName
                      ?.slice(0, 2)
                      ?.toUpperCase() || "AU"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    {sheetMeta?.authorDetails?.profileName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {sheetMeta?.authorDetails?.college}
                  </p>
                </div>
              </div>

              {/* Meta Row */}
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="secondary" className="gap-1.5 px-3 py-1">
                  <PiUsers size={14} />
                  {sheetMeta?.followers || 0} followers
                </Badge>

                {(sheetMeta?.tag || []).map((tag, i) => (
                  <Badge key={i} variant="outline" className="px-3 py-1">
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Original sheet link */}
              {sheetMeta?.link && (
                <a
                  href={sheetMeta.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4 transition-colors"
                >
                  <PiArrowSquareOut size={15} />
                  Open Original Sheet
                </a>
              )}
            </div>

            {/* ---- RIGHT SECTION — Progress ---- */}
            <div className="lg:w-72 xl:w-80 border-t lg:border-t-0 lg:border-l bg-muted/30 p-6 md:p-8 flex flex-col items-center justify-center gap-5">

              {/* SVG Donut Chart */}
              <div className="relative w-36 h-36">
                <svg
                  className="w-full h-full -rotate-90"
                  viewBox="0 0 120 120"
                >
                  {/* Background ring */}
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    stroke="hsl(var(--border))"
                    strokeWidth="10"
                  />
                  {/* Progress ring */}
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    stroke="hsl(142, 71%, 45%)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-foreground">
                    {percentage}%
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">
                    complete
                  </span>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="w-full grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-background border px-2 py-2.5">
                  <PiTarget className="mx-auto text-muted-foreground mb-1" size={16} />
                  <p className="text-lg font-bold text-foreground">{total}</p>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                    Total
                  </p>
                </div>
                <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 px-2 py-2.5">
                  <PiTrophy className="mx-auto text-emerald-600 mb-1" size={16} />
                  <p className="text-lg font-bold text-emerald-600">{completed}</p>
                  <p className="text-[10px] text-emerald-600/80 font-medium uppercase tracking-wider">
                    Done
                  </p>
                </div>
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 px-2 py-2.5">
                  <PiLightning className="mx-auto text-amber-600 mb-1" size={16} />
                  <p className="text-lg font-bold text-amber-600">{remaining}</p>
                  <p className="text-[10px] text-amber-600/80 font-medium uppercase tracking-wider">
                    Left
                  </p>
                </div>
              </div>

              {/* Linear progress bar */}
              <div className="w-full space-y-1.5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{completed}/{total}</span>
                </div>
                <Progress
                  value={percentage}
                  className="h-2 [&>div]:bg-emerald-500"
                />
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* ================= QUESTIONS ================= */}
      <div>
        <DropdownTable topics={groupedTopics} sheetId={sheetId} />
      </div>
    </div>
  );
};

export default SheetDetails;