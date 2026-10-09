'use client';

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { useEffect } from 'react';

interface DebugTabProps {
  onReset?: () => void;
}

export function DebugTab({ onReset }: DebugTabProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore typing in text boxes
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      if (event.key.toLowerCase() === 'd') {
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleReset = () => {
    if (onReset) {
      onReset();
    } 
    else {
      localStorage.clear();
      sessionStorage.clear();
      router.push("/");

      setTimeout(() => {
        location.reload();
      }, 200);
    }

    setIsOpen(false);
  };

  if (!isVisible) {
    return;
  }

  return (
    <div
      className="fixed bottom-0 left-0 z-[3000] w-24"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="debug-tab-panel"
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
          ${isOpen ? 'rounded-tr-none' : 'rounded-tr-xl'}
        `}
      >
        Debug
      </button>

      <div
        id="debug-tab-panel"
        aria-hidden={!isOpen}
        className={`
          absolute
          bottom-9
          left-0
          z-20
          w-full
          overflow-hidden
          rounded-tr-xl
          bg-[#4F2683]
          text-white
          shadow-xl
          transition-all
          duration-300
          ease-out
          ${
            isOpen
              ? 'translate-y-0 opacity-100'
              : 'translate-y-full opacity-0 pointer-events-none'
          }
        `}
      >
        <button
          type="button"
          tabIndex={isOpen ? 0 : -1}
          onClick={handleReset}
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
          Reset
        </button>
      </div>
    </div>
  );
}