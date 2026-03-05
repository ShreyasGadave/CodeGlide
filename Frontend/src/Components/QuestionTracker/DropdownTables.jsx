import React, { useState } from "react";

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
    <div className="space-y-4">

      {(topics || []).map((topicItem, topicIndex) => (
        <div
          key={topicIndex}
          className="border rounded-xl overflow-hidden shadow-sm"
        >
          {/* TOPIC */}
          <div
            className="bg-gray-100 px-4 py-3 font-semibold cursor-pointer flex justify-between"
            onClick={() => toggleTopic(topicItem.topic)}
          >
            <span>{topicItem.topic}</span>

            <span>
              {(topicItem.subTopics || []).reduce(
                (acc, sub) => acc + ((sub.questions || []).length),
                0
              )}
            </span>
          </div>

          {/* SUBTOPICS */}
          {openTopic === topicItem.topic && (
            <div>

              {(topicItem.subTopics || []).map((subItem, subIndex) => (
                <div key={subIndex} className="border-t">

                  {/* SUBTOPIC */}
                  <div
                    className="px-6 py-3 bg-gray-50 cursor-pointer flex justify-between"
                    onClick={() =>
                      toggleSubTopic(topicItem.topic, subItem.sub)
                    }
                  >
                    <span>{subItem.sub}</span>
                    <span>{(subItem.questions || []).length}</span>
                  </div>

                  {/* QUESTIONS */}
                  {openSubTopic[
                    `${topicItem.topic}-${subItem.sub}`
                  ] && (
                    <div className="px-8 py-2">

                      {(subItem.questions || []).map(
                        (question, qIndex) => (
                          <div
                            key={qIndex}
                            className="py-3 border-b flex justify-between items-center"
                          >
                            <div>
                              <h4 className="font-medium">
                                {question.questionId?.name}
                              </h4>

                              <p className="text-sm text-gray-500">
                                {question.questionId?.difficulty}
                              </p>
                            </div>

                            <div className="flex gap-3">

                              <a
                                href={question.questionId?.problemUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 text-sm"
                              >
                                Solve
                              </a>

                              {question.resource && (
                                <a
                                  href={question.resource}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-green-600 text-sm"
                                >
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
              ))}

            </div>
          )}
        </div>
      ))}

    </div>
  );
};

export default DropdownTable;