export default function About() {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        <div>

          <h2 className="text-4xl font-bold text-blue-700 mb-6">
            About Shiv Consultancy
          </h2>

          <p className="text-gray-700 text-lg leading-8 mb-5">
            Shiv Consultancy is your trusted insurance partner providing
            complete insurance solutions for individuals, families and businesses.
          </p>

          <p className="text-gray-700 text-lg leading-8 mb-5">
            We help customers compare policies, renew insurance on time,
            receive claim assistance and get the best premium from leading
            insurance companies.
          </p>

          <div className="grid grid-cols-2 gap-5 mt-8">

            <div className="bg-blue-50 rounded-xl p-5">
              <h3 className="text-3xl font-bold text-blue-700">5000+</h3>
              <p className="text-gray-600">Happy Customers</p>
            </div>

            <div className="bg-green-50 rounded-xl p-5">
              <h3 className="text-3xl font-bold text-green-700">10+</h3>
              <p className="text-gray-600">Insurance Companies</p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-5">
              <h3 className="text-3xl font-bold text-yellow-600">24×7</h3>
              <p className="text-gray-600">Claim Support</p>
            </div>

            <div className="bg-purple-50 rounded-xl p-5">
              <h3 className="text-3xl font-bold text-purple-700">100%</h3>
              <p className="text-gray-600">Trusted Service</p>
            </div>

          </div>

        </div>

        <div className="flex justify-center">

          <img
            src="/insurance.png"
            alt="Insurance"
            className="w-full max-w-md"
          />

        </div>

      </div>

    </section>
  );
}