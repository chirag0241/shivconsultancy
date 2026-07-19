const services = [
  {
    title: "Car Insurance",
    icon: "🚗",
    desc: "Instant renewal, comprehensive & third-party car insurance.",
  },
  {
    title: "Bike Insurance",
    icon: "🏍️",
    desc: "Affordable bike insurance with quick renewal support.",
  },
  {
    title: "Health Insurance",
    icon: "❤️",
    desc: "Individual, family floater & senior citizen health plans.",
  },
  {
    title: "Life Insurance",
    icon: "🛡️",
    desc: "Secure your family's future with the right life insurance.",
  },
  {
    title: "Commercial Vehicle",
    icon: "🚚",
    desc: "Insurance solutions for trucks, taxis & commercial vehicles.",
  },
  {
    title: "Claim Assistance",
    icon: "📄",
    desc: "Complete claim support from document collection to settlement.",
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-gray-100">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-blue-700 mb-4">
          Our Insurance Services
        </h2>

        <p className="text-center text-gray-600 mb-12">
          Complete insurance solutions under one roof.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition"
            >
              <div className="text-5xl mb-4">
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600">
                {service.desc}
              </p>

              <button className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                Learn More
              </button>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}