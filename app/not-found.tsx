import Link from "next/link";
import Logo from "@/components/Logo";
import { HomeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center justify-center">
            <Logo className="h-12 w-12 text-primary-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">
              HyeAero<span className="text-primary-600">.AI</span>
            </span>
          </Link>
        </div>

        {/* 404 Content */}
        <div className="bg-white rounded-lg shadow-xl p-12">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              The page you're looking for doesn't exist or you don't have permission to access it.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors"
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              Go to Home
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Go Back
            </Link>
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            If you believe this is an error, please{" "}
            <Link href="/contact" className="text-primary-600 hover:text-primary-700 font-medium">
              contact support
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
