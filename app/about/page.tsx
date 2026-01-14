import { SparklesIcon, ChartBarIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-50 to-accent-50 py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">About HyeAero.AI</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Empowering aircraft professionals with real-time AI-powered research and valuation tools.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-4">
            HyeAero.AI is a real-time AI assistant that helps users and internal brokers research aircraft models, 
            compare values, and assess acquisition opportunities using Hye Aero's proprietary market data, 
            resale history, and performance analytics.
          </p>
          <p className="text-lg text-gray-700">
            Our platform provides comprehensive aircraft research and valuation services, delivering accurate 
            market insights and data-driven recommendations to help you make informed decisions.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <SparklesIcon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Data</h3>
              <p className="text-gray-600">
                Continuously updated market data and insights to ensure you have the most current information.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <ChartBarIcon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Analytics</h3>
              <p className="text-gray-600">
                Proprietary market data, resale history, and performance analytics for informed decisions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <ClockIcon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Insights</h3>
              <p className="text-gray-600">
                Intelligent analysis and recommendations powered by advanced AI technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Values</h2>
          <ul className="space-y-4 text-lg text-gray-700">
            <li className="flex items-start">
              <span className="text-primary-600 mr-3">•</span>
              <span><strong>Accuracy:</strong> We provide reliable, data-driven insights based on comprehensive market analysis.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-3">•</span>
              <span><strong>Innovation:</strong> We leverage cutting-edge AI technology to deliver intelligent solutions.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-3">•</span>
              <span><strong>Transparency:</strong> We believe in clear, honest communication and accessible information.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-3">•</span>
              <span><strong>Customer Focus:</strong> Your success is our priority, and we're committed to delivering value.</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
