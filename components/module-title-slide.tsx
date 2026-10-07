'use client';

import React, { useEffect, useState } from "react";
import { useApp } from "@/components/app-context";

type Slide =
  | "eso"
  | "policies"
  | "cs"
  | "accessibility"
  | "conflict"
  | "disc"
  | "early"
  | "job";

interface Module {
  name: string;
  score: number;
  questionCount: number;
  page: Slide;
}

interface ModuleTableOfContentsProps {
  title: string;
  currentSlideDeck: string;
}

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

const modules: Omit<Module, "score">[] = [
  {
    name: "Acceptable Use Policy",
    questionCount: 5,
    page: "policies",
  },
  {
    name: "Accessibility for Customer Service Policy",
    questionCount: 5,
    page: "cs",
  },
  {
    name: "Accessibility Policy",
    questionCount: 5,
    page: "accessibility",
  },
  {
    name: "Conflict of Interest Policy for USC Paid Employees",
    questionCount: 5,
    page: "conflict",
  },
  {
    name: "Discrimination Harassment and Violence Prevention Policy",
    questionCount: 5,
    page: "disc",
  },
  {
    name: "Discrimination Harassment and Violence Reporting Procedure",
    questionCount: 5,
    page: "eso",
  },
  {
    name: "Early and Safe Return to Work Policy",
    questionCount: 5,
    page: "early",
  },
  {
    name: "Emergency Preparedness Policy",
    questionCount: 5,
    page: "eso",
  },
  {
    name: "Hazard Reporting Policy",
    questionCount: 5,
    page: "eso",
  },
  {
    name: "Health and Safety Responsibilities of Managers & Supervisors Policy",
    questionCount: 5,
    page: "eso",
  },
  {
    name: "Health and Safety Responsibilities of Workers (including Supplied Labour) Policy",
    questionCount: 5,
    page: "eso",
  },
  {
    name: "Health and Safety Work Refusal Policy",
    questionCount: 5,
    page: "eso",
  },
  {
    name: "Housekeeping and Organizing Policy",
    questionCount: 5,
    page: "eso",
  },
  {
    name: "Injury/Illness Reporting Policy",
    questionCount: 5,
    page: "eso",
  },
  {
    name: "Media Spokesperson Policy",
    questionCount: 5,
    page: "eso",
  },
  {
    name: "Right to Disconnect Policy for USC Paid Employees",
    questionCount: 5,
    page: "eso",
  },
  {
    name: "Social Media Policy",
    questionCount: 5,
    page: "eso",
  },
  {
    name: "Visitor Policy",
    questionCount: 5,
    page: "eso",
  },
  {
    name: "Whistleblower Policy",
    questionCount: 5,
    page: "eso",
  },
  {
    name: "Workplace Conduct Policy",
    questionCount: 5,
    page: "eso",
  },
  {
    name: "Professional Development Procedure",
    questionCount: 5,
    page: "eso",
  },
  {
    name: "Short Term Flexibility Procedure",
    questionCount: 5,
    page: "eso",
  },
  {
    name: "Financial Approvals and Purchasing Procedure",
    questionCount: 5,
    page: "eso",
  },
];

