import React, { useEffect, useState } from "react";
import axios from "../utilis/axios"
import { useNavigate } from "react-router-dom";

const Dashboard = ({name}) => {
  console.log(name)
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTests(res.data.data);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">

      <button
  onClick={() => navigate("/")}
  className="absolute top-6 right-6 text-white text-2xl hover:text-gray-300 hover:scale-110 transition"
>
  ✖
</button>

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">📊 {name} Dashboard</h1>
        <p className="text-gray-400 mt-1">
          Track your performance and progress
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl">
          <p className="text-gray-400 text-sm">Total Tests</p>
          <h2 className="text-3xl font-bold">{tests.length}</h2>
        </div>

        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl">
          <p className="text-gray-400 text-sm">Average Score</p>
          <h2 className="text-3xl font-bold">
            {tests.length
              ? (
                  tests.reduce((acc, t) => acc + (t.result?.score || 0), 0) /
                  tests.length
                ).toFixed(1)
              : 0}
          </h2>
        </div>

        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl">
          <p className="text-gray-400 text-sm">Best Score</p>
          <h2 className="text-3xl font-bold">
            {Math.max(...tests.map((t) => t.result?.score || 0), 0)}
          </h2>
        </div>

      </div>

      {/* TEST LIST */}
      <div className="grid gap-6">

        {tests.map((test) => {
          const score = test.result?.score || 0;

          return (
            <div
              key={test._id}
              className="bg-white text-black p-6 rounded-2xl shadow-lg hover:shadow-2xl transition flex justify-between items-center"
            >

              {/* LEFT */}
              <div>
                <h2 className="text-xl font-semibold">
                  📚 {test.topic.toUpperCase()}
                </h2>

                <p className="text-sm text-gray-500">
                  📅 {new Date(test.createdAt).toLocaleString()}
                </p>

                {/* SCORE BADGE */}
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                    score >= 7
                      ? "bg-green-100 text-green-700"
                      : score >= 4
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  Score: {score}/10
                </span>
              </div>

              {/* RIGHT */}
              <button
                onClick={() => navigate(`/details/${test._id}`,{ state: test })}
                className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                View Details →
              </button>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default Dashboard;