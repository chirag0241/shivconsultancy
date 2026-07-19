export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 text-white">

      {/* Background Blur */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-900/30 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}

          <div>

            {/* Logo */}

            <div className="flex items-center gap-4 mb-8">

              <img
                src="/logo.png"
                alt="Shiv Consultancy"
                className="w-20 h-20 rounded-2xl bg-white p-2 shadow-2xl"
              />

              <div>

                <h2 className="text-3xl font-bold">
                  Shiv Consultancy
                </h2>

                <p className="text-blue-100">
                  Trusted Insurance Consultant
                </p>

              </div>

            </div>

            <span className="inline-block bg-white/20 backdrop-blur-lg border border-white/20 px-5 py-2 rounded-full text-sm font-medium">
              ⭐ Ahmedabad • Fast Claim Support • Renewal Expert
            </span>

            <h1 className="text-5xl lg:text-7xl font-extrabold mt-8 leading-tight">

              Protect Your
              <br />

              Family &
              <span className="text-cyan-300"> Future</span>

            </h1>

            <p className="mt-8 text-xl text-blue-100 leading-9 max-w-xl">

              Car Insurance • Bike Insurance • Health Insurance •
              Life Insurance • Commercial Vehicle Insurance •
              Claim Assistance • Instant Renewal Support

            </p>

            {/* Buttons */}

            <div className="flex flex-wrap gap-5 mt-10">

              <a
                href="#contact"
                className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition duration-300 shadow-xl"
              >
                Get Free Quote
              </a>

              <a
                href="tel:8511632556"
                className="bg-green-600 px-8 py-4 rounded-2xl font-bold hover:bg-green-700 hover:scale-105 transition duration-300 shadow-xl"
              >
                📞 Call Now
              </a>

              <a
                href="https://wa.me/918511632556"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 px-8 py-4 rounded-2xl font-bold hover:bg-emerald-600 hover:scale-105 transition duration-300 shadow-xl"
              >
                💬 WhatsApp
              </a>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-3 gap-6 mt-16">

              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center">

                <h2 className="text-4xl font-bold">
                  5000+
                </h2>

                <p className="text-blue-100 mt-2">
                  Happy Customers
                </p>

              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center">

                <h2 className="text-4xl font-bold">
                  10+
                </h2>

                <p className="text-blue-100 mt-2">
                  Insurance Partners
                </p>

              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center">

                <h2 className="text-4xl font-bold">
                  24×7
                </h2>

                <p className="text-blue-100 mt-2">
                  Claim Support
                </p>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="flex justify-center">

            <img
              src="/insurance.png"
              alt="Insurance"
              className="w-full max-w-xl animate-bounce drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
            />

          </div>

        </div>

      </div>

    </section>
  );
}