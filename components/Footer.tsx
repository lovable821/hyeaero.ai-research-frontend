import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 dark:text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <Link 
              href="/" 
              className="flex items-center mb-3 sm:mb-4"
            >
              <Logo className="h-6 w-6 sm:h-8 sm:w-8 text-primary-400" />
              <span className="ml-2 text-lg sm:text-xl font-bold text-white">
                HyeAero<span className="text-primary-400">.AI</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Real-time AI assistant for aircraft research and valuation.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Product</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link 
                  href="/research" 
                  className="text-xs sm:text-sm hover:text-white transition-colors block"
                >
                  Research
                </Link>
              </li>
              <li>
                <Link 
                  href="/market-data" 
                  className="text-xs sm:text-sm hover:text-white transition-colors block"
                >
                  Market Data
                </Link>
              </li>
              <li>
                <Link 
                  href="/pricing" 
                  className="text-xs sm:text-sm hover:text-white transition-colors block"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link 
                  href="/documentation" 
                  className="text-xs sm:text-sm hover:text-white transition-colors block"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link 
                  href="/about" 
                  className="text-xs sm:text-sm hover:text-white transition-colors block"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-xs sm:text-sm hover:text-white transition-colors block"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="/get-started" 
                  className="text-xs sm:text-sm hover:text-white transition-colors block"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Legal</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link 
                  href="#" 
                  className="text-xs sm:text-sm hover:text-white transition-colors block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-xs sm:text-sm hover:text-white transition-colors block"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800 text-center text-xs sm:text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} HyeAero.AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
