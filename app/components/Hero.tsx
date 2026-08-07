export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white">

      {/* Background Blur */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-900/30 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6 py-24">

        <div className="flex items-center justify-center">

          <div className="mx-auto flex max-w-4xl flex-col items-center justify-center text-center">

            {/* Logo + Company Name */}
            <div className="flex items-center justify-center gap-4">

              {/* Logo */}
              <img
                src="/logo.png"
                alt="Shiv Consultancy"
                className="h-20 w-auto object-contain drop-shadow-xl md:h-24"
              />

              {/* Company Name + Tagline */}
              <div className="text-left">

                <h2 className="text-3xl font-bold md:text-4xl">
                  Shiv Consultancy
                </h2>

                <p className="mt-1 text-base text-blue-100 md:text-lg">
                  Your Trust, Our Responsibility
                </p>

              </div>

            </div>

            {/* Badge */}
            <span className="mt-6 inline-flex items-center rounded-full border border-white/20 bg-white/20 px-5 py-2 text-sm font-medium backdrop-blur-lg">
              ⭐ Ahmedabad • Fast Claim Support • Renewal Expert
            </span>

            {/* Main Heading */}
            <h1 className="mt-8 text-4xl font-extrabold leading-tight md:text-5xl lg:text-4xl">
              ONE STEP SOLUTION FOR
              <br />

              <span className="text-cyan-300">
                ALL YOUR INSURANCE NEEDS
              </span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-3xl text-xl leading-9 text-blue-100">
              Car Insurance • Bike Insurance • Health Insurance •
              Life Insurance • Commercial Vehicle Insurance •
              Travel Insurance • Personal Accident Insurance
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap justify-center gap-5">

              {/* Get Free Quote */}
              <a
                href="#contact"
                className="rounded-2xl bg-white px-8 py-4 font-bold text-blue-700 shadow-xl transition hover:scale-105"
              >
                Get Free Quote
              </a>

              {/* Call */}
              <a
                href="tel:8511632556"
                className="rounded-2xl bg-green-600 px-8 py-4 font-bold text-white shadow-xl transition hover:scale-105 hover:bg-green-700"
              >
                📞 Call Now
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/918511632556"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-emerald-500 px-8 py-4 font-bold text-white shadow-xl transition hover:scale-105 hover:bg-emerald-600"
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