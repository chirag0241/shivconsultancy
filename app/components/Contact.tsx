"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    vehicle: "",
    insurance: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("✅ Lead Submitted Successfully!");

        setForm({
          name: "",
          mobile: "",
          vehicle: "",
          insurance: "",
        });
      } else {
        setMessage("❌ Failed to submit lead");
      }
    } catch {
      setMessage("❌ Something went wrong");
    }

    setLoading(false);
  };

  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-950 py-20 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <h2 className="mb-3 text-center text-4xl font-bold">
          Get Free Insurance Quote
        </h2>

        <p className="mb-10 text-center text-blue-100">
          One Step Solution For All Your Insurance Needs
        </p>

        {/* Quote Form */}
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-black shadow-xl">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Name */}
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full rounded-lg border p-4"
              required
            />

            {/* Mobile */}
            <input
              type="tel"
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={(e) =>
                setForm({
                  ...form,
                  mobile: e.target.value,
                })
              }
              className="w-full rounded-lg border p-4"
              required
            />

            {/* Vehicle */}
            <input
              type="text"
              placeholder="Vehicle Number (Optional)"
              value={form.vehicle}
              onChange={(e) =>
                setForm({
                  ...form,
                  vehicle: e.target.value,
                })
              }
              className="w-full rounded-lg border p-4"
            />

            {/* Insurance */}
            <select
              value={form.insurance}
              onChange={(e) =>
                setForm({
                  ...form,
                  insurance: e.target.value,
                })
              }
              className="w-full rounded-lg border p-4"
              required
            >
              <option value="">
                Select Insurance
              </option>

              <option>Car Insurance</option>
              <option>Bike Insurance</option>
              <option>Health Insurance</option>
              <option>Life Insurance</option>
              <option>Commercial Vehicle</option>
              <option>Travel Insurance</option>
              <option>Personal Accident Insurance</option>
              <option>Shop & Office Insurance</option>
            </select>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-700 py-4 font-bold text-white transition hover:bg-blue-800 disabled:opacity-60"
            >
              {loading
                ? "Submitting..."
                : "Get Free Quote"}
            </button>

            {/* Message */}
            {message && (
              <p className="text-center font-semibold">
                {message}
              </p>
            )}

          </form>

          {/* Call + WhatsApp */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">

            <a
              href="tel:8511632556"
              className="rounded-lg bg-green-600 py-3 text-center font-bold text-white transition hover:bg-green-700"
            >
              📞 Call Now
            </a>

            <a
              href="https://wa.me/918511632556"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-green-500 py-3 text-center font-bold text-white transition hover:bg-green-600"
            >
              💬 WhatsApp
            </a>

          </div>

        </div>

        {/* Office Contact Details */}
        <div className="mx-auto mt-10 max-w-3xl text-center">

          <h3 className="text-2xl font-bold">
            Shiv Consultancy
          </h3>

          <p className="mt-1 text-blue-100">
            Your Trust, Our Responsibility
          </p>

          <div className="mt-6 space-y-3 text-blue-50">

            {/* Address */}
            <p>
              📍 431, Devnandan Mall, Opp. Sanyas Ashram,
              Ellisbridge, Ahmedabad
            </p>

            {/* Mobile */}
            <p>
              📞{" "}
              <a
                href="tel:8511632556"
                className="font-semibold hover:text-cyan-300"
              >
                8511632556
              </a>
            </p>

            {/* Email */}
            <p>
              ✉️{" "}
              <a
                href="mailto:info.shivconsultancyahm@gmail.com"
                className="font-semibold hover:text-cyan-300"
              >
                info.shivconsultancyahm@gmail.com
              </a>
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}