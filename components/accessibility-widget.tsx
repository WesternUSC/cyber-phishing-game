
"use client";

import { useEffect, useRef, useState } from "react";
import { useZoom } from "./zoom-context";

const zoomLevels = [
  { label: "100%", value: 1 },
  { label: "125%", value: 1.25 },
  { label: "150%", value: 1.5 },
  { label: "200%", value: 2 },
  { label: "250%", value: 2.5 },
  { label: "300%", value: 3 },
];

export default function AccessibilityWidget() {
  const { zoom, setZoom, resetZoom } = useZoom();

  const [isOpen, setIsOpen] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);

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

  function handleReset() {
    resetZoom();
  }

  return (
    <>
      <button
        type="button"
        className="accessibility-trigger"
        aria-label="Open zoom settings"
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
                Zoom settings
              </h2>
              <p>
                Magnify the website.
              </p>
            </div>

            <button
              type="button"
              className="accessibility-close"
              aria-label="Close zoom settings"
              onClick={closeDialog}
            >
              &times;
            </button>
          </header>

          <section className="accessibility-section">
            <h3>Page magnification</h3>
            <p>
              Select a zoom level, then drag the page to explore it.
            </p>

            <div className="font-size-options">
              {zoomLevels.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  aria-pressed={zoom === level.value}
                  className={
                    zoom === level.value ? "active" : ""
                  }
                  onClick={() => setZoom(level.value)}
                >
                  <span>{level.label}</span>
                </button>
              ))}
            </div>
          </section>

          <footer className="accessibility-footer">
            <button
              type="button"
              className="accessibility-reset"
              onClick={handleReset}
            >
              Reset zoom
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
