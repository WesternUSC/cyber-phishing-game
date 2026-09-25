import React, { useEffect, useState } from "react";

interface WesternPopupProps {
  show: boolean;
  message: string;
  onClose: () => void;
  title?: string;
}

const ANIMATION_DURATION = 300;

const WesternPopup: React.FC<WesternPopupProps> = ({
  show,
  message,
  onClose,
  title = "Notification",
}) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setMounted(true);
      setVisible(false);

      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true);
        });
      });

      return () => cancelAnimationFrame(frame);
    }

    setVisible(false);

    const timeout = setTimeout(() => {
      setMounted(false);
    }, ANIMATION_DURATION);

    return () => clearTimeout(timeout);
  }, [show]);

  const handleClose = () => {
    setVisible(false);

    setTimeout(() => {
      onClose();
    }, ANIMATION_DURATION);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-start
        justify-center
        pointer-events-none
      "
    >
      <div
        className={`
          pointer-events-auto
          mt-6
          w-[calc(100%-2rem)]
          max-w-md
          overflow-hidden
          rounded-xl
          border
          border-[#4F2683]/20
          bg-white
          shadow-2xl

          transform
          transition-all
          duration-300
          ease-out

          ${
            visible
              ? "translate-y-0 opacity-100"
              : "-translate-y-[120%] opacity-0"
          }
        `}
      >
        <div className="bg-[#4F2683] px-6 py-4">
          <h2 className="text-lg font-semibold text-white">
            {title}
          </h2>
        </div>

        <div className="px-6 py-6">
          <p className="text-sm leading-6 text-gray-700">
            {message}
          </p>
        </div>

        <div className="flex justify-end border-t border-gray-100 bg-gray-50 px-6 py-4">
          <button
            type="button"
            onClick={handleClose}
            className="
              rounded-lg
              bg-[#4F2683]
              px-6
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition-colors
              duration-200
              hover:bg-[#3d1d65]
              focus:outline-none
              focus:ring-2
              focus:ring-[#4F2683]
              focus:ring-offset-2
            "
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default WesternPopup;
