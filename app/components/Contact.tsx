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
      className="py-20 bg-blue-700 text-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-10">
          Get Free Insurance Quote
        </h2>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 text-black shadow-xl">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

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
              className="w-full border rounded-lg p-4"
              required
            />

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
              className="w-full border rounded-lg p-4"
              required
            />

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
              className="w-full border rounded-lg p-4"
            />

            <select
              value={form.insurance}
              onChange={(e) =>
                setForm({
                  ...form,
                  insurance: e.target.value,
                })
              }
              className="w-full border rounded-lg p-4"
              required
            >
              <option value="">Select Insurance</option>
              <option>Car Insurance</option>
              <option>Bike Insurance</option>
              <option>Health Insurance</option>
              <option>Life Insurance</option>
              <option>Commercial Vehicle</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white py-4 rounded-lg font-bold hover:bg-blue-800"
            >
              {loading ? "Submitting..." : "Get Free Quote"}
            </button>

            {message && (
              <p className="text-center font-semibold">
                {message}
              </p>
            )}

          </form>

          <div className="grid grid-cols-2 gap-4 mt-8">

            <a
              href="tel:9054706736"
              className="bg-green-600 text-white text-center py-3 rounded-lg font-bold"
            >
              📞 Call Now
            </a>

            <a
              href="https://wa.me/919054706736"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white text-center py-3 rounded-lg font-bold"
            >
              💬 WhatsApp
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}