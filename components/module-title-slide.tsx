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

const scoreStorageKeys: Record<string, string> = {
  "Acceptable Use Policy": "acceptable-use-score",
  "Accessibility for Customer Service Policy": "cs-score",
  "Accessibility Policy": "accessibility-score",
  "Conflict of Interest Policy for USC Paid Employees": "conflict-score",
  "Discrimination Harassment and Violence Prevention Policy": "disc-score",
  "Early and Safe Return to Work Policy": "early-score",
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

  const [selectedModule, setSelectedModule] = useState<
    (typeof modules)[number] | null
  >(null);

  useEffect(() => {
    const loadedScores: Record<string, number> = {};

    modules.forEach((module) => {
      const storageKey = scoreStorageKeys[module.name];

      if (storageKey) {
        loadedScores[module.name] = Number(
          localStorage.getItem(storageKey) || "0"
        );
      } else {
        loadedScores[module.name] = 0;
      }
    });

    setScores(loadedScores);
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

  function handleModuleClick(module: (typeof modules)[number]) {
    const score = scores[module.name] ?? 0;
    const isComplete = score === module.questionCount;

    if (isComplete) {
      setSelectedModule(module);
      return;
    }

    onSlideSelect(module.page);
  }

  function restartModule() {
    if (!selectedModule) {
      return;
    }

    const storageKey = scoreStorageKeys[selectedModule.name];

    if (storageKey) {
      localStorage.removeItem(storageKey);
    }

    setSelectedModule(null);

    localStorage.setItem("currentSlideDeck", selectedModule.page);

    location.reload();
  }

  return (
    <>
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
            flexShrink: 0,
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
            gridTemplateColumns: "minmax(0, 1fr)",
            gridAutoRows: "minmax(56px, auto)",
            gap: "0.6rem",
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            paddingRight: "0.25rem",
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

            // const hasDownloads =
            //   policyId !== undefined &&
            //   policyDownloads[policyId] !== undefined;

            const hasDownloads = true;

            const score = scores[module.name] ?? 0;

            const isComplete = score === module.questionCount;

            return (
              <div
                key={module.name}
                role="button"
                tabIndex={0}
                onClick={() => handleModuleClick(module)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleModuleClick(module);
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  minHeight: "56px",
                  padding: "0.65rem 1rem",
                  boxSizing: "border-box",

                  backgroundColor: isComplete
                    ? "#3f8f5f"
                    : "rgba(255, 255, 255, 0.10)",

                  color: "#ffffff",

                  border: isComplete
                    ? "1px solid rgba(255, 255, 255, 0.45)"
                    : "1px solid rgba(255, 255, 255, 0.20)",

                  borderRadius: "6px",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: "0.95rem",
                  transition:
                    "background-color 0.2s ease, border-color 0.2s ease, transform 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isComplete
                    ? "#34784f"
                    : "rgba(155, 125, 181, 0.65)";

                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isComplete
                    ? "#3f8f5f"
                    : "rgba(255, 255, 255, 0.10)";

                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    minWidth: 0,
                    flex: "1 1 auto",
                    overflow: "hidden",
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

                      backgroundColor: isComplete
                        ? "#582c83"
                        : "#9b7db5",

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
                      fontWeight: isComplete ? "600" : "400",
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
                      color: "#ffffff",
                      fontWeight: "600",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {score} / {module.questionCount}
                  </span>

                  {hasDownloads && (
                    <button
                      type="button"
                      aria-label={`Download PDFs for ${module.name}`}
                      title={`Download PDFs for ${module.name}`}
                      onClick={(event) => {
                        event.stopPropagation();

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

      {selectedModule && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="repeat-module-title"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            padding: "1.5rem",

            backgroundColor: "rgba(0, 0, 0, 0.55)",
            backdropFilter: "blur(3px)",
          }}
          onClick={() => setSelectedModule(null)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "520px",

              backgroundColor: "#ffffff",
              color: "#333333",

              borderRadius: "12px",
              overflow: "hidden",

              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.35)",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              style={{
                backgroundColor: "#582c83",
                color: "#ffffff",
                padding: "1.25rem 1.5rem",
              }}
            >
              <h2
                id="repeat-module-title"
                style={{
                  margin: 0,
                  fontSize: "1.4rem",
                  fontWeight: 700,
                }}
              >
                Repeat Module?
              </h2>
            </div>

            <div
              style={{
                padding: "1.5rem",
              }}
            >
              <p
                style={{
                  margin: "0 0 0.75rem",
                  fontSize: "1rem",
                  lineHeight: 1.5,
                  fontWeight: 600,
                  color: "#582c83",
                }}
              >
                {selectedModule.name}
              </p>

              <p
                style={{
                  margin: "0 0 1.5rem",
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  color: "#555555",
                }}
              >
                You have already completed this module with a score of{" "}
                <strong>
                  {scores[selectedModule.name] ?? 0} /{" "}
                  {selectedModule.questionCount}
                </strong>
                .
                <br />
                <br />
                Would you like to repeat the module? Your current score will
                be cleared and you will start the module again.
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "0.75rem",
                  flexWrap: "wrap",
                }}
              >
                <button
                  type="button"
                  onClick={() => setSelectedModule(null)}
                  style={{
                    padding: "0.7rem 1.25rem",
                    borderRadius: "6px",
                    border: "2px solid #582c83",
                    backgroundColor: "#ffffff",
                    color: "#582c83",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    transition: "background-color 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f2edf6";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#ffffff";
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={restartModule}
                  style={{
                    padding: "0.7rem 1.25rem",
                    borderRadius: "6px",
                    border: "2px solid #582c83",
                    backgroundColor: "#582c83",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    transition:
                      "background-color 0.15s ease, transform 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#452066";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#582c83";
                  }}
                >
                  Restart Module
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}