export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">

      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-10 lg:grid-cols-4">

          {/* Brand */}
          <div>

            <div className="flex items-center gap-3">

              <img
                src="/logo.png"
                alt="Shiv Consultancy Logo"
                className="h-14 w-auto rounded-lg bg-white p-1 object-contain"
              />

              <div>
                <h2 className="text-2xl font-extrabold text-blue-400">
                  Shiv Consultancy
                </h2>

                <p className="text-sm text-gray-400">
                  Your Trust, Our Responsibility
                </p>
              </div>

            </div>

            <p className="mt-5 leading-8 text-gray-400">
              One Step Solution For All Your Insurance Needs.
              We provide Car, Bike, Health, Life, Commercial Vehicle
              Insurance, Renewal Support and Claim Assistance.
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="mb-5 text-xl font-bold">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>
                <a
                  href="#home"
                  className="transition hover:text-white"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#about"
                  className="transition hover:text-white"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="#services"
                  className="transition hover:text-white"
                >
                  Services
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  className="transition hover:text-white"
                >
                  Contact
                </a>
              </li>

            </ul>

          </div>

          {/* Services */}
          <div>

            <h3 className="mb-5 text-xl font-bold">
              Our Services
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>🚗 Car Insurance</li>
              <li>🏍 Bike Insurance</li>
              <li>❤️ Health Insurance</li>
              <li>🛡 Life Insurance</li>
              <li>🚚 Commercial Vehicle</li>
              <li>✈️ Travel Insurance</li>
              <li>👤 Personal Accident Insurance</li>
              <li>🏢 Shop & Office Insurance</li>
              <li>📄 Claim Assistance</li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h3 className="mb-5 text-xl font-bold">
              Contact Us
            </h3>

            <div className="space-y-4 text-gray-400">

              <p>
                📞{" "}
                <a
                  href="tel:8320352558"
                  className="transition hover:text-white"
                >
                  +91 8320352558
                </a>
              </p>

              <p className="break-all">
                📧{" "}
                <a
                  href="mailto:info.shivconsultancyahm@gmail.com"
                  className="transition hover:text-white"
                >
                  info.shivconsultancyahm@gmail.com
                </a>
              </p>

              <p className="leading-7">
                📍 431, Devnandan Mall,
                Opp. Sanyas Ashram,
                Ellisbridge, Ahmedabad - 380006,
                Gujarat
              </p>

            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap gap-4">

              <a
                href="tel:8320352558"
                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-700"
              >
                📞 Call
              </a>

              <a
                href="https://wa.me/918320352558"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-green-600 px-5 py-3 font-semibold transition hover:bg-green-700"
              >
                💬 WhatsApp
              </a>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 py-6 md:flex-row">

          <p className="text-sm text-gray-500">
            © 2026 Shiv Consultancy. All Rights Reserved.
          </p>

          <p className="mt-3 text-sm text-gray-500 md:mt-0">
            Your Trust, Our Responsibility
          </p>

        </div>

      </div>

    </footer>
  );
}