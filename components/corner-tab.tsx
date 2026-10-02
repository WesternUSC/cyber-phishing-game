import React, { useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);

  const handleHomeClick = () => {
    console.log("Home clicked");

    if (onHomeClick) {
      onHomeClick();
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
    <div
      className="fixed top-0 left-0 z-50 w-32"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={handleHomeClick}
        className={`
          relative
          z-30
          flex
          h-9
          w-full
          items-center
          justify-start
          px-5
          bg-[#4F2683]
          text-white
          text-xs
          font-semibold
          tracking-wide
          uppercase
          shadow-lg
          cursor-pointer
          hover:bg-[#201436]
          transition-all
          focus:outline-none
          focus:ring-2
          focus:ring-white
          focus:ring-inset
          ${isOpen ? "rounded-br-none" : "rounded-br-xl"}
        `}
      >
        Home
      </button>

      <div
        className={`
          absolute
          top-9
          left-0
          z-20
          w-full
          overflow-hidden
          rounded-br-xl
          bg-[#4F2683]
          text-white
          shadow-xl
          transition-all
          duration-300
          ease-out
          ${
            isOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0 pointer-events-none"
          }
        `}
      >
        <div
          className="
            flex
            min-h-14
            items-center
            px-5
            py-3
            border-b
            border-white/20
            bg-[#3F1E69]
            text-sm
            font-semibold
          "
        >
          <span className="truncate">{currentPage}</span>
        </div>

        <button
          type="button"
          onClick={handleHomeClick}
          className="
            flex
            min-h-12
            w-full
            items-center
            px-5
            text-left
            text-sm
            font-medium
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
            flex
            min-h-12
            w-full
            items-center
            px-5
            text-left
            text-sm
            font-medium
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
            flex
            min-h-12
            w-full
            items-center
            px-5
            text-left
            text-sm
            font-medium
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
            flex
            min-h-12
            w-full
            items-center
            px-5
            text-left
            text-sm
            font-medium
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
            flex
            min-h-12
            w-full
            items-center
            px-5
            text-left
            text-sm
            font-medium
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
      </div>
    </div>
  );
}
