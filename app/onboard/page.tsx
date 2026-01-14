"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Logo from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";

type OnboardingData = {
  role: string;
  aircraftInterests: string[];
  region: string;
};

const AIRCRAFT_MODELS = [
  "Cessna 172",
  "Cessna 182",
  "Cessna 206",
  "Beechcraft Bonanza",
  "Beechcraft King Air",
  "Piper PA-28",
  "Piper PA-32",
  "Cirrus SR22",
  "Diamond DA40",
  "Diamond DA62",
  "Gulfstream G650",
  "Bombardier Challenger",
  "Cessna Citation",
  "Embraer Phenom",
  "HondaJet",
];

export default function OnboardPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    role: "",
    aircraftInterests: [],
    region: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signup");
      return;
    }
    
    // Check if current user already completed onboarding
    // Only check if user is authenticated to ensure we're checking for the right user
    if (isAuthenticated) {
      const completedOnboarding = localStorage.getItem("hyeaero_onboarding");
      // If onboarding was completed, redirect to research
      // Note: In a real app, this should check against the user's ID, not just localStorage
      if (completedOnboarding) {
        try {
          const onboardingData = JSON.parse(completedOnboarding);
          // Only redirect if we have valid onboarding data
          if (onboardingData && (onboardingData.role || onboardingData.aircraftInterests || onboardingData.region)) {
            router.push("/research");
          }
        } catch (e) {
          // Invalid data, clear it and allow onboarding
          localStorage.removeItem("hyeaero_onboarding");
        }
      }
    }
  }, [isAuthenticated, router]);

  // Show loading while checking auth
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRoleSelect = (role: string) => {
    setData({ ...data, role });
  };

  const handleAircraftToggle = (model: string) => {
    setData({
      ...data,
      aircraftInterests: data.aircraftInterests.includes(model)
        ? data.aircraftInterests.filter(m => m !== model)
        : [...data.aircraftInterests, model],
    });
  };

  const handleRegionSelect = (region: string) => {
    setData({ ...data, region });
  };

  const handleSkip = () => {
    if (currentStep === 2) {
      // Clear aircraft interests when skipping
      setData({ ...data, aircraftInterests: [] });
      handleNext();
    } else if (currentStep === 3) {
      // Clear region when skipping
      setData({ ...data, region: "" });
      handleNext();
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    // Simulate API call - save onboarding data
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Only save if role is selected (required field)
      if (data.role) {
        // Store onboarding data in localStorage
        // Note: In production, this would be sent to backend API
        localStorage.setItem("hyeaero_onboarding", JSON.stringify({
          role: data.role,
          aircraftInterests: data.aircraftInterests || [],
          region: data.region || "",
          completedAt: new Date().toISOString(),
        }));
      }
      // Redirect to research dashboard
      router.push("/research");
    } catch (error) {
      console.error("Onboarding error:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center mb-4">
            <Logo className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              HyeAero<span className="text-primary-600">.AI</span>
            </span>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((currentStep / totalSteps) * 100)}% complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {currentStep === 1 && (
            <Step1Role
              onSelect={handleRoleSelect}
              selected={data.role}
              onNext={handleNext}
              canProceed={!!data.role}
            />
          )}
          {currentStep === 2 && (
            <Step2Aircraft
              selected={data.aircraftInterests}
              onToggle={handleAircraftToggle}
              onSkip={handleSkip}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          )}
          {currentStep === 3 && (
            <Step3Region
              onSelect={handleRegionSelect}
              selected={data.region}
              onSkip={handleSkip}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          )}
          {currentStep === 4 && (
            <Step4Completion
              data={data}
              onSubmit={handleComplete}
              isSubmitting={isSubmitting}
              onPrevious={handlePrevious}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Step 1: Role Selection
function Step1Role({
  onSelect,
  selected,
  onNext,
  canProceed,
}: {
  onSelect: (role: string) => void;
  selected: string;
  onNext: () => void;
  canProceed: boolean;
}) {
  const roles = [
    { id: "buyer", label: "Aircraft Buyer" },
    { id: "broker", label: "Broker" },
    { id: "operator", label: "Operator" },
    { id: "investor", label: "Investor / Lessor" },
    { id: "researching", label: "Just researching" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">What best describes you?</h2>
      <p className="text-gray-600 mb-6">Select the option that best matches your role</p>
      <div className="space-y-3 mb-6">
        {roles.map((role) => (
          <button
            key={role.id}
            type="button"
            onClick={() => onSelect(role.id)}
            className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
              selected === role.id
                ? "border-primary-600 bg-primary-50 text-primary-900"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            {role.label}
          </button>
        ))}
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className="px-6 py-2 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          Next
          <ArrowRightIcon className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

// Step 2: Aircraft Interest
function Step2Aircraft({
  selected,
  onToggle,
  onSkip,
  onNext,
  onPrevious,
}: {
  selected: string[];
  onToggle: (model: string) => void;
  onSkip: () => void;
  onNext: () => void;
  onPrevious: () => void;
}) {
  const hasSelections = selected.length > 0;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Which aircraft models are you most interested in?
      </h2>
      <p className="text-gray-600 mb-4">Select all that apply (optional)</p>
      <div className="grid grid-cols-2 gap-3 mb-6 max-h-96 overflow-y-auto">
        {AIRCRAFT_MODELS.map((model) => (
          <button
            key={model}
            type="button"
            onClick={() => onToggle(model)}
            className={`px-4 py-3 rounded-lg border-2 text-sm transition-all ${
              selected.includes(model)
                ? "border-primary-600 bg-primary-50 text-primary-900"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{model}</span>
              {selected.includes(model) && (
                <CheckIcon className="h-5 w-5 text-primary-600" />
              )}
            </div>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onPrevious}
          className="px-6 py-2 border-2 border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors flex items-center"
        >
          <ArrowRightIcon className="h-5 w-5 mr-2 rotate-180" />
          Previous
        </button>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onSkip}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Skip this step
          </button>
          <button
            type="button"
            onClick={onNext}
            className="px-6 py-2 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors flex items-center"
          >
            {hasSelections ? "Continue" : "Next"}
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Step 3: Region Focus
function Step3Region({
  onSelect,
  selected,
  onSkip,
  onNext,
  onPrevious,
}: {
  onSelect: (region: string) => void;
  selected: string;
  onSkip: () => void;
  onNext: () => void;
  onPrevious: () => void;
}) {
  const regions = [
    { id: "north-america", label: "North America" },
    { id: "europe", label: "Europe" },
    { id: "middle-east", label: "Middle East" },
    { id: "asia-pacific", label: "Asia-Pacific" },
    { id: "global", label: "Global" },
  ];

  const hasSelection = !!selected;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Primary market region</h2>
      <p className="text-gray-600 mb-6">Select your primary region of interest (optional)</p>
      <div className="space-y-3 mb-6">
        {regions.map((region) => (
          <button
            key={region.id}
            type="button"
            onClick={() => onSelect(region.id)}
            className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
              selected === region.id
                ? "border-primary-600 bg-primary-50 text-primary-900"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            {region.label}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onPrevious}
          className="px-6 py-2 border-2 border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors flex items-center"
        >
          <ArrowRightIcon className="h-5 w-5 mr-2 rotate-180" />
          Previous
        </button>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onSkip}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Skip this step
          </button>
          <button
            type="button"
            onClick={onNext}
            className="px-6 py-2 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors flex items-center"
          >
            {hasSelection ? "Continue" : "Next"}
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Step 4: Completion
function Step4Completion({
  data,
  onSubmit,
  isSubmitting,
  onPrevious,
}: {
  data: OnboardingData;
  onSubmit: () => void;
  isSubmitting: boolean;
  onPrevious: () => void;
}) {
  const roleLabels: Record<string, string> = {
    buyer: "Aircraft Buyer",
    broker: "Broker",
    operator: "Operator",
    investor: "Investor / Lessor",
    researching: "Just researching",
  };

  const regionLabels: Record<string, string> = {
    "north-america": "North America",
    europe: "Europe",
    "middle-east": "Middle East",
    "asia-pacific": "Asia-Pacific",
    global: "Global",
  };

  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckIcon className="h-8 w-8 text-primary-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">You're all set!</h2>
      <p className="text-gray-600 mb-8">
        Review your preferences and complete your account setup
      </p>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
        <h3 className="font-semibold text-gray-900 mb-4">Your preferences:</h3>
        <div className="space-y-3">
          <div>
            <span className="text-sm text-gray-600">Role:</span>
            <span className="ml-2 font-medium text-gray-900">
              {data.role ? roleLabels[data.role] : "Not selected"}
            </span>
          </div>
          <div>
            <span className="text-sm text-gray-600">Aircraft interests:</span>
            <span className="ml-2 font-medium text-gray-900">
              {data.aircraftInterests && data.aircraftInterests.length > 0
                ? `${data.aircraftInterests.length} selected`
                : "Skipped"}
            </span>
          </div>
          <div>
            <span className="text-sm text-gray-600">Region:</span>
            <span className="ml-2 font-medium text-gray-900">
              {data.region ? regionLabels[data.region] : "Skipped"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onPrevious}
          className="px-6 py-2 border-2 border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors flex items-center"
        >
          <ArrowRightIcon className="h-5 w-5 mr-2 rotate-180" />
          Previous
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-6 py-2 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
        >
          {isSubmitting ? (
            "Setting up..."
          ) : (
            <>
              Complete setup
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
