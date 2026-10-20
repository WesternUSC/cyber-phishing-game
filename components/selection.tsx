'use client';

import React, { useState, useEffect } from "react";
import HelpChat from "./help-chat";
import { Certificate } from "./slides";
import { useRouter } from "next/navigation";
import { useApp } from "@/components/app-context";

type TrainingOption = {
  id: string;
  label: string;
  color: string;
};

type SelectionProps = {
  playerName: string;
  title: string;
  supervisor: string;
  scribe1: string;
  scribe2: string;
  scribe3: string;
  scribe4: string;
  scribe5: string;
  scribe6: string;
  scribe7: string;
  userEmail: string;
  options?: TrainingOption[];
  policiesOptions?: TrainingOption[];
  setMadeSelection: React.Dispatch<React.SetStateAction<boolean>>;
  seenCertificate: boolean;
  resetGame?: (shouldReload?: boolean) => void;
  setSelectedSlides: React.Dispatch<
    React.SetStateAction<
      | "eso"
      | "policies"
      | "cs"
      | "accessibility"
      | "conflict"
      | "disc"
      | "early"
      | "job"
    >
  >;
};

const defaultOptions: TrainingOption[] = [
  {
    id: "1",
    label: "INFORMATION SYSTEMS ONBOARDING",
    color: "#582c83",
  },
  {
    id: "2",
    label: "POLICIES AND PROCEDURES",
    color: "#582c83",
  },
  {
    id: "3",
    label: "JOB TRAINING",
    color: "#582c83",
  },
  {
    id: "4",
    label: "USC CULTURE",
    color: "#582c83",
  },
];

const defaultOptionsPolicies: TrainingOption[] = [
  {
    id: "2",
    label: "ACCEPTABLE USE POLICY",
    color: "#582c83",
  },
  {
    id: "3",
    label: "ACCESSIBILITY FOR CUSTOMER SERVICE POLICY",
    color: "#582c83",
  },
  {
    id: "4",
    label: "ACCESSIBILITY POLICY",
    color: "#582c83",
  },
  {
    id: "5",
    label: "CONFLICT OF INTEREST POLICY FOR USC PAID EMPLOYEES",
    color: "#582c83",
  },
  {
    id: "6",
    label: "DISCRIMINATION HARASSMENT AND VIOLENCE PREVENTION POLICY",
    color: "#582c83",
  },
  {
    id: "8",
    label: "EARLY AND SAFE RETURN TO WORK POLICY",
    color: "#582c83",
  },
];

const policyDownloads: Record<string, [string, string]> = {
  "2": [
    "/pdfs/Acceptable Use Policy.pdf",
    "/pdfs/Acceptable_Use_Policy_Summary_and_Quiz.pdf",
  ],

  "3": [
    "/pdfs/Accessibility for Customer Service Policy.pdf",
    "/pdfs/Accessibility_for_Customer_Service_Policy_Summary_and_Quiz.pdf",
  ],

  "4": [
    "/pdfs/Accessibility Policy.pdf",
    "/pdfs/Accessibility_Policy_Summary_and_Quiz.pdf",
  ],

  "5": [
    "/pdfs/Conflict of Interest Policy for USC Paid Employees.pdf",
    "/pdfs/Conflict_of_Interest_Policy_for_USC_Paid_Employees_Summary_and_Quiz.pdf",
  ],

  "6": [
    "/pdfs/Discrimination Harassment and Violence Prevention Policy.pdf",
    "/pdfs/Discrimination_Harassment_and_Violence_Prevention_Policy_Summary_and_Quiz.pdf",
  ],

  "8": [
    "/pdfs/Early and Safe Return to Work Policy.pdf",
    "/pdfs/Early_and_Safe_Return_to_Work_Policy_Summary_and_Quiz.pdf",
  ],
};

