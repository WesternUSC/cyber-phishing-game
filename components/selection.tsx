'use client';

import React, { useState } from "react";
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
  const { userData } = useApp();

  const [selectedId, setSelectedId] = useState(options[0]?.id ?? "");

  const [selectedPolicyId, setSelectedPolicyId] = useState(
    policiesOptions[0]?.id ?? ""
  );

  const [policiesPage, setPoliciesPage] = useState(false);

  const [showCompletedPopup, setShowCompletedPopup] = useState(false);

  const selectedOption = options.find(
    (option) => option.id === selectedId
  );

  const selectedPolicyOption = policiesOptions.find(
    (option) => option.id === selectedPolicyId
  );

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

  const handleStart = () => {
    if (!policiesPage && userData.completedIsoModule && selectedId === "1") {
      setShowCompletedPopup(true);
      return;
    }

    if (!policiesPage) {
      switch (selectedId) {
        case "1":
          //setSelectedSlides("eso");
          //setMadeSelection(true);

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
      switch (selectedPolicyId) {
        case "2":
          //setSelectedSlides("policies");
          router.push("/policies");
          break;

        case "3":
          setSelectedSlides("cs");
          break;

        case "4":
          setSelectedSlides("accessibility");
          break;

        case "5":
          setSelectedSlides("conflict");
          break;

        case "6":
          setSelectedSlides("disc");
          break;

        case "8":
          setSelectedSlides("early");
          break;

        default:
          setSelectedSlides("eso");
          break;
      }

      setMadeSelection(true);
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

      <div style={styles.header}>
        <div style={styles.titleContainer}>
          <h1 style={styles.title}>
            Welcome, <span style={styles.name}>{playerName}</span>
          </h1>
        </div>

        <div style={styles.contentHeader}>
          <img
            src="usc-logo.png"
            alt="USC logo"
            style={styles.logo}
          />

          <p style={styles.chooseText}>{title}</p>
        </div>
      </div>

      <div style={styles.optionsScrollArea}>
        <div style={styles.optionsContainer}>
          {(policiesPage ? policiesOptions : options).map((option) => {
            const isSelected = policiesPage
              ? option.id === selectedPolicyId
              : option.id === selectedId;

            // const isCompleted =
            //   !policiesPage &&
            //   option.id === "1" &&
            //   seenCertificate;

            const isCompleted =
              !policiesPage &&
              option.id === "1" &&
              userData.completedIsoModule;

            return (
              <div
                key={option.id}
                role="button"
                tabIndex={0}
                onClick={() =>
                  policiesPage
                    ? setSelectedPolicyId(option.id)
                    : setSelectedId(option.id)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();

                    if (policiesPage) {
                      setSelectedPolicyId(option.id);
                    } else {
                      setSelectedId(option.id);
                    }
                  }
                }}
                style={{
                  ...styles.option,

                  backgroundColor: isCompleted
                    ? "#2E7D32"
                    : option.color,

                  ...(isSelected
                    ? styles.optionSelected
                    : styles.optionUnselected),
                }}
              >
                <span style={styles.optionLabel}>
                  {option.label}
                </span>

                {isCompleted && (
                  <span
                    style={styles.completedCheckmark}
                    aria-label="Module completed"
                    title="Module completed"
                  >
                    ✓
                  </span>
                )}

                {policiesPage && policyDownloads[option.id] && (
                  <button
                    type="button"
                    aria-label={`Download PDFs for ${option.label}`}
                    title={`Download PDFs for ${option.label}`}
                    onClick={(event) =>
                      handleDownload(event, option.id)
                    }
                    style={styles.downloadButton}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 3V15"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />

                      <path
                        d="M7 11L12 16L17 11"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M5 20H19"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div style={styles.stickyFooter}>
        {policiesPage ? (
          <div style={styles.splitButtonContainer}>
            <button
              type="button"
              onClick={handleBack}
              style={{
                ...styles.startButton,
                ...styles.backButton,
              }}
            >
              <span style={styles.arrowLeft}>←</span>
              Back
            </button>

            <button
              type="button"
              onClick={handleStart}
              disabled={isContinueDisabled}
              style={{
                ...styles.startButton,
                opacity: isContinueDisabled ? 0.5 : 1,
                cursor: isContinueDisabled
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              Continue
              <span style={styles.arrow}>→</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleStart}
            disabled={isContinueDisabled}
            style={{
              ...styles.startButton,
              opacity: isContinueDisabled ? 0.5 : 1,
              cursor: isContinueDisabled
                ? "not-allowed"
                : "pointer",
            }}
          >
            Continue
            <span style={styles.arrow}>→</span>
          </button>
        )}
      </div>

      {showCompletedPopup && (
        <div
          style={styles.modalOverlay}
          role="presentation"
          onClick={() => setShowCompletedPopup(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="completed-module-title"
            style={styles.modal}
            onClick={(event) => event.stopPropagation()}
          >
            <div style={styles.modalAccent} />

            <div style={styles.modalIcon}>
              ✓
            </div>

            <h2
              id="completed-module-title"
              style={styles.modalTitle}
            >
              Module Completed!
            </h2>

            <p style={styles.modalText}>
              You have already completed the Information Systems
              Onboarding module.
            </p>

            <p style={styles.modalSubtext}>
              You can restart the module or download your completion
              certificate.
            </p>

            <div style={styles.modalButtons}>
              <button
                type="button"
                onClick={handleRestartModule}
                style={{
                  ...styles.modalButton,
                  ...styles.restartButton,
                }}
              >
                Restart Module
              </button>

              <button
                type="button"
                onClick={handleDownloadCertificate}
                style={{
                  ...styles.modalButton,
                  ...styles.certificateButton,
                }}
              >
                Download Certificate
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowCompletedPopup(false)}
              style={styles.closeButton}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    height: "100vh",
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    background:
      "linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #f5f3ff 100%)",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },

  header: {
    width: "100%",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "60px 24px 0",
    boxSizing: "border-box",
  },

  titleContainer: {
    textAlign: "center",
    marginTop: "10px",
  },

  title: {
    margin: 0,
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
    lineHeight: 1.1,
    fontWeight: 800,
    letterSpacing: "-0.04em",
    color: "#111827",
  },

  name: {
    color: "#9b7db5",
  },

  contentHeader: {
    width: "100%",
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    marginTop: "30px",
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
    margin: "0 0 20px",
    fontSize: "1rem",
    fontWeight: 700,
    color: "#4b5563",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  },

  optionsScrollArea: {
    width: "100%",
    maxWidth: "600px",
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
    overflowX: "hidden",
    boxSizing: "border-box",
    padding: "0 24px 120px",
    scrollbarWidth: "thin",
  },

  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    width: "100%",
    paddingTop: "4px",
  },

  option: {
    width: "100%",
    minHeight: "72px",
    padding: "18px 24px",
    borderWidth: "3px",
    borderStyle: "solid",
    borderColor: "transparent",
    borderRadius: "20px",
    color: "white",
    fontSize: "1.15rem",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    boxSizing: "border-box",
    transition:
      "transform 0.18s ease, box-shadow 0.18s ease, border 0.18s ease",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.10)",
    cursor: "pointer",
    flexShrink: 0,
  },

  optionSelected: {
    transform: "scale(1.025)",
    borderColor: "white",
    boxShadow: "0 12px 28px rgba(0, 0, 0, 0.18)",
  },

  optionUnselected: {
    transform: "scale(1)",
  },

  optionLabel: {
    flex: 1,
    minWidth: 0,
  },

  completedCheckmark: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.20)",
    border: "2px solid rgba(255, 255, 255, 0.9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    fontWeight: 900,
    color: "white",
    flexShrink: 0,
    marginLeft: "16px",
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
