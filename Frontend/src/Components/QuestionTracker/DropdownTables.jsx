import React, { useState } from "react";
import {
  PiCaretDown,
  PiCaretRight,
  PiArrowSquareOut,
  PiPlayCircle,
  PiCheckCircleFill,
  PiCircle,
} from "react-icons/pi";
import { Badge } from "../ui/badge";

const difficultyColors = {
  Easy: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  Medium:
    "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  Hard: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400 border-red-200 dark:border-red-800",
};

const DropdownTable = ({ topics = [] }) => {
  const [openTopic, setOpenTopic] = useState(null);
  const [openSubTopic, setOpenSubTopic] = useState({});

  const toggleTopic = (topic) => {
    setOpenTopic(openTopic === topic ? null : topic);
  };

  const toggleSubTopic = (topic, sub) => {
    setOpenSubTopic((prev) => ({
      ...prev,
      [`${topic}-${sub}`]: !prev[`${topic}-${sub}`],
    }));
  };

  return (
    <div className="space-y-3">
      {(topics || []).map((topicItem, topicIndex) => {
        const isTopicOpen = openTopic === topicItem.topic;
        const totalQuestions = (topicItem.subTopics || []).reduce(
          (acc, sub) => acc + (sub.questions || []).length,
          0
        );
        const solvedQuestions = (topicItem.subTopics || []).reduce(
          (acc, sub) =>
            acc +
            (sub.questions || []).filter((q) => q.isSolved).length,
          0
        );
        const topicProgress =
          totalQuestions > 0
            ? Math.round((solvedQuestions / totalQuestions) * 100)
            : 0;

        return (
          <div
            key={topicIndex}
            className="rounded-xl border bg-card shadow-sm overflow-hidden transition-all duration-200"
          >
            {/* TOPIC HEADER */}
            <div
              className="px-5 py-4 cursor-pointer flex items-center gap-3 hover:bg-muted/50 transition-colors"
              onClick={() => toggleTopic(topicItem.topic)}
            >
              <span className="text-muted-foreground">
                {isTopicOpen ? (
                  <PiCaretDown size={18} />
                ) : (
                  <PiCaretRight size={18} />
                )}
              </span>

              <span className="font-semibold text-foreground flex-1">
                {topicItem.topic}
              </span>

              {/* Mini progress bar */}
              <div className="hidden sm:flex items-center gap-2 mr-2">
                <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${topicProgress}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8 text-right">
                  {topicProgress}%
                </span>
              </div>

              <Badge variant="secondary" className="text-xs px-2.5 py-0.5 font-medium">
                {solvedQuestions}/{totalQuestions}
              </Badge>
            </div>

            {/* SUBTOPICS */}
            {isTopicOpen && (
              <div className="border-t">
                {(topicItem.subTopics || []).map((subItem, subIndex) => {
                  const isSubOpen =
                    openSubTopic[`${topicItem.topic}-${subItem.sub}`];

                  return (
                    <div key={subIndex} className="border-b last:border-b-0">
                      {/* SUBTOPIC HEADER */}
                      <div
                        className="px-8 py-3 cursor-pointer flex items-center gap-3 hover:bg-muted/30 transition-colors"
                        onClick={() =>
                          toggleSubTopic(topicItem.topic, subItem.sub)
                        }
                      >
                        <span className="text-muted-foreground">
                          {isSubOpen ? (
                            <PiCaretDown size={14} />
                          ) : (
                            <PiCaretRight size={14} />
                          )}
                        </span>
                        <span className="text-sm font-medium text-foreground/80 flex-1">
                          {subItem.sub}
                        </span>
                        <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                          {(subItem.questions || []).length}
                        </span>
                      </div>

                      {/* QUESTIONS TABLE */}
                      {isSubOpen && (
                        <div className="bg-muted/10">
                          {(subItem.questions || []).map(
                            (question, qIndex) => (
                              <div
                                key={qIndex}
                                className="px-10 py-3 flex items-center gap-4 border-t hover:bg-muted/20 transition-colors group"
                              >
                                {/* Solved indicator */}
                                {question.isSolved ? (
                                  <PiCheckCircleFill
                                    className="text-emerald-500 shrink-0"
                                    size={18}
                                  />
                                ) : (
                                  <PiCircle
                                    className="text-muted-foreground/40 shrink-0"
                                    size={18}
                                  />
                                )}

                                {/* Question name */}
                                <span className="flex-1 text-sm font-medium text-foreground/90 group-hover:text-foreground transition-colors">
                                  {question.questionId?.name}
                                </span>

                                {/* Difficulty badge */}
                                <span
                                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                                    difficultyColors[
                                      question.questionId?.difficulty
                                    ] || "bg-muted text-muted-foreground"
                                  }`}
                                >
                                  {question.questionId?.difficulty}
                                </span>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                  <a
                                    href={question.questionId?.problemUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 px-2.5 py-1 rounded-md border border-transparent hover:border-border transition-all"
                                  >
                                    <PiArrowSquareOut size={13} />
                                    Solve
                                  </a>

                                  {question.resource && (
                                    <a
                                      href={question.resource}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700 px-2.5 py-1 rounded-md border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800 transition-all"
                                    >
                                      <PiPlayCircle size={13} />
                                      Video
                                    </a>
                                  )}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DropdownTable;