const services = [
  {
    title: "Car Insurance",
    icon: "🚗",
    desc: "Instant policy renewal with comprehensive and third-party coverage.",
  },
  {
    title: "Bike Insurance",
    icon: "🏍️",
    desc: "Affordable bike insurance with quick renewal and claim support.",
  },
  {
    title: "Health Insurance",
    icon: "❤️",
    desc: "Protect yourself and your family with the best health plans.",
  },
  {
    title: "Life Insurance",
    icon: "🛡️",
    desc: "Secure your family's future with reliable life insurance plans.",
  },
  {
    title: "Commercial Vehicle",
    icon: "🚚",
    desc: "Insurance solutions for trucks, taxis and commercial vehicles.",
  },
  {
    title: "Claim Assistance",
    icon: "📄",
    desc: "Complete support from document collection to claim settlement.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="text-blue-700 font-semibold uppercase tracking-widest">
            Our Services
          </span>

          <h2 className="text-5xl font-extrabold mt-4 text-gray-900">
            Complete Insurance Solutions
          </h2>

          <p className="text-gray-600 mt-5 text-lg max-w-3xl mx-auto">
            We provide end-to-end insurance services with expert guidance,
            quick renewals and hassle-free claim assistance.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
            >

              <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center text-5xl mb-6">
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-8">
                {service.desc}
              </p>

              <a
                href="#contact"
                className="inline-block mt-8 bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
              >
                Get Quote →
              </a>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}