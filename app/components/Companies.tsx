const companies = [
  "ICICI Lombard",
  "HDFC ERGO",
  "Bajaj Allianz",
  "TATA AIG",
  "Reliance General",
  "SBI General",
  "Go Digit",
  "10 + Insurance Partners"
];

export default function Companies() {
  return (
    <section className="py-24 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <span className="text-blue-700 font-semibold uppercase">
            Insurance Partners
          </span>

          <h2 className="text-5xl font-extrabold mt-4">
            Trusted Insurance Companies
          </h2>

          <p className="text-gray-600 mt-5">
            Compare policies from India's leading insurance companies.
          </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {companies.map((company) => (

            <div
              key={company}
              className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >

              <h3 className="text-xl font-bold text-gray-800">
                {company}
              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}