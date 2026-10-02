import React from "react";

type CornerTabProps = {
  label?: string;
  currentPage?: string;
  onHomeClick?: () => void;
};

export function CornerTab({
  label = "Menu",
  currentPage = "I.S. Onboarding",
  onHomeClick,
}: CornerTabProps) {
  const handleHomeClick = () => {
    console.log("Home clicked");

    if (onHomeClick) {
      onHomeClick();
      return;
    }
  };

  const handleInformationSystemsOnboardingClick = () => {
    console.log("Information Systems Onboarding clicked");
  };

  const handlePoliciesAndProceduresClick = () => {
    console.log("Policies and Procedures clicked");
  };

  const handleJobTrainingClick = () => {
    console.log("Job Training clicked");
  };

  const handleUSCCultureClick = () => {
    console.log("USC Culture clicked");
  };

  return (
    <div className="fixed top-0 left-0 z-50 group">
      <div
        className="
          relative
          flex flex-col
          items-stretch
          bg-[#4F2683]
          text-white
          shadow-lg
          rounded-br-xl
          overflow-hidden
          cursor-pointer

          transform
          -translate-y-[calc(100%-32px)]
          group-hover:translate-y-0

          transition-transform
          duration-300
          ease-out
        "
      >
        <div
          className="
            flex
            items-center
            justify-center
            px-5
            py-4
            font-medium
            border-b
            border-white/20
          "
        >
          {currentPage}
        </div>

        <button
          type="button"
          onClick={handleHomeClick}
          className="
            px-5
            py-3
            text-left
            hover:bg-[#201436]
            transition-colors
            focus:outline-none
            focus:ring-2
            focus:ring-white
            focus:ring-inset
          "
        >
          Home
        </button>

        <button
          type="button"
          onClick={handleInformationSystemsOnboardingClick}
          className="
            px-5
            py-3
            text-left
            hover:bg-[#201436]
            transition-colors
            focus:outline-none
            focus:ring-2
            focus:ring-white
            focus:ring-inset
          "
        >
          I.S. Onboarding
        </button>

        <button
          type="button"
          onClick={handlePoliciesAndProceduresClick}
          className="
            px-5
            py-3
            text-left
            hover:bg-[#201436]
            transition-colors
            focus:outline-none
            focus:ring-2
            focus:ring-white
            focus:ring-inset
          "
        >
          Policies
        </button>

        <button
          type="button"
          onClick={handleJobTrainingClick}
          className="
            px-5
            py-3
            text-left
            hover:bg-[#201436]
            transition-colors
            focus:outline-none
            focus:ring-2
            focus:ring-white
            focus:ring-inset
          "
        >
          Job Training
        </button>

        <button
          type="button"
          onClick={handleUSCCultureClick}
          className="
            px-5
            py-3
            text-left
            hover:bg-[#201436]
            transition-colors
            focus:outline-none
            focus:ring-2
            focus:ring-white
            focus:ring-inset
          "
        >
          USC Culture
        </button>

        <div
          className="
            h-8
            px-4
            flex
            items-center
            justify-center
            text-xs
            font-semibold
            tracking-wide
            uppercase
          "
        >
          Home
        </div>
      </div>
    </div>
  );
}
