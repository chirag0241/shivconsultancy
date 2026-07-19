export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        <div>
          <h2 className="text-3xl font-bold mb-4">
            Shiv Consultancy
          </h2>

          <p className="text-gray-400">
            Your trusted insurance partner for Car, Bike,
            Health, Life & Commercial Insurance.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-gray-400">
            <li><a href="/">Home</a></li>
            <li><a href="#contact">Free Quote</a></li>
            <li><a href="/dashboard">CRM Dashboard</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Contact
          </h3>

          <p className="text-gray-400">
            📞 +91 9054706736
          </p>

          <p className="text-gray-400">
            📧 info@shivconsultancy.com
          </p>

          <p className="text-gray-400">
            Ahmedabad, Gujarat
          </p>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
        © 2026 Shiv Consultancy. All Rights Reserved.
      </div>

    </footer>
  );
}