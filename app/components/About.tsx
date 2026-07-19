export default function About() {
  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-white to-blue-50"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Heading */}
        <span className="text-blue-700 font-semibold uppercase tracking-widest">
          About Us
        </span>

        <h2 className="text-5xl font-extrabold mt-4 text-gray-900 leading-tight">
          Your Trusted Insurance
          <br />
          Partner
        </h2>

        {/* Description */}
        <p className="mt-8 max-w-4xl mx-auto text-lg text-gray-600 leading-9">
          Shiv Consultancy provides complete insurance solutions for
          individuals, families and businesses. We compare policies
          from leading insurance companies to help you choose the best
          coverage at the right premium.
        </p>

        <p className="mt-5 max-w-4xl mx-auto text-lg text-gray-600 leading-9">
          From policy renewal to claim assistance, our experienced team
          ensures a smooth, transparent and hassle-free insurance
          experience for every customer.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">

          <div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition duration-300">
            <h3 className="text-4xl font-bold text-blue-700">
              5000+
            </h3>
            <p className="mt-2 text-gray-600">
              Happy Customers
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition duration-300">
            <h3 className="text-4xl font-bold text-green-600">
              10+
            </h3>
            <p className="mt-2 text-gray-600">
              Insurance Partners
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition duration-300">
            <h3 className="text-4xl font-bold text-orange-500">
              24×7
            </h3>
            <p className="mt-2 text-gray-600">
              Claim Support
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition duration-300">
            <h3 className="text-4xl font-bold text-purple-600">
              100%
            </h3>
            <p className="mt-2 text-gray-600">
              Trusted Service
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}