export default function Selection({
  playerName,
  title,
  supervisor,
  scribe1,
  scribe2,
  scribe3,
  scribe4,
  scribe5,
  scribe6,
  scribe7,
  userEmail,
  options = defaultOptions,
  policiesOptions = defaultOptionsPolicies,
  setMadeSelection,
  setSelectedSlides,
  seenCertificate,
  resetGame,
}: SelectionProps) {
  const router = useRouter();
  const { userData, setUserData } = useApp();

  const [selectedId, setSelectedId] = useState(options[0]?.id ?? "");

  const [selectedPolicyId, setSelectedPolicyId] = useState(
    policiesOptions[0]?.id ?? ""
  );

  const [policiesPage, setPoliciesPage] = useState(false);

  //const [showCompletedPopup, setShowCompletedPopup] = useState(false);
  const [isIsoCardFlipped, setIsIsoCardFlipped] = useState(false);

  const [open, setOpen] = useState(false);

  const selectedOption = options.find(
    (option) => option.id === selectedId
  );

  const selectedPolicyOption = policiesOptions.find(
    (option) => option.id === selectedPolicyId
  );

  useEffect(() => {
      const savedString = localStorage.getItem("completedIsoModule");

      if (savedString !== null) {
          if (savedString === "true") {
            setUserData(prev => ({
              ...prev,
              completedIsoModule: true
            }));
          }
      }
  }, [setUserData]);

  const handleDownload = async (
    event: React.MouseEvent<HTMLButtonElement>,
    policyId: string
  ) => {
    event.stopPropagation();

    const files = policyDownloads[policyId];

    if (!files) {
      console.warn(`No PDFs configured for policy ${policyId}`);
      return;
    }

    for (const file of files) {
      const link = document.createElement("a");

      link.href = file;
      link.download = file.split("/").pop() || "document.pdf";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  };

  const handleRestartModule = () => {
    localStorage.clear();
    sessionStorage.clear();
    router.push("/desktop-simulator");
    //resetGame?.(false);
  };

  const [showCertificate, setShowCertificate] = useState(false);

  const handleDownloadCertificate = () => {
    router.push("/certificate");
  };

  const handleStart = (optionId: string) => {
    if (!policiesPage) {
      if (userData.completedIsoModule && optionId === "1") {
        setSelectedId(optionId);
        setIsIsoCardFlipped(true);
        return;
      }

      switch (optionId) {
        case "1":
          router.push("/iso-slides");
          break;

        case "2":
          router.push("/policies");
          break;

        case "3":
          router.push("/job-training");
          break;

        case "4":
          setSelectedSlides("accessibility");
          setMadeSelection(true);
          break;

        default:
          setSelectedSlides("eso");
          setMadeSelection(true);
          break;
      }
    } else {
      switch (optionId) {
        case "2":
          router.push("/policies");
          break;

        case "3":
          setSelectedSlides("cs");
          setMadeSelection(true);
          break;

        case "4":
          setSelectedSlides("accessibility");
          setMadeSelection(true);
          break;

        case "5":
          setSelectedSlides("conflict");
          setMadeSelection(true);
          break;

        case "6":
          setSelectedSlides("disc");
          setMadeSelection(true);
          break;

        case "8":
          setSelectedSlides("early");
          setMadeSelection(true);
          break;

        default:
          setSelectedSlides("eso");
          setMadeSelection(true);
          break;
      }
    }
  };

  const handleBack = () => {
    setPoliciesPage(false);
  };

  const isContinueDisabled = policiesPage
    ? !selectedPolicyOption
    : !selectedOption;

  if (showCertificate) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Certificate playerName={playerName} />

        <button
          onClick={() => setShowCertificate(false)}
          style={{
            marginTop: "2.5rem",
            marginBottom: "2rem",
            padding: "0.75rem 2.5rem",
            backgroundColor: "#4f2683",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
            transition: "background-color 0.2s ease, transform 0.1s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#3d1d65";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#4f2683";
          }}
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <HelpChat
        iconSrc="usc-logo-help-icon.png"
        recipientEmail={userEmail}
      />

      {open && (
        <div
          className="help-chat__overlay"
          onClick={() => setOpen(false)}
        >
          <div
            className="help-chat__box"
            role="dialog"
            aria-modal="true"
            aria-labelledby="help-chat-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="help-chat__header">
              <span id="help-chat-title">How can we help?</span>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close help chat"
                className="help-chat__close"
              >
                ×
              </button>
            </div>

            <div className="help-chat__body">
              <iframe
                className="freshwidget-embedded-form"
                title="Submit a support ticket"
                src="https://westernusc.freshservice.com/widgets/feedback_widget/new?&widgetType=embedded&submitThanks=Thank%20you%20for%20submitting%20the%20ticket.&screenshot=no"
                scrolling="no"
                frameBorder="0"
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .help-chat__overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(15, 8, 25, 0.5);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          animation: help-overlay-in 0.2s ease-out;
        }

        .help-chat__box {
          position: relative;
          width: 500px;
          max-width: 100%;
          max-height: calc(100dvh - 40px);
          display: flex;
          flex-direction: column;
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
          animation: help-modal-in 0.25s ease-out;
        }

        .help-chat__header {
          flex-shrink: 0;
          background: #4f2584;
          color: white;
          padding: 16px 20px;
          font-weight: 600;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .help-chat__close {
          border: 0;
          background: transparent;
          color: white;
          font-size: 28px;
          cursor: pointer;
          line-height: 1;
          padding: 0 4px;
        }

        .help-chat__body {
          padding: 0;
          height: min(600px, calc(100dvh - 120px));
          min-height: 300px;
          overflow: auto;
          background: white;
        }

        .freshwidget-embedded-form {
          display: block;
          width: 100%;
          height: 100%;
          min-height: 500px;
          border: 0;
        }

        @keyframes help-overlay-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes help-modal-in {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 480px) {
          .help-chat__overlay {
            padding: 12px;
          }

          .help-chat__box {
            width: 100%;
            max-height: calc(100dvh - 24px);
            border-radius: 12px;
          }

          .help-chat__body {
            height: calc(100dvh - 110px);
            min-height: 250px;
          }
        }

        .iso-flip-face {
          position: absolute;
          inset: 0;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          padding: 22px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;

          color: #582c83;

          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.88),
            rgba(255, 255, 255, 0.66)
          );

          border: 1px solid rgba(255, 255, 255, 0.85);
          border-radius: 22px;
          overflow: hidden;

          box-shadow:
            0 12px 32px rgba(25, 8, 45, 0.14),
            inset 0 1px 0 rgba(255, 255, 255, 0.95);

          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);

          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;

          transition:
            background 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }

        .dashboard-card.iso-flip-card,
        .dashboard-card.iso-flip-card:hover,
        .dashboard-card.iso-flip-card:focus-visible {
          background: transparent;
          border-color: transparent;
          box-shadow: none;
        }

        .iso-flip-card .iso-flip-face,
        .iso-flip-card:hover .iso-flip-face,
        .iso-flip-card:focus-visible .iso-flip-face {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.88),
            rgba(255, 255, 255, 0.66)
          );
        }

        .dashboard-card.iso-flip-card:hover,
        .dashboard-card.iso-flip-card:focus-visible {
          transform: translateY(-4px);
          outline: none;
        }

        .iso-flip-card::before {
          display: none;
        }

        .iso-flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 190px;
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
          transition: transform 0.75s cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .iso-flip-front {
          transform: rotateY(0deg);
          z-index: 2;
        }

        .iso-flip-back {
          transform: rotateY(180deg);
          z-index: 1;
          cursor: default;
        }

        .iso-flip-card.is-flipped .iso-flip-inner {
          transform: rotateY(180deg);
        }

        .iso-flip-card.is-flipped .iso-flip-front {
          pointer-events: none;
        }

        .iso-flip-card.is-flipped .iso-flip-back {
          z-index: 3;
        }

        .iso-flip-card.option-completed .iso-flip-front {
          border-color: rgba(46, 125, 50, 0.45);
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.94),
            rgba(229, 245, 231, 0.96)
          );
        }

        .iso-flip-title {
          margin: 0 0 8px;
          font-size: clamp(1rem, 1.4vw, 1.3rem);
          line-height: 1.2;
          font-weight: 850;
        }

        .iso-flip-message {
          margin: 0 0 8px;
          font-size: 0.78rem;
          line-height: 1.4;
          font-weight: 600;
        }

        .iso-flip-subtext {
          margin: 0 0 12px;
          font-size: 0.7rem;
          line-height: 1.35;
          opacity: 0.8;
        }

        .iso-flip-actions {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 6px;
          width: 100%;
        }

        .iso-flip-button {
          width: 100%;
          padding: 8px 10px;
          border: 0;
          border-radius: 8px;
          font: inherit;
          font-size: 0.72rem;
          font-weight: 800;
          cursor: pointer;
        }

        .iso-flip-button.restart {
          color: white;
          background: #4f2683;
        }

        .iso-flip-button.certificate {
          color: white;
          background: #c69214;
        }

        .iso-flip-close {
          align-self: center;
          border: 0;
          padding: 4px 8px;
          color: #582c83;
          background: transparent;
          font: inherit;
          font-size: 0.7rem;
          font-weight: 750;
          cursor: pointer;
        }

        .iso-flip-button:focus-visible,
        .iso-flip-close:focus-visible {
          outline: 2px solid #582c83;
          outline-offset: 3px;
        }

        @media (max-width: 850px) {
          .iso-flip-face {
            padding: 16px;
            border-radius: 20px;
          }

          .iso-flip-inner {
            min-height: 180px;
          }
        }

        @media (max-width: 480px) {
          .iso-flip-face {
            padding: 12px;
            border-radius: 18px;
          }

          .iso-flip-inner {
            min-height: 155px;
          }

          .iso-flip-title {
            font-size: 1rem;
          }

          .iso-flip-message,
          .iso-flip-subtext {
            font-size: 0.68rem;
          }

          .iso-flip-actions {
            gap: 4px;
          }

          .iso-flip-button {
            padding: 6px 8px;
            font-size: 0.68rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .iso-flip-inner,
          .iso-flip-face {
            transition-duration: 0.01ms;
          }
        }
      `}</style>

      <header style={styles.header}>
        <h1 style={styles.title}>
          Welcome, <span style={styles.name}>{playerName}</span>
        </h1>

        <p style={styles.chooseText}>
          {title}
        </p>
      </header>

      <main className="dashboard-grid">
        {(policiesPage ? policiesOptions : options).map((option) => {
          const isOnboarding = !policiesPage && option.id === "1";

          const isCompleted =
            isOnboarding && userData.completedIsoModule;

          return (
            <div
              key={`${policiesPage ? "policy" : "training"}-${option.id}`}
              tabIndex={0}
              aria-label={option.label}
              aria-expanded={isOnboarding ? isIsoCardFlipped : undefined}
              className={`dashboard-card training-card ${
                isOnboarding ? "onboarding-card" : ""
              } ${
                !policiesPage && option.id === "2" ? "policies-card" : ""
              } ${
                !policiesPage && option.id === "3" ? "job-card" : ""
              } ${
                !policiesPage && option.id === "4" ? "culture-card" : ""
              } ${
                isCompleted ? "option-completed" : ""
              } ${
                isOnboarding
                  ? `iso-flip-card ${isIsoCardFlipped ? "is-flipped" : ""}`
                  : ""
              }`}
              onClick={() => {
                if (isOnboarding && isIsoCardFlipped) {
                  setIsIsoCardFlipped(false);
                  return;
                }

                handleStart(option.id);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();

                  if (isOnboarding && isIsoCardFlipped) {
                    setIsIsoCardFlipped(false);
                    return;
                  }

                  handleStart(option.id);
                }
              }}
            >
              {isOnboarding ? (
                <div className="iso-flip-inner">
                  <div className="iso-flip-face iso-flip-front">
                    <span className="option-label">{option.label}</span>

                    {isCompleted && (
                      <span
                        className="completed-checkmark"
                        aria-label="Module completed"
                        title="Module completed"
                      >
                        ✓
                      </span>
                    )}
                  </div>

                  <div
                    className="iso-flip-face iso-flip-back"
                    aria-hidden={!isIsoCardFlipped}
                  >

                    <p className="iso-flip-message">
                      You have already completed the Information Systems
                      Onboarding module.
                    </p>

                    <p className="iso-flip-subtext">
                      You can restart the module or download your completion
                      certificate.
                    </p>

                    <div className="iso-flip-actions">
                      <button
                        type="button"
                        className="iso-flip-button restart"
                        tabIndex={isIsoCardFlipped ? 0 : -1}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleRestartModule();
                        }}
                      >
                        Restart Module
                      </button>

                      <button
                        type="button"
                        className="iso-flip-button certificate"
                        tabIndex={isIsoCardFlipped ? 0 : -1}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDownloadCertificate();
                        }}
                      >
                        Download Certificate
                      </button>

                      <button
                        type="button"
                        className="iso-flip-close"
                        tabIndex={isIsoCardFlipped ? 0 : -1}
                        onClick={(event) => {
                          event.stopPropagation();
                          setIsIsoCardFlipped(false);
                        }}
                      >
                        Flip Back
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <span className="option-label">{option.label}</span>
              )}
            </div>
          );
        })}

        {/* IT SUPPORT PORTAL */}
        <button
          type="button"
          className="dashboard-card support-card support-wide-card"
          onClick={() => {
            setOpen(true);
          }}
        >
          <span className="card-eyebrow">NEED ASSISTANCE?</span>
          <span className="card-title">IT Support Portal</span>
          <span className="card-description">
            Get technical assistance or submit a support ticket.
          </span>
          <span className="card-arrow" aria-hidden="true">↗</span>
        </button>

        <section
          className="dashboard-card logo-card"
          aria-label="University of Southern California logo"
        >
          <img
            src="/usc-logo-help-icon.png"
            alt="USC logo"
            className="dashboard-logo"
          />
        </section>
      </main>

      {/* POLICY BACK NAVIGATION */}
      {policiesPage && (
        <button
          type="button"
          onClick={handleBack}
          className="dashboard-back-button"
        >
          ← Back to training
        </button>
      )}

      <style jsx>{`
        .dashboard-grid {
          width: min(1100px, calc(100% - 48px));
          margin: 0 auto;

          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          grid-template-rows: auto auto;
          gap: 18px;
          align-items: stretch;
        }

        .dashboard-card {
          position: relative;
          min-width: 0;
          height: 190px;
          min-height: 0;
          padding: 22px;
          box-sizing: border-box;
          overflow: hidden;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;

          color: #582c83;
          background:
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.88),
              rgba(255, 255, 255, 0.66)
            );

          border: 1px solid rgba(255, 255, 255, 0.85);
          border-radius: 22px;

          box-shadow:
            0 12px 32px rgba(25, 8, 45, 0.14),
            inset 0 1px 0 rgba(255, 255, 255, 0.95);

          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease,
            background 0.25s ease;

          isolation: isolate;
        }

        .dashboard-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;

          background:
            radial-gradient(
              ellipse at 15% 5%,
              rgba(255, 255, 255, 0.95),
              transparent 52%
            ),
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.22),
              transparent 65%
            );
        }

        .onboarding-card {
          grid-column: 1 / span 5;
          grid-row: 1;
        }

        .policies-card {
          grid-column: 6 / span 4;
          grid-row: 1;
        }

        .logo-card {
          grid-column: 10 / span 3;
          grid-row: 1;
          height: 190px;
          min-height: 0;
          padding: 14px;
          align-self: stretch;
        }

        .support-wide-card {
          grid-column: span 6;
        }

        .job-card {
          grid-column: span 3;
        }

        .culture-card {
          grid-column: span 3;
        }

        .training-card {
          appearance: none;
          -webkit-appearance: none;
          cursor: pointer;
          font: inherit;
          font-size: clamp(0.8rem, 1.05vw, 1rem);
          font-weight: 800;
          line-height: 1.5;
          letter-spacing: 0.025em;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.88),
            rgba(255, 255, 255, 0.66)
          );
        }

        .dashboard-card:hover,
        .dashboard-card:focus-visible {
          transform: translateY(-4px);
          border-color: rgba(255, 255, 255, 1);

          background:
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.98),
              rgba(255, 255, 255, 0.83)
            );

          box-shadow:
            0 18px 42px rgba(25, 8, 45, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 1);

          outline: none;
        }

        .dashboard-card.iso-flip-card {
          background: transparent;
          border-color: transparent;
          box-shadow: none;
        }

        .dashboard-card.iso-flip-card:hover,
        .dashboard-card.iso-flip-card:focus-visible {
          background: transparent;
          border-color: transparent;
          box-shadow: none;
          transform: translateY(-4px);
          outline: none;
        }

        .iso-flip-card .iso-flip-face,
        .iso-flip-card:hover .iso-flip-face,
        .iso-flip-card:focus-visible .iso-flip-face {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.88),
            rgba(255, 255, 255, 0.66)
          );
        }

        .iso-flip-card.option-completed .iso-flip-front {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.94),
            rgba(229, 245, 231, 0.96)
          );
        }

        .iso-flip-card.option-completed .iso-flip-back {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.88),
            rgba(255, 255, 255, 0.66)
          );
        }

        .option-label {
          max-width: 100%;
          overflow-wrap: anywhere;
        }

        .option-completed {
          border-color: rgba(46, 125, 50, 0.45);
          background:
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.94),
              rgba(229, 245, 231, 0.82)
            );
        }

        .iso-flip-card.option-completed,
        .iso-flip-card.option-completed:hover,
        .iso-flip-card.option-completed:focus-visible {
          background: transparent;
          border-color: transparent;
          box-shadow: none;
        }

        .iso-flip-card.option-completed .iso-flip-front {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.94),
            rgba(229, 245, 231, 0.96)
          );
        }

        .iso-flip-card.option-completed .iso-flip-back {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.88),
            rgba(255, 255, 255, 0.66)
          );
        }

        .completed-checkmark {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #e5f5e7;
          border: 1px solid rgba(46, 125, 50, 0.4);

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 18px;
          font-weight: 900;
          color: #287438;
        }

        .support-card {
          cursor: pointer;
          text-align: left;
          align-items: flex-start;
          justify-content: center;
          font-family: inherit;
        }

        .card-eyebrow {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          opacity: 0.65;
        }

        .card-title {
          margin-top: 12px;
          font-size: clamp(1.2rem, 1.7vw, 1.65rem);
          line-height: 1.2;
          font-weight: 850;
        }

        .card-description {
          margin-top: 10px;
          font-size: 0.85rem;
          line-height: 1.55;
          opacity: 0.72;
        }

        .card-arrow {
          position: absolute;
          right: 20px;
          bottom: 16px;
          font-size: 1.35rem;
          font-weight: 700;
        }

        .dashboard-logo {
          width: 100%;
          height: 100%;
          max-height: 120px;
          object-fit: contain;
        }

        @media (max-width: 850px) {
          .dashboard-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            width: min(700px, calc(100% - 32px));
            gap: 16px;
          }

          .dashboard-card {
            grid-column: span 1;
            height: 180px;
            padding: 20px;
            border-radius: 20px;
          }

          .onboarding-card,
          .support-wide-card {
            grid-column: span 2;
          }

          .policies-card,
          .job-card,
          .culture-card {
            grid-column: span 1;
          }

          .logo-card {
            grid-column: span 1;
            grid-row: auto;
            height: 150px;
            padding: 14px;
          }
        }

        @media (max-width: 480px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
            width: calc(100% - 32px);
            gap: 14px;
          }

          .dashboard-card {
            grid-column: span 1;
            height: 155px;
            padding: 22px;
            border-radius: 18px;
          }

          .logo-card {
            height: 125px;
            padding: 12px;
          }

          .dashboard-logo {
            max-height: 100px;
          }

          .training-card {
            font-size: 0.9rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .dashboard-card,
          .download-button {
            transition: none;
          }
        }

        .training-card {
          appearance: none;
          -webkit-appearance: none;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.88),
            rgba(255, 255, 255, 0.66)
          );
        }

        .training-card:hover,
        .training-card:focus-visible {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.98),
            rgba(255, 255, 255, 0.83)
          );
        }
      `}</style>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "36px 0",
    overflowX: "hidden",
    overflowY: "auto",
    backgroundColor: "#582c83",
    backgroundImage:
      "radial-gradient(ellipse at 10% 10%, rgba(255,255,255,0.16), transparent 40%), radial-gradient(ellipse at 90% 90%, rgba(30,10,50,0.28), transparent 45%)",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    color: "#582c83",
  },

  header: {
    width: "100%",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "12px 24px 28px",
    boxSizing: "border-box",
  },

  titleContainer: {
    textAlign: "center",
  },

  title: {
    margin: 0,
    fontSize: "clamp(2rem, 5vw, 3.8rem)",
    lineHeight: 1.1,
    fontWeight: 800,
    letterSpacing: "-0.04em",
    color: "#ffffff",
    textAlign: "center",
  },

  name: {
    color: "#e4d5f5",
  },

  contentHeader: {
    width: "100%",
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    marginTop: "24px",
  },

  logo: {
    width: "80px",
    height: "auto",
    objectFit: "contain",
    alignSelf: "center",
    marginBottom: "20px",
  },

  chooseText: {
    textAlign: "center",
    margin: "14px 0 0",
    fontSize: "0.9rem",
    fontWeight: 700,
    color: "rgba(255,255,255,0.78)",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
  },

  optionsScrollArea: {
    width: "100%",
    maxWidth: "1100px",
    margin: "0 auto",
    flex: 1,
    minHeight: 0,
    boxSizing: "border-box",
    padding: "8px 24px 16px",
    overflowY: "visible",
    overflowX: "hidden",
  },

  optionsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "22px",
    width: "100%",
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "4px 0",
  },

  option: {
    position: "relative",
    width: "100%",
    aspectRatio: "1 / 1",
    minWidth: 0,
    padding: "20px",
    border: "1px solid rgba(255,255,255,0.30)",
    borderRadius: "20px",
    color: "#ffffff",
    fontSize: "clamp(0.85rem, 1.4vw, 1.05rem)",
    fontWeight: 750,
    lineHeight: 1.4,
    letterSpacing: "0.025em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    overflow: "hidden",
    boxSizing: "border-box",
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.20), rgba(255,255,255,0.06))",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    boxShadow:
      "0 10px 30px rgba(20,5,40,0.20), inset 0 1px 0 rgba(255,255,255,0.18)",
    cursor: "pointer",
    transition:
      "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease, background 0.22s ease",
  },

  optionCompleted: {
    background:
      "linear-gradient(135deg, rgba(46,125,50,0.55), rgba(255,255,255,0.08))",
    borderColor: "rgba(255,255,255,0.45)",
  },

  optionLabel: {
    flex: 1,
    minWidth: 0,
  },

  completedCheckmark: {
    position: "absolute",
    top: "14px",
    right: "14px",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.20)",
    border: "1px solid rgba(255,255,255,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: 900,
    color: "white",
    boxSizing: "border-box",
  },

  downloadButton: {
    width: "40px",
    height: "40px",
    padding: 0,
    marginRight: "10px",
    border: "none",
    borderRadius: "10px",
    background: "rgba(255, 255, 255, 0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
    transition:
      "background 0.18s ease, transform 0.18s ease",
  },

  checkmark: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    flexShrink: 0,
  },

  stickyFooter: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    padding: "24px 24px 28px",
    boxSizing: "border-box",
    background:
      "linear-gradient(to top, rgba(248, 250, 252, 0.98) 65%, rgba(248, 250, 252, 0))",
    pointerEvents: "none",
  },

  splitButtonContainer: {
    width: "100%",
    maxWidth: "600px",
    display: "flex",
    gap: "12px",
    boxSizing: "border-box",
  },

  startButton: {
    flex: 1,
    width: "50%",
    maxWidth: "600px",
    minHeight: "76px",
    marginTop: 0,
    border: "none",
    borderRadius: "22px",
    background: "#111827",
    color: "white",
    fontSize: "1.25rem",
    fontWeight: 800,
    boxShadow: "0 12px 30px rgba(17, 24, 39, 0.25)",
    transition:
      "transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease",
    pointerEvents: "auto",
  },

  backButton: {
    cursor: "pointer",
  },

  arrow: {
    marginLeft: "12px",
    fontSize: "1.5rem",
  },

  arrowLeft: {
    marginRight: "12px",
    fontSize: "1.5rem",
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 2000,
    background: "rgba(17, 24, 39, 0.60)",
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    boxSizing: "border-box",
  },

  modal: {
    position: "relative",
    width: "100%",
    maxWidth: "500px",
    background: "#ffffff",
    borderRadius: "28px",
    padding: "42px 36px 32px",
    boxSizing: "border-box",
    boxShadow: "0 30px 80px rgba(0, 0, 0, 0.30)",
    textAlign: "center",
    overflow: "hidden",
  },

  modalAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "8px",
    background:
      "linear-gradient(90deg, #4f2683 0%, #6f42a1 55%, #c69214 100%)",
  },

  modalIcon: {
    width: "72px",
    height: "72px",
    margin: "0 auto 20px",
    borderRadius: "50%",
    background: "#4f2683",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "42px",
    fontWeight: 900,
    boxShadow: "0 10px 24px rgba(79, 38, 131, 0.30)",
  },

  modalTitle: {
    margin: "0 0 14px",
    color: "#4f2683",
    fontSize: "2rem",
    lineHeight: 1.15,
    fontWeight: 800,
    letterSpacing: "-0.025em",
  },

  modalText: {
    margin: "0 auto 10px",
    maxWidth: "400px",
    color: "#1f2937",
    fontSize: "1.05rem",
    lineHeight: 1.6,
    fontWeight: 600,
  },

  modalSubtext: {
    margin: "0 auto 28px",
    maxWidth: "400px",
    color: "#6b7280",
    fontSize: "0.95rem",
    lineHeight: 1.5,
  },

  modalButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
  },

  modalButton: {
    width: "100%",
    minHeight: "56px",
    borderRadius: "14px",
    padding: "14px 20px",
    fontSize: "1rem",
    fontWeight: 800,
    cursor: "pointer",
    transition:
      "transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease",
    boxSizing: "border-box",
  },

  restartButton: {
    background: "#4f2683",
    color: "#ffffff",
    border: "2px solid #4f2683",
    boxShadow: "0 8px 18px rgba(79, 38, 131, 0.22)",
  },

  certificateButton: {
    background: "#c69214",
    color: "#ffffff",
    border: "2px solid #c69214",
    boxShadow: "0 8px 18px rgba(198, 146, 20, 0.22)",
  },

  closeButton: {
    marginTop: "18px",
    padding: "8px 16px",
    border: "none",
    background: "transparent",
    color: "#6b7280",
    fontSize: "0.9rem",
    fontWeight: 700,
    cursor: "pointer",
  },
};
