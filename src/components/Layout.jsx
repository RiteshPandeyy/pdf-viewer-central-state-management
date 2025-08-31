import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <header className="backdrop-blur-md bg-white/70 border-b border-white/40 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-blue-700">Pdf Viewer</h1>

          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link to="/parent" className="hover:text-blue-600 font-medium">
              Parent
            </Link>
            <Link to="/about" className="hover:text-blue-600 font-medium">
              About Us
            </Link>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-200"
          >
            ☰
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white/90 border-t border-gray-200 shadow-inner">
            <div className="flex flex-col space-y-3 p-4">
              <Link
                to="/"
                className="text-gray-700 font-medium hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/parent"
                className="text-gray-700 font-medium hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Parent
              </Link>
              <Link
                to="/about"
                className="text-gray-700 font-medium hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white/70 backdrop-blur-md w-full max-w-5xl rounded-2xl shadow-lg p-6 border border-white/40">
          <Outlet />
        </div>
      </main>

      <footer className="backdrop-blur-md bg-white/70 border-t border-white/40 shadow-inner">
        <div className="max-w-6xl mx-auto p-4 flex items-center justify-center">
          <Link
            to="/"
            className="px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 active:scale-95"
          >
            Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
