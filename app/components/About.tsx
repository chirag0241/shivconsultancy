export default function About() {
  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-white to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <span className="text-blue-700 font-semibold uppercase tracking-widest">
              About Us
            </span>

            <h2 className="text-5xl font-extrabold mt-4 text-gray-900 leading-tight">
              Your Trusted Insurance
              <br />
              Partner
            </h2>

            <p className="mt-8 text-lg text-gray-600 leading-9">
              Shiv Consultancy provides complete insurance solutions
              for individuals, families and businesses. We compare
              policies from leading insurance companies to help you
              choose the best coverage at the right premium.
            </p>

            <p className="mt-5 text-lg text-gray-600 leading-9">
              From policy renewal to claim assistance, our experienced
              team ensures a smooth and hassle-free insurance experience.
            </p>

            <div className="grid grid-cols-2 gap-5 mt-12">

              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-4xl font-bold text-blue-700">
                  5000+
                </h3>
                <p className="mt-2 text-gray-600">
                  Happy Customers
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-4xl font-bold text-green-600">
                  10+
                </h3>
                <p className="mt-2 text-gray-600">
                  Insurance Companies
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-4xl font-bold text-orange-500">
                  24×7
                </h3>
                <p className="mt-2 text-gray-600">
                  Claim Assistance
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-4xl font-bold text-purple-600">
                  100%
                </h3>
                <p className="mt-2 text-gray-600">
                  Trusted Service
                </p>
              </div>

            </div>

          </div>

          <div className="flex justify-center">

            <img
              src="/insurance.png"
              alt="Insurance"
              className="w-full max-w-lg drop-shadow-2xl"
            />

          </div>

        </div>

      </div>
    </section>
  );
}