export default function Navbar() {
  return (
    <nav className="bg-blue-700 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo + Company Name */}
        <a
          href="#home"
          className="flex items-center gap-3"
        >
          <img
            src="/logo.png"
            alt="Shiv Consultancy Logo"
            className="h-12 w-auto rounded-lg bg-white p-1 object-contain"
          />

          <div>
            <h1 className="text-xl font-bold text-white md:text-2xl">
              Shiv Consultancy
            </h1>

            <p className="hidden text-xs text-blue-100 sm:block">
              Your Trust, Our Responsibility
            </p>
          </div>
        </a>

        {/* Menu */}
        <div className="hidden gap-8 font-medium text-white md:flex">
          <a
            href="#home"
            className="transition hover:text-cyan-300"
          >
            Home
          </a>

          <a
            href="#services"
            className="transition hover:text-cyan-300"
          >
            Services
          </a>

          <a
            href="#quote"
            className="transition hover:text-cyan-300"
          >
            Quote
          </a>

          <a
            href="#contact"
            className="transition hover:text-cyan-300"
          >
            Contact
          </a>
        </div>

        {/* WhatsApp */}
        <a
          href="https://wa.me/918320352558"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-green-500 px-4 py-2 font-bold text-white transition hover:bg-green-600 md:px-5"
        >
          WhatsApp
        </a>

      </div>
    </nav>
  );
}