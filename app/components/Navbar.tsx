export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-blue-700 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <h1 className="text-2xl font-bold text-white">
          Shiv Consultancy
        </h1>

        <div className="hidden md:flex gap-8 text-white font-medium">

          <a href="#home">Home</a>

          <a href="#services">Services</a>

          <a href="#quote">Quote</a>

          <a href="#contact">Contact</a>

        </div>

        <a
          href="https://wa.me/918511632556"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 px-5 py-2 rounded-lg text-white font-bold"
        >
          WhatsApp
        </a>

      </div>
    </nav>
  );
}