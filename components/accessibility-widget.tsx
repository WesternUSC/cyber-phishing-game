
"use client";

import { useEffect, useRef, useState } from "react";

const fontSizes = [
  { label: "A−", value: 1 },
  { label: "A", value: 1.15 },
  { label: "A+", value: 1.3 },
  { label: "A++", value: 1.5 },
];

export default function AccessibilityWidget() {
  const [scale, setScale] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(
      "accessibility-font-scale"
    );

    if (saved) {
      const value = Number(saved);

      if ([1, 1.15, 1.3, 1.5].includes(value)) {
        setScale(value);
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--accessibility-font-scale",
      String(scale)
    );

    localStorage.setItem(
      "accessibility-font-scale",
      String(scale)
    );
  }, [scale]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  function closeDialog() {
    setIsOpen(false);
  }

  function resetSettings() {
    setScale(1);
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="accessibility-trigger"
        aria-label="Open accessibility settings"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="accessibility-dialog"
        onClick={() => setIsOpen(true)}
      >
        <svg
          viewBox="0 0 24 24"
          width="30"
          height="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="4" r="2" />
          <path d="M4 8h16M12 8v5m0 0-5 8m5-8 5 8" />
          <path d="m7 13 5-3 5 3" />
        </svg>
      </button>

      <dialog
        ref={dialogRef}
        id="accessibility-dialog"
        className="accessibility-dialog"
        aria-labelledby="accessibility-title"
        onClose={() => setIsOpen(false)}
      >
        <div className="accessibility-panel">
          <header className="accessibility-header">
            <div>
              <h2 id="accessibility-title">
                Accessibility settings
              </h2>
              <p>Customize your browsing experience.</p>
            </div>

            <button
              type="button"
              className="accessibility-close"
              aria-label="Close accessibility settings"
              onClick={closeDialog}
            >
              &times;
            </button>
          </header>

          <section className="accessibility-section">
            <h3>Text size</h3>
            <p>Adjust the text size across the website.</p>

            <div className="font-size-options">
              {fontSizes.map((size) => (
                <button
                  key={size.value}
                  type="button"
                  aria-pressed={scale === size.value}
                  className={
                    scale === size.value ? "active" : ""
                  }
                  onClick={() => setScale(size.value)}
                >
                  <span>{size.label}</span>
                  <small>{Math.round(size.value * 100)}%</small>
                </button>
              ))}
            </div>
          </section>

          <footer className="accessibility-footer">
            <button
              type="button"
              className="accessibility-reset"
              onClick={resetSettings}
            >
              Reset text size
            </button>

            <button
              type="button"
              className="accessibility-done"
              onClick={closeDialog}
            >
              Done
            </button>
          </footer>
        </div>
      </dialog>
    </>
  );
}
