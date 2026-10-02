import React, { useMemo, useState } from "react";
import Questions from "./Questions";

const QuestionPage = ({ setActiveScreen, setSelectedQuestionId }) => {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [topic, setTopic] = useState("All");

  const filteredQuestions = useMemo(() => {
    return Questions.filter((q) => {
      const matchSearch = q.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchDifficulty =
        difficulty === "All" || q.difficulty === difficulty;
      const matchTopic = topic === "All" || q.topic === topic;
      return matchSearch && matchDifficulty && matchTopic;
    });
  }, [search, difficulty, topic]);

  const handleSolve = (question) => {
    setSelectedQuestionId(question.id);
    setActiveScreen("Compiler");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <div className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            DSA Question Bank
          </h1>
          <div className="text-gray-600 font-medium">
            {filteredQuestions.length} Questions
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto mt-8 px-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <input
              className="border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Search Question..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="All">All Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
             </select>
             <select
              className="border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              >
              <option value="All">All Topics</option>
              <option value="Array">Array</option>
              <option value="Loop">Loop</option>
              <option value="Recursion">Recursion</option>
             </select>
              </div>

             {/* Table */}
            <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-4 text-gray-800 font-semibold">
                    #
                  </th>
                  <th className="text-left p-4 text-gray-800 font-semibold">
                    Title
                  </th>
                  <th className="text-left p-4 text-gray-800 font-semibold">
                    Topic
                  </th>
                  <th className="text-left p-4 text-gray-800 font-semibold">
                    Difficulty
                  </th>
                  <th className="text-left p-4 text-gray-800 font-semibold">
                    Marks
                  </th>
                  <th className="text-left p-4 text-gray-800 font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredQuestions.map((question) => (
                  <tr
                    key={question.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4 text-gray-900">{question.id}</td>
                    <td className="p-4 font-semibold text-gray-900">
                      {question.title}
                    </td>
                    <td className="p-4">
                      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {question.topic}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          question.difficulty === "Easy"
                            ? "bg-green-100 text-green-700"
                            : question.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {question.difficulty}
                      </span>
                    </td>
                    <td className="p-4 text-gray-900 font-medium">
                      {question.marks}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleSolve(question)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition duration-200"
                      >
                        Solve
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredQuestions.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-gray-500">
                      No questions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;