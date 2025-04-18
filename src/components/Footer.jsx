export default function Footer() {
    return (
      <footer className="bg-gray-100 text-gray-600 text-sm p-10 min-h-screen border-t border-gray-300">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="mb-2 sm:mb-0">&copy; {new Date().getFullYear()} Your Blog Name. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="/about" className="hover:text-gray-800">About</a>
            <a href="/contact" className="hover:text-gray-800">Contact</a>
            <a href="/privacy" className="hover:text-gray-800">Privacy</a>
          </div>
        </div>
      </footer>
    );
  }
  