import React from "react";

type CornerTabProps = {
  label?: string;
  onHomeClick?: () => void;
};

export function CornerTab({
  label = "Menu",
  onHomeClick,
}: CornerTabProps) {
  const handleHomeClick = () => {
    if (onHomeClick) {
      onHomeClick();
      return;
    }
  };

  return (
    <div className="fixed top-0 left-0 z-50 group">
      <div
        className="
          relative
          flex flex-col
          items-center
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
        <button
          type="button"
          onClick={handleHomeClick}
          className="
            flex
            items-center
            justify-center
            gap-2
            px-5
            py-4
            hover:bg-[#201436]
            transition-colors
            focus:outline-none
            focus:ring-2
            focus:ring-white
            focus:ring-inset
          "
          aria-label="Go home"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 10.5 12 3l9 7.5"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 9.5V21h14V9.5"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 21v-6h6v6"
            />
          </svg>

          <span className="font-medium">{label}</span>
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
          {label}
        </div>
      </div>
    </div>
  );
}
