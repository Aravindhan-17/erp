
import { AlertCircle, HeadphonesIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface FailedViewProps {
  onRetry: () => void;
}

export function FailedView({ onRetry }: FailedViewProps) {
  const reasons = [
    "Payment failed or was declined",
    "Insufficient balance in your account",
    "Network issue or server timeout",
    "Payment cancelled",
  ];

  const failAnimationStyles = `
  .fail-circle-wrapper {
    animation: scaleCircle 0.3s ease-in-out 0.8s both;
  }

  .fail-circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    animation: drawCircle 0.4s cubic-bezier(0.65, 0, 0.45, 1) forwards, fillRed 0.3s ease-in-out 0.4s forwards;
  }
  
  .fail-cross-1 {
    stroke-dasharray: 30;
    stroke-dashoffset: 30;
    animation: drawCheck 0.2s cubic-bezier(0.65, 0, 0.45, 1) 0.5s forwards;
  }

  .fail-cross-2 {
    stroke-dasharray: 30;
    stroke-dashoffset: 30;
    animation: drawCheck 0.2s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
  }
  
  @keyframes drawCircle {
    100% { stroke-dashoffset: 0; }
  }
  
  @keyframes fillRed {
    100% { fill: #ef4444; } /* Tailwind red-500 */
  }
  
  @keyframes drawCheck {
    100% { stroke-dashoffset: 0; }
  }
  
  @keyframes scaleCircle {
    0%, 100% { transform: none; }
    50% { transform: scale3d(1.1, 1.1, 1); }
  }
`;

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
      <style>{failAnimationStyles}</style>
      {/* Big Red X */}
      <div className="fail-circle-wrapper mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-red-50">
        <svg className="h-24 w-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle
            className="fail-circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
            stroke="#ef4444"
            strokeWidth="3"
          />
          <path
            className="fail-cross-1"
            fill="none"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeMiterlimit="10"
            d="M16,16 L36,36"
          />
          <path
            className="fail-cross-2"
            fill="none"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeMiterlimit="10"
            d="M36,16 L16,36"
          />
        </svg>
      </div>

      <h1 className="mb-2 text-3xl font-extrabold text-gray-900 md:text-4xl">
        Registration Failed
      </h1>
      <p className="mb-10 text-lg text-gray-600">Payment could not be completed</p>

      {/* Details Card */}
      <div className="mb-10 w-full rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm sm:p-8">
        <h2 className="mb-2 text-xl font-bold text-red-500">Payment Failed</h2>
        <p className="mb-1 text-gray-700">
          We couldn&apos;t process your payment of{" "}
          <span className="font-bold text-red-500">₹1</span>.
        </p>
        <p className="mb-8 text-gray-700">Please try again or use a different payment method.</p>

        <div className="my-6 border-t border-gray-100" />

        <h3 className="mb-4 font-bold text-gray-900">Possible Reasons</h3>
        <ul className="space-y-4">
          {reasons.map((reason, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <AlertCircle size={20} className="text-primary mt-0.5 shrink-0" />
              <span className="text-gray-700">{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="mb-16 flex w-full flex-col gap-4 sm:flex-row">
        <button
          onClick={onRetry}
          className="bg-primary flex-1 rounded-xl py-4 text-base font-bold text-white transition-opacity hover:opacity-90"
        >
          Try Again
        </button>
        <Link
          to="/flash-deals"
          className="border-primary text-primary flex flex-1 items-center justify-center rounded-xl border py-4 text-base font-bold transition-colors hover:bg-purple-50"
        >
          Back to Deals
        </Link>
      </div>

      {/* Support */}
      <div className="flex items-center gap-3">
        <HeadphonesIcon size={24} className="text-primary" />
        <span className="text-lg font-medium text-gray-900">
          Need help?{" "}
          <a href="#" className="text-primary font-bold hover:underline">
            Contact our support
          </a>
        </span>
      </div>
    </div>
  );
}
