"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState(""); // username or email
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim() || password.length < 6) {
      setError("Enter username/email and a password (min 6 chars).");
      return;
    }

    // if user provided a username (no @), convert to our local email scheme
    const email = identifier.includes("@")
      ? identifier.trim()
      : `${identifier.trim().toLowerCase()}@orbitai.local`;

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md mx-auto mt-12 p-4">
      <h1 className="text-2xl font-semibold mb-4">Log in</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          placeholder="Username or email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full border rounded-lg p-2"
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg p-2"
        />
        {error && <div className="text-red-600">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </section>
  );
}