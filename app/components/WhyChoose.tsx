const features = [
  {
    icon: "⚡",
    title: "Instant Policy Renewal",
    desc: "Quick and hassle-free insurance renewal in minutes.",
  },
  {
    icon: "💰",
    title: "Best Premium",
    desc: "Compare top insurance companies and get the best price.",
  },
  {
    icon: "🛡️",
    title: "Claim Assistance",
    desc: "Complete support during claim process until settlement.",
  },
  {
    icon: "📞",
    title: "Dedicated Support",
    desc: "Friendly expert assistance whenever you need help.",
  },
  {
    icon: "⏰",
    title: "24×7 Service",
    desc: "Available for emergency insurance and claim support.",
  },
  {
    icon: "🤝",
    title: "Trusted Consultancy",
    desc: "Thousands of satisfied customers trust Shiv Consultancy.",
  },
];

export default function WhyChoose() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="text-blue-700 font-semibold uppercase">
            Why Choose Us
          </span>

          <h2 className="text-5xl font-extrabold mt-4">
            Why Customers Trust
            <br />
            Shiv Consultancy
          </h2>

          <p className="mt-6 text-gray-600 max-w-3xl mx-auto">
            We simplify insurance with expert advice, fast renewals,
            claim assistance and reliable customer support.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((item, index) => (

            <div
              key={index}
              className="bg-blue-50 rounded-3xl p-8 hover:bg-blue-700 hover:text-white transition duration-300 shadow-lg"
            >

              <div className="text-5xl mb-5">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold mb-3">
                {item.title}
              </h3>

              <p>
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}