"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white text-gray-900 px-6 py-4 flex items-center justify-between">
      <div className="text-xl font-bold">OrbitAI</div>
      <div className="flex gap-6 text-sm font-medium">
        <a href="/Home" className="hover:text-blue-600 transition">Home</a>
        <a href="/projects" className="hover:text-blue-600 transition">Projects</a>
        <a href="/Tasks" className="hover:text-blue-600 transition">Tasks</a>
        <a href="/profile" className="hover:text-blue-600 transition">Profile</a>
      </div>
    </nav>
  );
}
