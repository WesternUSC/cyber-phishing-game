'use client';

import React, { useState } from "react";
import { CornerTab } from "./corner-tab";

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
  options?: TrainingOption[];
  policiesOptions?: TrainingOption[];
  setMadeSelection: React.Dispatch<React.SetStateAction<boolean>>;
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
  options = defaultOptions,
  policiesOptions = defaultOptionsPolicies,
  setMadeSelection,
  setSelectedSlides,
}: SelectionProps) {
  const [selectedId, setSelectedId] = useState(options[0]?.id ?? "");

  const [selectedPolicyId, setSelectedPolicyId] = useState(
    policiesOptions[0]?.id ?? ""
  );

  const [policiesPage, setPoliciesPage] = useState(false);

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

  const handleStart = () => {
    if (!policiesPage) {
      switch (selectedId) {
        case "1":
          setSelectedSlides("eso");
          setMadeSelection(true);
          break;

        case "2":
          setPoliciesPage(true);
          break;

        case "3":
          setSelectedSlides("job");
          setMadeSelection(true);
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
        case "1":
          setSelectedSlides("eso");
          break;

        case "2":
          setSelectedSlides("policies");
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

  return (
    <div style={styles.page}>
      <CornerTab
        label="Home"
        onHomeClick={() => {
          setMadeSelection(false);
          setPoliciesPage(false);
        }}
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
                  backgroundColor: option.color,
                  ...(isSelected
                    ? styles.optionSelected
                    : styles.optionUnselected),
                }}
              >
                <span style={styles.optionLabel}>
                  {option.label}
                </span>

                {policiesPage && policyDownloads[option.id] && (
                  <button
                    type="button"
                    aria-label={`Download PDFs for ${option.label}`}
                    title={`Download PDFs for ${option.label}`}
                    onClick={(event) => handleDownload(event, option.id)}
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
    border: "3px solid transparent",
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
};
