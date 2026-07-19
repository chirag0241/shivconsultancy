export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 text-white">

      {/* Background Blur */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-900/30 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-24">

        <div className="flex justify-center items-center">

          <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center">

            {/* Logo */}
            <img
              src="/logo.png"
              alt="Shiv Consultancy"
              className="w-24 h-24 rounded-2xl bg-white p-2 shadow-2xl"
            />

            {/* Company Name */}
            <h2 className="mt-5 text-4xl font-bold">
              Shiv Consultancy
            </h2>

            <p className="mt-2 text-blue-100 text-lg">
              Your Trust, Our Responsibility
            </p>

            {/* Badge */}
            <span className="mt-6 inline-flex items-center rounded-full border border-white/20 bg-white/20 px-5 py-2 text-sm font-medium backdrop-blur-lg">
              ⭐ Ahmedabad • Fast Claim Support • Renewal Expert
            </span>

            {/* Heading */}
            <h1 className="mt-8 text-5xl lg:text-7xl font-extrabold leading-tight">
              Protect What
              <br />
              <span className="text-cyan-300">
                Matters Most
              </span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-2xl text-xl leading-9 text-blue-100">
              Car Insurance • Bike Insurance • Health Insurance •
              Life Insurance • Commercial Vehicle Insurance •
              Claim Assistance • Instant Renewal Support
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap justify-center gap-5">

              <a
                href="#contact"
                className="rounded-2xl bg-white px-8 py-4 font-bold text-blue-700 shadow-xl transition hover:scale-105"
              >
                Get Free Quote
              </a>

              <a
                href="tel:8511632556"
                className="rounded-2xl bg-green-600 px-8 py-4 font-bold shadow-xl transition hover:scale-105 hover:bg-green-700"
              >
                📞 Call Now
              </a>

              <a
                href="https://wa.me/918511632556"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-emerald-500 px-8 py-4 font-bold shadow-xl transition hover:scale-105 hover:bg-emerald-600"
              >
                💬 WhatsApp
              </a>

            </div>

          </div>


        </div>

      </div>

    </section>
  );
}