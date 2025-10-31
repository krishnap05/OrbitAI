"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleaned = username.trim().toLowerCase();
    if (!cleaned || cleaned.length < 3) {
      setError("Username must be at least 3 chars");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 chars");
      return;
    }

    setLoading(true);
    try {
      // check username uniqueness in Firestore
      const q = query(
        collection(db, "users"),
        where("username", "==", cleaned)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        setError("Username already taken");
        setLoading(false);
        return;
      }

      // create a "local" email for Firebase Auth
      const email = `${cleaned}@orbitai.local`;

      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // optional: set displayName on Firebase user
      await updateProfile(userCred.user, { displayName: cleaned });

      // store mapping in Firestore under collection 'users' with doc id = uid
      await setDoc(doc(db, "users", userCred.user.uid), {
        username: cleaned,
        uid: userCred.user.uid,
        createdAt: serverTimestamp(),
      });

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md mx-auto mt-12 p-4">
      <h1 className="text-2xl font-semibold mb-4">Sign up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border rounded-lg p-2"
        />
        <input
          required
          type="password"
          placeholder="Password (min 6 chars)"
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
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>
    </section>
  );
}