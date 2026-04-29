import React from "react";
import { useLocation } from "react-router-dom";

const Evaluate = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data)

  let parsedData;

try {
  parsedData =
    typeof location.state === "string"
      ? JSON.parse(location.state)
      : location.state;
} catch {
  parsedData = null;
}

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        No Data Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center p-6">
      
      <div className="bg-white text-black max-w-2xl w-full rounded-2xl shadow-2xl p-8">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6">
          🎯 Test Evaluation Result
        </h1>

        {/* Score Section */}
        <div className="mb-6 text-center">
          <p className="text-lg text-gray-600">Your Score</p>
          <h2 className="text-5xl font-bold text-black">
            {parsedData.score}/10
          </h2>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
            <div
              className="bg-black h-3 rounded-full transition-all duration-500"
              style={{ width: `${parsedData.score * 10}%` }}
            ></div>
          </div>
        </div>

        {/* Feedback Cards */}
        <div className="space-y-4">

          <div className="bg-green-100 border border-green-300 p-4 rounded-lg">
            <h3 className="font-semibold text-green-700 mb-1">✅ Strengths</h3>
            <p className="text-sm text-green-900">{parsedData.strengths}</p>
          </div>

          <div className="bg-red-100 border border-red-300 p-4 rounded-lg">
            <h3 className="font-semibold text-red-700 mb-1">❌ Weaknesses</h3>
            <p className="text-sm text-red-900">{parsedData.weaknesses}</p>
          </div>

          <div className="bg-blue-100 border border-blue-300 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-700 mb-1">📚 What to Study</h3>
            <p className="text-sm text-blue-900">{parsedData.whatToStudy}</p>
          </div>

        </div>

        {/* Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => window.location.href = "/"}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Try Another Test
          </button>
        </div>

      </div>
    </div>
  );
};

export default Evaluate;