"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage("");

    const cleanEmployeeId = employeeId.trim().toLowerCase();

    if (!cleanEmployeeId || !password.trim()) {
      setMessage("Please enter your Login ID and password.");
      return;
    }

    setLoading(true);

    try {
      const email = cleanEmployeeId.includes("@")
        ? cleanEmployeeId
        : `${cleanEmployeeId}@shivconsultancy.com`;

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage("The Login ID or password is incorrect.");
        return;
      }

      if (!data.user) {
        setMessage("Unable to sign in. Please try again.");
        return;
      }

      if (cleanEmployeeId === "admin") {
        router.replace("/dashboard");
      } else if (
        cleanEmployeeId === "emp001" ||
        cleanEmployeeId === "emp002" ||
        cleanEmployeeId === "emp003"
      ) {
        router.replace("/employee");
      } else {
        await supabase.auth.signOut();
        setMessage("This Login ID is not authorized to access the CRM.");
        return;
      }

      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Something went wrong while signing in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 px-5 py-10">
      <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="absolute -bottom-28 -right-24 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-white/15 bg-white shadow-2xl lg:grid-cols-2">
          <section className="hidden bg-gradient-to-br from-blue-700 to-cyan-500 p-12 text-white lg:flex lg:flex-col">
            <div>
              <div className="flex items-center gap-4">
                <img
                  src="/logo.png"
                  alt="Shiv Consultancy"
                  className="h-20 w-20 rounded-2xl bg-white p-2 shadow-xl"
                />

                <div>
                  <h1 className="text-3xl font-extrabold">
                    Shiv Consultancy
                  </h1>

                  <p className="mt-1 text-blue-100">
                    Your Trust, Our Responsibility
                  </p>
                </div>
              </div>

              <div className="mt-16">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-100">
                  Insurance CRM
                </p>

                <h2 className="mt-5 text-5xl font-extrabold leading-tight">
                  Complete Insurance
                  <br />
                  CRM Solution
                </h2>

                <p className="mt-7 max-w-md text-lg leading-8 text-blue-100">
                  Manage leads, policies, renewals, follow-ups, calls and
                  employee performance from one secure dashboard.
                </p>

                <div className="mt-8 space-y-3 text-blue-50">
                  <p>✓ Lead and customer management</p>
                  <p>✓ Policy and renewal tracking</p>
                  <p>✓ Follow-up scheduling</p>
                  <p>✓ Employee performance monitoring</p>
                </div>
              </div>
            </div>
          </section>

          <section className="flex items-center p-7 sm:p-12">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-9 text-center lg:text-left">
                <img
                  src="/logo.png"
                  alt="Shiv Consultancy"
                  className="mx-auto mb-5 h-20 w-20 rounded-2xl bg-white p-2 shadow-lg lg:hidden"
                />

                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                  Welcome Back
                </p>

                <h2 className="mt-3 text-4xl font-extrabold text-slate-950">
                  Sign in to your CRM
                </h2>

                <p className="mt-3 text-slate-500">
                  Enter your administrator or employee credentials to access
                  the dashboard.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label
                    htmlFor="employeeId"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Login ID
                  </label>

                  <input
                    id="employeeId"
                    type="text"
                    value={employeeId}
                    onChange={(event) => setEmployeeId(event.target.value)}
                    placeholder="Enter admin or employee ID"
                    autoComplete="username"
                    disabled={loading}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4 text-slate-950 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      disabled={loading}
                      className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4 pr-20 text-slate-950 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      disabled={loading}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-blue-700 disabled:opacity-50"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {message && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-blue-700 px-6 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              <div className="mt-8 rounded-2xl bg-slate-100 p-4 text-center text-sm text-slate-600">
                Authorized access only. This CRM is exclusively for Shiv
                Consultancy administrators and employees.
              </div>

              <button
                type="button"
                onClick={() => router.push("/")}
                className="mt-5 w-full text-center text-sm font-bold text-blue-700 hover:underline"
              >
                ← Return to Public Website
              </button>

              <p className="mt-6 text-center text-xs text-slate-400">
                © 2026 Shiv Consultancy. All Rights Reserved.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}