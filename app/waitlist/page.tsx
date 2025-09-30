"use client";
import { useState } from "react";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter a valid email.");
      return;
    }
    if (!consent) {
      setError("Please agree to receive updates.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent })
      });
      if (!res.ok) throw new Error("Failed to join waitlist");
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 text-white px-6">
      <h1 className="text-4xl font-bold">Abaqus Scripting AI</h1>
      <p className="mt-3 text-white/70">
        Join the waitlist to get early access.
      </p>

      <form
        onSubmit={submit}
        className="mt-6 w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-6"
      >
        {success ? (
          <p className="text-emerald-400">Thanks! You’re on the waitlist.</p>
        ) : (
          <>
            <input
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-3 w-full rounded-lg border border-white/10 bg-neutral-900 p-3 text-sm outline-none focus:border-cyan-400"
            />
            <label className="flex items-center gap-2 mb-3 text-sm text-white/70">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              I consent to receive updates.
            </label>
            {error && (
              <p className="mb-3 text-sm text-red-400">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-cyan-500 py-3 text-sm font-semibold text-neutral-900 hover:bg-cyan-400 disabled:opacity-50"
            >
              {loading ? "Joining…" : "Join waitlist"}
            </button>
          </>
        )}
      </form>
    </main>
  );
}
