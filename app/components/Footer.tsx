export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-4 gap-10">

          <div>

            <h2 className="text-3xl font-extrabold text-blue-400">
              Shiv Consultancy
            </h2>

            <p className="mt-5 text-gray-400 leading-8">
              Trusted Insurance Consultant providing Car, Bike,
              Health, Life and Commercial Vehicle Insurance with
              instant renewal and claim assistance.
            </p>

          </div>

          <div>

            <h3 className="text-xl font-bold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>
                <a href="/" className="hover:text-white">
                  Home
                </a>
              </li>

              <li>
                <a href="#about" className="hover:text-white">
                  About Us
                </a>
              </li>

              <li>
                <a href="#services" className="hover:text-white">
                  Services
                </a>
              </li>

              <li>
                <a href="#contact" className="hover:text-white">
                  Contact
                </a>
              </li>

            </ul>

          </div>

          <div>

            <h3 className="text-xl font-bold mb-5">
              Our Services
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>🚗 Car Insurance</li>
              <li>🏍 Bike Insurance</li>
              <li>❤️ Health Insurance</li>
              <li>🛡 Life Insurance</li>
              <li>🚚 Commercial Vehicle</li>
              <li>📄 Claim Assistance</li>

            </ul>

          </div>

          <div>

            <h3 className="text-xl font-bold mb-5">
              Contact Us
            </h3>

            <div className="space-y-4 text-gray-400">

              <p>📞 +91 8511632556</p>

              <p>📧 info@shivconsultancy.in</p>

              <p>📍 Ahmedabad, Gujarat</p>

            </div>

            <div className="flex gap-4 mt-6">

              <a
                href="tel:8511632556"
                className="bg-blue-600 px-5 py-3 rounded-xl hover:bg-blue-700"
              >
                Call
              </a>

              <a
                href="https://wa.me/918511632556"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 px-5 py-3 rounded-xl hover:bg-green-700"
              >
                WhatsApp
              </a>

            </div>

          </div>

        </div>

      </div>

      <div className="border-t border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-500 text-sm">
            © 2026 Shiv Consultancy. All Rights Reserved.
          </p>

          <p className="text-gray-500 text-sm mt-3 md:mt-0">
            Made with ❤️ in India
          </p>

        </div>

      </div>

    </footer>
  );
}