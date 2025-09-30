import React, { useState } from "react";

/**
 * Abaqus Scripting AI — Waitlist Page
 * ------------------------------------------------------------
 * Drop-in React component for your frontend. Styled with Tailwind.
 *
 * HOW TO USE
 * 1) Ensure Tailwind is configured in your app (or swap classes for your CSS).
 * 2) Create an API endpoint at POST /api/waitlist that accepts {email, name, useCase}.
 *    - Respond with { ok: true } on success.
 *    - Example (FastAPI):
 *      @app.post("/api/waitlist")
 *      def waitlist(item: dict): return {"ok": True}
 * 3) Import and render <WaitlistPage /> anywhere (e.g., /waitlist route).
 * 4) If you don’t have a backend yet, set USE_FORMSPREE=true and add your
 *    Formspree endpoint URL to FORMSPREE_ENDPOINT below.
 *
 * LEGAL/CONSENT
 * - Includes an explicit consent checkbox for email comms.
 * - Simple, GDPR-friendly copy; adjust for your policies.
 */

const USE_FORMSPREE = false; // set to true to post to Formspree instead of /api/waitlist
const FORMSPREE_ENDPOINT = "https://formspree.io/f/your-id"; // put your Formspree endpoint here if using

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [useCase, setUseCase] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!consent) {
      setError("Please consent to receive updates.");
      return;
    }

    setLoading(true);
    try {
      if (USE_FORMSPREE) {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, name, useCase, consent }),
        });
        if (!res.ok) throw new Error("Network error");
        setSuccess(true);
      } else {
        const res = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, name, useCase, consent }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data?.ok !== true) throw new Error(data?.error || "Submission failed");
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Gradient background accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-20 h-80 w-80 rounded-full blur-3xl opacity-30 bg-cyan-500"></div>
        <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full blur-3xl opacity-20 bg-fuchsia-500"></div>
      </div>

      {/* Nav */}
      <header className="relative z-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
              {/* Simple logo */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 17L12 3l8 14-8 4-8-4Z" className="fill-cyan-400" />
              </svg>
            </div>
            <p className="text-sm font-semibold tracking-wide text-white/90">Abaqus Scripting AI</p>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#how" className="hover:text-white">How it works</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10">
        <div className="mx-auto max-w-4xl px-6 pt-16 pb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
            Private Beta
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            Ship Abaqus models from prompts.
          </h1>
          <p className="mt-4 text-white/70">
            Natural‑language to Abaqus Python scripts. Mesh, BCs, materials, steps — generated in seconds. Join the waitlist to secure early access.
          </p>

          {/* Form card */}
          <div className="mx-auto mt-8 w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur">
            {success ? (
              <SuccessCard email={email} />
            ) : (
              <form onSubmit={submit} className="grid grid-cols-1 gap-4" aria-label="Waitlist form">
                <label className="text-left">
                  <span className="mb-1 block text-xs font-medium text-white/70">Work email</span>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-neutral-900/70 px-4 py-3 text-sm outline-none ring-0 placeholder:text-white/40 focus:border-cyan-400"
                  />
                </label>

                <label className="text-left">
                  <span className="mb-1 block text-xs font-medium text-white/70">Name (optional)</span>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-neutral-900/70 px-4 py-3 text-sm outline-none focus:border-cyan-400"
                  />
                </label>

                <label className="text-left">
                  <span className="mb-1 block text-xs font-medium text-white/70">Primary use case</span>
                  <select
                    value={useCase}
                    onChange={(e) => setUseCase(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-neutral-900/70 px-4 py-3 text-sm outline-none focus:border-cyan-400"
                  >
                    <option value="" disabled>Select one…</option>
                    <option>FE pre-processing automation</option>
                    <option>Post-processing & reporting</option>
                    <option>Parametric studies & DOE</option>
                    <option>Material/section libraries</option>
                    <option>Teaching & training</option>
                  </select>
                </label>

                <label className="flex items-start gap-3 text-left">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-white/20 bg-neutral-900/70"
                    aria-label="Consent to receive email communications"
                  />
                  <span className="text-xs text-white/70">
                    I consent to receive early‑access updates and product communications. You can unsubscribe at any time.
                  </span>
                </label>

                {error && (
                  <div className="rounded-xl border border-red-400/30 bg-red-400/10 px-3 py-2 text-left text-sm text-red-200">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-cyan-400 disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center gap-2"><Spinner /> Joining…</span>
                  ) : (
                    <span className="flex items-center gap-2">Join the waitlist <ArrowRight /></span>
                  )}
                </button>

                <p className="text-xs text-white/50">By signing up, you agree to our <a className="underline hover:text-white" href="#">Terms</a> and <a className="underline hover:text-white" href="#">Privacy Policy</a>.</p>
              </form>
            )}
          </div>

          {/* Social proof */}
          <p className="mt-6 text-xs uppercase tracking-widest text-white/40">Trusted by engineers from</p>
          <div className="mx-auto mt-3 flex max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-3 opacity-70">
            <Logo text="Aerospace R&D" />
            <Logo text="Automotive CAE" />
            <Logo text="Energy" />
            <Logo text="Academia" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 border-t border-white/10 bg-neutral-950/60">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold">Why Abaqus Scripting AI</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Feature title="Prompt → Script">
              Generate clean Abaqus Python with sets, surfaces, materials, and steps—consistently.
            </Feature>
            <Feature title="Guardrails built-in">
              RESULT: summaries, safety filters for destructive calls, and reproducible outputs.
            </Feature>
            <Feature title="Integrates anywhere">
              CLI and REST API for CI pipelines, notebooks, or teaching labs.
            </Feature>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <ol className="mt-6 space-y-4 text-white/70">
            <li>1. You describe your model (geometry, mesh size, loads, BCs, materials).</li>
            <li>2. Our agent compiles a safe, runnable Abaqus Python script.</li>
            <li>3. (Optional) Execute headless via <code className="rounded bg-white/10 px-1">abaqus cae noGUI=script.py</code>.</li>
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold">FAQ</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Faq q="Is Abaqus required?">
              Yes. The generator outputs Abaqus Python compatible with your installed version.
            </Faq>
            <Faq q="Do you support Simulink/other FE tools?">
              Roadmap includes cross‑tool adapters; join the waitlist to influence priorities.
            </Faq>
            <Faq q="Can I self‑host?">
              Yes—CLI and API are designed for on‑prem. Contact us for enterprise access.
            </Faq>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-center text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Abaqus Scripting AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Feature({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-white/70">{children}</p>
    </div>
  );
}

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-sm font-semibold">{q}</p>
      <p className="mt-2 text-sm text-white/70">{children}</p>
    </div>
  );
}

function Logo({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
      <div className="h-2 w-2 rounded-full bg-white/50" />
      <span>{text}</span>
    </div>
  );
}

function Spinner() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 animate-spin" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4">
      <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
