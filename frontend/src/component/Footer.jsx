import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-32 border-t border-gray-800 pt-12 pb-6 px-6">

  <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

    {/* BRAND */}
    <div>
      <h2 className="text-2xl font-bold mb-4">🧠 TestForge</h2>
      <p className="text-gray-400 text-sm">
        AI-powered platform to generate smart question papers instantly.
        Save time and boost productivity.
      </p>
    </div>

    {/* LINKS */}
    <div>
      <h3 className="font-semibold mb-3">Product</h3>
      <ul className="space-y-2 text-gray-400 text-sm">
        <li className="hover:text-white cursor-pointer">Home</li>
        <li className="hover:text-white cursor-pointer">Generate</li>
        <li className="hover:text-white cursor-pointer">Features</li>
      </ul>
    </div>

    <div>
      <h3 className="font-semibold mb-3">Resources</h3>
      <ul className="space-y-2 text-gray-400 text-sm">
        <li className="hover:text-white cursor-pointer">Docs</li>
        <li className="hover:text-white cursor-pointer">Support</li>
        <li className="hover:text-white cursor-pointer">Privacy</li>
      </ul>
    </div>

    {/* SOCIAL */}
    <div>
      <h3 className="font-semibold mb-3">Connect</h3>
      <div className="flex gap-4 text-gray-400 text-lg">
        <span className="hover:text-white cursor-pointer">🌐</span>
        <span className="hover:text-white cursor-pointer">🐦</span>
        <span className="hover:text-white cursor-pointer">💼</span>
      </div>
    </div>

  </div>

  {/* BOTTOM */}
  <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-800 pt-4">
    © 2026 TestForge. All rights reserved.
  </div>

</footer>
  )
}

export default Footer