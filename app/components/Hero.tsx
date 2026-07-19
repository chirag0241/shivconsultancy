  export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Shiv Consultancy
        </h1>

        <p className="text-2xl mt-4">
          All Insurance Solutions Under One Roof
        </p>

        <p className="mt-6 text-lg max-w-3xl mx-auto text-blue-100">
          Car Insurance • Bike Insurance • Health Insurance • Life Insurance •
          Commercial Vehicle Insurance • Claim Assistance • Renewal Support
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5 mt-10">

          <a
            href="#contact"
            className="bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-gray-100"
          >
            Get Free Quote
          </a>

          <a
            href="tel:9054706736"
            className="bg-green-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-green-700"
          >
            Call Now
          </a>

          <a
            href="https://wa.me/919054706736"
            target="_blank"
            className="bg-green-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-green-600"
          >
            WhatsApp
          </a>

        </div>

      </div>
    </section>
  );
}