import React from "react";
import { useLocation } from "react-router-dom";

const Details = () => {
  const location = useLocation();
  const data = location.state;

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        No Data Found
      </div>
    );
  }

  const { questions, userAnswers, result, topic } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-6 text-white">
      <div className="max-w-3xl mx-auto space-y-8">

        <h1 className="text-3xl font-bold text-center">📝 {topic} — Test Review</h1>

        {/* ───── MCQs ───── */}
        <div className="bg-white text-black p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-bold mb-4">Multiple Choice Questions</h2>
          {questions.mcqs?.map((q, i) => {
            const userAns = userAnswers.mcq?.[i];
            const isCorrect = userAns === q.correctAnswer;
            return (
              <div key={i} className="mb-5 border-b pb-4">
                <p className="font-semibold mb-2">{i + 1}. {q.question}</p>
                {q.options.map((opt, idx) => {
                  let style = "px-3 py-1 rounded-lg text-sm mt-1 block ";
                  if (opt === q.correctAnswer) style += "bg-green-100 text-green-800 font-semibold";
                  else if (opt === userAns && !isCorrect) style += "bg-red-100 text-red-800";
                  else style += "text-gray-700";
                  return <span key={idx} className={style}>{opt}</span>;
                })}
                <p className="text-xs mt-2 text-gray-500">
                  Your Answer: <span className={isCorrect ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                    {userAns || "Not Answered"}
                  </span>
                </p>
              </div>
            );
          })}
        </div>

        {/* ───── Short Questions ───── */}
        <div className="bg-white text-black p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-bold mb-4">Short Answer Questions</h2>
          {questions.shortQuestions?.map((q, i) => (
            <div key={i} className="mb-5 border-b pb-4">
              <p className="font-semibold mb-2">{i + 6}. {q}</p>
              <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-800">
                {userAnswers.short?.[i] || <span className="text-gray-400 italic">Not Answered</span>}
              </div>
            </div>
          ))}
        </div>

        {/* ───── Reasoning Questions ───── */}
        <div className="bg-white text-black p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-bold mb-4">Reasoning Questions</h2>
          {questions.reasoningQuestions?.map((q, i) => (
            <div key={i} className="mb-5 border-b pb-4">
              <p className="font-semibold mb-2">{i + 9}. {q}</p>
              <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-800">
                {userAnswers.reasoning?.[i] || <span className="text-gray-400 italic">Not Answered</span>}
              </div>
            </div>
          ))}
        </div>

        {/* ───── Result ───── */}
        <div className="bg-white text-black p-8 rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-4">📊 Your Result</h2>

          <div className="text-center mb-6">
            <p className="text-gray-500 text-sm">Score</p>
            <h3 className="text-5xl font-bold">{result?.score ?? 0}/10</h3>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
              <div
                className="bg-black h-3 rounded-full transition-all duration-700"
                style={{ width: `${(result?.score ?? 0) * 10}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-green-100 border border-green-300 p-4 rounded-lg">
              <h3 className="font-semibold text-green-700 mb-1">✅ Strengths</h3>
              <p className="text-sm text-green-900">{result?.strengths || "None"}</p>
            </div>
            <div className="bg-red-100 border border-red-300 p-4 rounded-lg">
              <h3 className="font-semibold text-red-700 mb-1">❌ Weaknesses</h3>
              <p className="text-sm text-red-900">{result?.weaknesses || "None"}</p>
            </div>
            <div className="bg-blue-100 border border-blue-300 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-700 mb-1">📚 What to Study</h3>
              <p className="text-sm text-blue-900">{result?.whatToStudy || "None"}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => window.location.href = "/dashboard"}
            className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition font-semibold"
          >
            Back to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};

export default Details;