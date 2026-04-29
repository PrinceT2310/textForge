import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { generateTest } from "../redux/apiDataSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formRef = useRef(null);

  const handleDifficultyChange = (level) => {
    setDifficulty(level);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(generateTest({topic, content, difficulty}));
    navigate("/result",{
      state: topic
    })
    console.log(topic, content, difficulty);
  };

  return (
    <div className="min-h-screen text-white px-6 py-12">
      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-24">
        {/* LEFT */}
        <div>
          <p className="text-gray-400 mb-3">✨ AI Powered Question Generator</p>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Create Question Papers <br /> in Seconds ⚡
          </h1>

          <p className="text-gray-400 mb-8 text-lg">
            Just enter your topic and content — our AI will generate MCQs, short
            questions, and reasoning questions instantly.
          </p>

          <button
            onClick={scrollToForm}
            className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-xl text-lg transition shadow-lg hover:shadow-xl"
          >
            🚀 Start Generating
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center">
          <div className="bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-gray-700 shadow-xl">
            <img
              src="https://helios-i.mashable.com/imagery/articles/00zWj16EZwHuoJD6JxCQMqn/hero-image.fill.size_1248x702.v1708988219.png"
              alt="AI"
              className="w-full max-w-md rounded-xl opacity-90"
            />
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-24 text-center">
        <div className="bg-white/5 p-6 rounded-2xl border border-gray-700 hover:bg-white/10 transition">
          <h3 className="text-lg font-semibold mb-2">🤖 AI Generated</h3>
          <p className="text-gray-400 text-sm">
            Smart questions based on your content
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-gray-700 hover:bg-white/10 transition">
          <h3 className="text-lg font-semibold mb-2">⚡ Fast Output</h3>
          <p className="text-gray-400 text-sm">Generate papers instantly</p>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-gray-700 hover:bg-white/10 transition">
          <h3 className="text-lg font-semibold mb-2">📄 Multiple Formats</h3>
          <p className="text-gray-400 text-sm">
            MCQs, short & reasoning questions
          </p>
        </div>
      </div>

      {/* FORM SECTION */}
      <div
        ref={formRef}
        className="max-w-3xl mx-auto bg-white/5 backdrop-blur-xl border border-gray-700 p-8 rounded-2xl shadow-2xl"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Generate Your Question Paper
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Topic */}
          <input
            type="text"
            placeholder="Enter Topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />

          {/* Content */}
          <textarea
            placeholder="Enter topic details..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full p-3 mb-6 rounded-lg bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />

          {/* Difficulty */}
          <div className="mb-6">
            <p className="mb-3 text-gray-300">Select Difficulty:</p>

            <div className="grid grid-cols-3 gap-4">
              {/* Easy */}
              <div
                onClick={() => handleDifficultyChange("easy")}
                className={`p-4 rounded-xl border cursor-pointer text-center transition 
      ${
        difficulty === "easy"
          ? "bg-green-500/20 border-green-400 text-green-300 shadow-lg"
          : "bg-white/5 border-gray-600 hover:bg-white/10"
      }`}
              >
                😊 Easy
              </div>

              {/* Medium */}
              <div
                onClick={() => handleDifficultyChange("medium")}
                className={`p-4 rounded-xl border cursor-pointer text-center transition 
      ${
        difficulty === "medium"
          ? "bg-yellow-500/20 border-yellow-400 text-yellow-300 shadow-lg"
          : "bg-white/5 border-gray-600 hover:bg-white/10"
      }`}
              >
                ⚡ Medium
              </div>

              {/* Hard */}
              <div
                onClick={() => handleDifficultyChange("hard")}
                className={`p-4 rounded-xl border cursor-pointer text-center transition 
      ${
        difficulty === "hard"
          ? "bg-red-500/20 border-red-400 text-red-300 shadow-lg"
          : "bg-white/5 border-gray-600 hover:bg-white/10"
      }`}
              >
                🔥 Hard
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-700 transition p-3 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg"
          >
            ⚡ Generate Question Paper
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
