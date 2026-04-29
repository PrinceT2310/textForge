import React, { useState } from "react";
import axios from "../utilis/axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Result = () => {
  const location = useLocation();
  const topic = location.state;
    // console.log(topic)
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate()
  const { loading, error, data } = useSelector((state) => state.apiData);
  // console.log("data", data)

  const parsedData = (() => {
  if (!data.data?.reply) return null;
  if (typeof data.data?.reply !== "string") return data;
  try {
    const cleaned = data.data?.reply
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("JSON parse failed:", e);
    return null;
  }
})();

  const [answers, setAnswers] = useState({
    mcq: {},
    short: {},
    reasoning: {}
  });

  // ✅ Handlers
  const handleMcqChange = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      mcq: { ...prev.mcq, [index]: value }
    }));
  };

  const handleShortChange = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      short: { ...prev.short, [index]: value }
    }));
  };

  const handleReasoningChange = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      reasoning: { ...prev.reasoning, [index]: value }
    }));
  };

const handleSubmit = async () => {
  try {
    setSubmitting(true);

    const token = localStorage.getItem("token")
    console.log(token)

    // 🔥 STEP 1: AI evaluation
    const response = await axios.post(
      "/submit-test",
      {
        questions: parsedData,
        userAnswers: answers
      },
      {
        headers: {
          Authorization: `Bearer ${token}` // ← header add karo
        }
      }
    );

    console.log("Evaluation:", response.data.data);

    // 🔥 STEP 2: SAVE TEST (ADD THIS 👇)
    await axios.post("/save-test", {
      userId: data.data.id, // baad me token se
      topic: topic, // baad me dynamic
      questions: parsedData,
      userAnswers: answers,
      result: response.data.data
    },{
        headers: {
          Authorization: `Bearer ${token}` // ← header add karo
        }
      }
  );
  toast.success("Test Submitted ✅")
    // 🔥 STEP 3: Navigate
    navigate("/Result-evaluate", {
      state: response.data.data
    });

  } catch (error) {
    console.error(error);
  } finally {
    setSubmitting(false);
  }
};

  if (loading)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="bg-white/10 backdrop-blur-xl border border-gray-700 px-10 py-8 rounded-2xl text-center shadow-2xl">
        <div className="w-10 h-10 border-4 border-gray-500 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xl font-semibold text-white">
          Generating Your Test...
        </p>
        <p className="text-gray-400 mt-2 text-sm">
          AI is preparing your questions ⚡
        </p>
      </div>
    </div>
  );

if (error)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="bg-red-500/10 border border-red-500 px-8 py-6 rounded-xl text-center shadow-xl">
        <h2 className="text-xl font-semibold text-red-400 mb-2">
          Something went wrong ⚠️
        </h2>
        <p className="text-red-300 text-sm">{error}</p>
      </div>
    </div>
  );

if (!parsedData)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="bg-white/10 border border-gray-700 px-8 py-6 rounded-xl text-center shadow-xl">
        <h2 className="text-xl font-semibold text-white mb-2">
          No Test Found 😕
        </h2>
        <p className="text-gray-400 text-sm">
          Please generate a test first.
        </p>
      </div>
    </div>
  );

return (
  <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">

    <div className="max-w-5xl mx-auto bg-white text-black p-8 rounded-2xl shadow-2xl">

      <h1 className="text-3xl font-bold text-center mb-6">
        AI Generated Test
      </h1>

      {/* MCQs */}
      <h2 className="text-xl font-semibold mb-4">Multiple Choice Questions</h2>

      <div className="grid grid-cols-2 gap-6 ">
        {parsedData.mcqs?.map((q, i) => (
          <div key={i} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition focus:ring-2 focus:ring-black">
            <p className="font-semibold mb-2">
              {i + 1}. {q.question}
            </p>

            {q.options.map((opt, idx) => (
              <label key={idx} className="flex items-center mt-2 cursor-pointer">
                <input
                  type="radio"
                  name={`mcq-${i}`}
                  value={opt}
                  className="mr-2"
                  onChange={(e) => handleMcqChange(i, e.target.value)}
                />
                {opt}
              </label>
            ))}
          </div>
        ))}
      </div>

      {/* Short Questions */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Short Answer Questions</h2>

      {parsedData.shortQuestions?.map((q, i) => (
        <div key={i} className="mb-6">
          <p className="font-semibold mb-2">
            {i + 6}. {q}
          </p>

          <textarea
            className="w-full border border-gray-300 p-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
            rows={3}
            placeholder="Write your answer..."
            onChange={(e) => handleShortChange(i, e.target.value)}
          />
        </div>
      ))}

      {/* Reasoning */}
      <h2 className="text-xl font-semibold mt-8 mb-4">
        Reasoning Questions
      </h2>

      {parsedData.reasoningQuestions?.map((q, i) => (
        <div key={i} className="mb-6">
          <p className="font-semibold mb-2">
            {i + 9}. {q}
          </p>

          <textarea
            className="w-full border border-gray-300 p-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
            rows={4}
            placeholder="Explain your answer..."
            onChange={(e) => handleReasoningChange(i, e.target.value)}
          />
        </div>
      ))}

      {/* Submit Button */}
      <div className="flex justify-end mt-8">
        <button
  onClick={handleSubmit}
  disabled={submitting}
  className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
>
  {submitting ? "Evaluating..." : "Submit Test"}
</button>
      </div>

    </div>
  </div>
);
};

export default Result;