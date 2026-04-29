import React from 'react'

const About = () => {
  return (
    <div className="max-w-7xl mx-auto mt-32 grid md:grid-cols-2 gap-16 items-center">

  {/* LEFT IMAGE */}
  <div className="flex justify-center">
    <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-gray-700 shadow-2xl">
      <img
        src="https://images.unsplash.com/photo-1718241905462-56e7b9f722f3?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="AI"
        className="w-full max-w-md opacity-90"
      />
    </div>
  </div>

  {/* RIGHT CONTENT */}
  <div>
    <h2 className="text-4xl md:text-5xl font-bold mb-6">
      Smarter Way to Create Question Papers 🚀
    </h2>

    <p className="text-gray-400 mb-6 leading-relaxed text-lg">
      TestForge is built to make your work faster, smarter, and more efficient.
      Instead of spending hours creating question papers manually, you can now
      generate structured and high-quality questions in just a few seconds.
    </p>

    <p className="text-gray-400 mb-8 leading-relaxed">
      Whether you're a student preparing for exams or a teacher designing tests,
      TestForge helps you save time, reduce effort, and focus on what really matters —
      learning and teaching.
    </p>

    {/* FEATURES */}
    <div className="grid sm:grid-cols-2 gap-4">

      <div className="flex items-start gap-3">
        <span>⚡</span>
        <p className="text-gray-300">Lightning fast generation</p>
      </div>

      <div className="flex items-start gap-3">
        <span>🧠</span>
        <p className="text-gray-300">AI understands your content</p>
      </div>

      <div className="flex items-start gap-3">
        <span>📄</span>
        <p className="text-gray-300">Multiple question formats</p>
      </div>

      <div className="flex items-start gap-3">
        <span>🎯</span>
        <p className="text-gray-300">Accurate & topic-focused</p>
      </div>

      <div className="flex items-start gap-3">
        <span>⏳</span>
        <p className="text-gray-300">Saves hours of manual work</p>
      </div>

      <div className="flex items-start gap-3">
        <span>🚀</span>
        <p className="text-gray-300">Boosts productivity</p>
      </div>

    </div>

  </div>
</div>
  )
}

export default About