export default function ModuleTableOfContents({
  title,
  currentSlideDeck,
}: ModuleTableOfContentsProps) {
  const { userData } = useApp();
  const [scores, setScores] = useState<Record<string, number>>({});

  useEffect(() => {
    const acceptableUseScore = Number(
      localStorage.getItem("acceptable-use-score") || "0"
    );

    const csScore = Number(localStorage.getItem("cs-score") || "0");

    const accessibilityScore = Number(
      localStorage.getItem("accessibility-score") || "0"
    );

    const conflictScore = Number(
      localStorage.getItem("conflict-score") || "0"
    );

    const discScore = Number(localStorage.getItem("disc-score") || "0");

    const earlyScore = Number(localStorage.getItem("early-score") || "0");

    setScores({
      "Acceptable Use Policy": acceptableUseScore,
      "Accessibility for Customer Service Policy": csScore,
      "Accessibility Policy": accessibilityScore,
      "Conflict of Interest Policy for USC Paid Employees": conflictScore,
      "Discrimination Harassment and Violence Prevention Policy": discScore,
      "Discrimination Harassment and Violence Reporting Procedure":
        acceptableUseScore,
      "Early and Safe Return to Work Policy": earlyScore,
      "Emergency Preparedness Policy": acceptableUseScore,
      "Hazard Reporting Policy": acceptableUseScore,
      "Health and Safety Responsibilities of Managers & Supervisors Policy":
        acceptableUseScore,
      "Health and Safety Responsibilities of Workers (including Supplied Labour) Policy":
        acceptableUseScore,
      "Health and Safety Work Refusal Policy": acceptableUseScore,
      "Housekeeping and Organizing Policy": acceptableUseScore,
      "Injury/Illness Reporting Policy": acceptableUseScore,
      "Media Spokesperson Policy": acceptableUseScore,
      "Right to Disconnect Policy for USC Paid Employees":
        acceptableUseScore,
      "Social Media Policy": acceptableUseScore,
      "Visitor Policy": acceptableUseScore,
      "Whistleblower Policy": acceptableUseScore,
      "Workplace Conduct Policy": acceptableUseScore,
      "Professional Development Procedure": acceptableUseScore,
      "Short Term Flexibility Procedure": acceptableUseScore,
      "Financial Approvals and Purchasing Procedure": acceptableUseScore,
    });
  }, []);

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

  function onSlideSelect(modulePage: string) {
    localStorage.setItem("currentSlideDeck", modulePage);
    location.reload();
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        backgroundColor: "#582c83",
        color: "#ffffff",
        boxSizing: "border-box",
        padding: "2rem clamp(1rem, 3vw, 4rem)",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        <h1
          style={{
            fontSize: "3.5rem",
            margin: 0,
            fontWeight: "bold",
          }}
        >
          {title}
        </h1>

        <div
          style={{
            width: "80px",
            height: "4px",
            backgroundColor: "#9b7db5",
            borderRadius: "2px",
            margin: "1rem auto 0",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gridAutoRows: "1fr",
          gap: "0.6rem 1rem",
          flex: 1,
          minHeight: 0,
        }}
      >
        {modules.map((module, index) => {
          const policyId = Object.entries({
            "Acceptable Use Policy": "2",
            "Accessibility for Customer Service Policy": "3",
            "Accessibility Policy": "4",
            "Conflict of Interest Policy for USC Paid Employees": "5",
            "Discrimination Harassment and Violence Prevention Policy": "6",
            "Early and Safe Return to Work Policy": "8",
          }).find(([name]) => name === module.name)?.[1];

          //const hasDownloads = policyId !== undefined && policyDownloads[policyId] !== undefined;

          const hasDownloads = true;

          return (
            <div
              key={index}
              role="button"
              onClick={() => onSlideSelect(module.page)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                minHeight: 0,
                padding: "0.65rem 1rem",
                backgroundColor: "rgba(255, 255, 255, 0.10)",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.20)",
                borderRadius: "6px",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "0.95rem",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(155, 125, 181, 0.65)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.10)";
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  minWidth: 0,
                  flex: "1 1 auto",
                  overflow: "hidden"
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "28px",
                    height: "28px",
                    flexShrink: 0,
                    backgroundColor: "#9b7db5",
                    borderRadius: "50%",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                  }}
                >
                  {index + 1}
                </span>

                <span
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {module.name}
                </span>
              </span>

              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "0.4rem",
                  flexShrink: 0,
                  marginLeft: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "#ddd0e5",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                  }}
                >
                  {scores[module.name] ?? 0} / {module.questionCount}
                </span>

                {hasDownloads && (
                  <button
                    type="button"
                    aria-label={`Download PDFs for ${module.name}`}
                    title={`Download PDFs for ${module.name}`}
                    onClick={(event) => {
                      if (policyId) {
                        handleDownload(event, policyId);
                      }
                    }}
                    style={{
                      width: "32px",
                      height: "32px",
                      padding: 0,
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
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.28)";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.15)";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
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
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
