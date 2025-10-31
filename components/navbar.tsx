"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <nav className="w-full border-b border-gray-200 bg-white text-gray-900 px-6 py-4 flex items-center justify-between">
      <div className="text-xl font-bold">OrbitAI</div>
      <div className="flex gap-6 text-sm font-medium">
        <Link href="/Home" className="hover:text-blue-600 transition">Home</Link>
        <Link href="/projects" className="hover:text-blue-600 transition">Projects</Link>
        <Link href="/Tasks" className="hover:text-blue-600 transition">Tasks</Link>
        <Link href="/profile" className="hover:text-blue-600 transition">Profile</Link>

        {user ? (
          <>
            <span className="text-sm text-gray-700">{user.displayName || user.email?.split("@")[0]}</span>
            <button onClick={handleSignOut} className="text-sm text-red-600 hover:underline">
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-blue-600 transition">Log in</Link>
            <Link href="/signup" className="hover:text-blue-600 transition">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
