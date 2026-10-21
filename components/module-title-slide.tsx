'use client';

import React, { useEffect, useRef, useState } from "react";
import { useApp } from "@/components/app-context";

type Slide =
  | "eso"
  | "policies"
  | "cs"
  | "accessibility"
  | "conflict"
  | "disc"
  | "disc2"
  | "early"
  | "job"
  | "emergency"
  | "hazard"
  | "hsrm"
  | "hsrw"
  | "hswrp"
  | "housekeeping"
  | "injury"
  | "media"
  | "disconnect"
  | "social"
  | "visitor"
  | "whistleblower"
  | "workplace"
  | "prof";

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
  "9": [
    "/pdfs/Emergency Preparedness Policy.pdf",
    "/pdfs/Emergency_Preparedness_Policy_Summary_and_Quiz.pdf",
  ],
  "10": [
    "/pdfs/Hazard Reporting Policy.pdf",
    "/pdfs/Hazard_Reporting_Policy_Summary_and_Quiz.pdf",
  ],
  "11": [
    "/pdfs/Health and Safety Responsibilities of Managers and Supervisors Policy.pdf",
    "/pdfs/Health_and_Safety_Responsibilities_of_Managers_and_Supervisors_Policy_Summary_and_Quiz.pdf",
  ],
  "12": [
    "/pdfs/Health and Safety Responsibilities of Workers (Including Supplied Labour) Policy.pdf",
    "/pdfs/Health_and_Safety_Responsibilities_of_Workers_Including_Supplied_Labour_Policy_Summary_and_Quiz.pdf",
  ],
  "13": [
    "/pdfs/Health and Safety Work Refusal Policy.pdf",
    "/pdfs/Health_and_Safety_Work_Refusal_Policy_Summary_and_Quiz.pdf",
  ],
  "14": [
    "/pdfs/Housekeeping and Organizing Policy.pdf",
    "/pdfs/Housekeeping_and_Organizing_Policy_Summary_and_Quiz.pdf",
  ],
  "15": [
    "/pdfs/Injury and Illness Reporting Policy.pdf",
    "/pdfs/Injury_and_Illness_Reporting_Policy_Summary_and_Quiz.pdf",
  ],
  "16": [
    "/pdfs/Media Spokesperson Policy.pdf",
    "/pdfs/Media_Spokesperson_Policy_Summary_and_Quiz.pdf",
  ],
  "17": [
    "/pdfs/Right to Disconnect Policy for USC Paid Employees.pdf",
    "/pdfs/Right_to_Disconnect_Policy_for_USC_Paid_Employees_Summary_and_Quiz.pdf",
  ],
  "18": [
    "/pdfs/Social Media Policy.pdf",
    "/pdfs/Social_Media_Policy_Summary_and_Quiz.pdf",
  ],
  "19": [
    "/pdfs/Visitor Policy.pdf",
    "/pdfs/Visitor_Policy_Summary_and_Quiz.pdf",
  ],
  "20": [
    "/pdfs/Whistleblower Policy.pdf",
    "/pdfs/Whistleblower_Policy_Summary_and_Quiz.pdf",
  ],
  "21": [
    "/pdfs/Workplace Conduct Policy.pdf",
    "/pdfs/Workplace_Conduct_Policy_Summary_and_Quiz.pdf",
  ],
};

const scoreStorageKeys: Record<string, string> = {
  "Acceptable Use Policy": "acceptable-use-score",
  "Accessibility for Customer Service Policy": "cs-score",
  "Accessibility Policy": "accessibility-score",
  "Conflict of Interest Policy for USC Paid Employees": "conflict-score",
  "Discrimination Harassment and Violence Prevention Policy": "disc-score",
  "Discrimination Harassment and Violence Reporting Policy": "disc2-score",
  "Early and Safe Return to Work Policy": "early-score",
  "Emergency Preparedness Policy": "emergency-score",
  "Hazard Reporting Policy": "hazard-score",
  "Health and Safety Responsibilities of Managers & Supervisors Policy":
    "hsrm-score",
  "Health and Safety Responsibilities of Workers (Including Supplied Labour) Policy":
    "hsrw-score",
  "Health and Safety Work Refusal Policy": "hswrp-score",
  "Housekeeping and Organizing Policy": "housekeeping-score",
  "Injury/Illness Reporting Policy": "injury-score",
  "Media Spokesperson Policy": "media-score",
  "Right to Disconnect Policy for USC Paid Employees": "disconnect-score",
  "Social Media Policy": "social-score",
  "Visitor Policy": "visitor-score",
  "Whistleblower Policy": "whistleblower-score",
  "Workplace Conduct Policy": "workplace-score",
  "Professional Development Policy": "prof-score",
};

const policyIds: Record<string, string> = {
  "Acceptable Use Policy": "2",
  "Accessibility for Customer Service Policy": "3",
  "Accessibility Policy": "4",
  "Conflict of Interest Policy for USC Paid Employees": "5",
  "Discrimination Harassment and Violence Prevention Policy": "6",
  "Discrimination Harassment and Violence Reporting Policy": "7",
  "Early and Safe Return to Work Policy": "8",
  "Emergency Preparedness Policy": "9",
  "Hazard Reporting Policy": "10",
  "Health and Safety Responsibilities of Managers & Supervisors Policy": "11",
  "Health and Safety Responsibilities of Workers (Including Supplied Labour) Policy":
    "12",
  "Health and Safety Work Refusal Policy": "13",
  "Housekeeping and Organizing Policy": "14",
  "Injury/Illness Reporting Policy": "15",
  "Media Spokesperson Policy": "16",
  "Right to Disconnect Policy for USC Paid Employees": "17",
  "Social Media Policy": "18",
  "Visitor Policy": "19",
  "Whistleblower Policy": "20",
  "Workplace Conduct Policy": "21",
  "Professional Development Policy": "22",
};

const modules: Omit<Module, "score">[] = [
  { name: "Acceptable Use Policy", questionCount: 5, page: "policies" },
  {
    name: "Accessibility for Customer Service Policy",
    questionCount: 5,
    page: "cs",
  },
  { name: "Accessibility Policy", questionCount: 5, page: "accessibility" },
  {
    name: "Conflict of Interest Policy for USC Paid Employees",
    questionCount: 4,
    page: "conflict",
  },
  {
    name: "Discrimination Harassment and Violence Prevention Policy",
    questionCount: 7,
    page: "disc",
  },
  {
    name: "Discrimination Harassment and Violence Reporting Procedure",
    questionCount: 8,
    page: "disc2",
  },
  {
    name: "Early and Safe Return to Work Policy",
    questionCount: 7,
    page: "early",
  },
  {
    name: "Emergency Preparedness Policy",
    questionCount: 5,
    page: "emergency",
  },
  { name: "Hazard Reporting Policy", questionCount: 4, page: "hazard" },
  {
    name: "Health and Safety Responsibilities of Managers & Supervisors Policy",
    questionCount: 5,
    page: "hsrm",
  },
  {
    name: "Health and Safety Responsibilities of Workers (Including Supplied Labour) Policy",
    questionCount: 3,
    page: "hsrw",
  },
  {
    name: "Health and Safety Work Refusal Policy",
    questionCount: 5,
    page: "hswrp",
  },
  {
    name: "Housekeeping and Organizing Policy",
    questionCount: 5,
    page: "housekeeping",
  },
  {
    name: "Injury/Illness Reporting Policy",
    questionCount: 4,
    page: "injury",
  },
  { name: "Media Spokesperson Policy", questionCount: 4, page: "media" },
  {
    name: "Right to Disconnect Policy for USC Paid Employees",
    questionCount: 6,
    page: "disconnect",
  },
  { name: "Social Media Policy", questionCount: 5, page: "social" },
  { name: "Visitor Policy", questionCount: 4, page: "visitor" },
  { name: "Whistleblower Policy", questionCount: 4, page: "whistleblower" },
  { name: "Workplace Conduct Policy", questionCount: 5, page: "workplace" },
  {
    name: "Professional Development Procedure",
    questionCount: 4,
    page: "prof",
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

  const [currentPage, setCurrentPage] = useState(0);
  const [pageRows, setPageRows] = useState(4);

  const bookAreaRef = useRef<HTMLDivElement>(null);

  const modulesPerPage = pageRows * 2;
  const pageCount = Math.ceil(modules.length / modulesPerPage);

  const visibleModules = modules.slice(
    currentPage * modulesPerPage,
    (currentPage + 1) * modulesPerPage
  );

  useEffect(() => {
    const loadedScores: Record<string, number> = {};

    modules.forEach((module) => {
      const storageKey = scoreStorageKeys[module.name];

      loadedScores[module.name] = storageKey
        ? Number(localStorage.getItem(storageKey) || "0")
        : 0;
    });

    setScores(loadedScores);
  }, []);

  useEffect(() => {
    const container = bookAreaRef.current;

    if (!container) return;

    const updatePageRows = () => {
      const styles = window.getComputedStyle(container);
      const paddingTop = parseFloat(styles.paddingTop) || 0;
      const paddingBottom = parseFloat(styles.paddingBottom) || 0;

      const availableHeight =
        container.clientHeight - paddingTop - paddingBottom;

      // Reserve space for the book's top and bottom padding.
      const rowHeight = 56;
      const gap = 10;

      const rows = Math.max(
        1,
        Math.floor((availableHeight + gap) / (rowHeight + gap))
      );

      setPageRows((previous) => (previous === rows ? previous : rows));
    };

    const observer = new ResizeObserver(updatePageRows);

    observer.observe(container);
    updatePageRows();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, pageCount - 1));
  }, [pageCount]);

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
    if (!selectedModule) return;

    const storageKey = scoreStorageKeys[selectedModule.name];

    if (storageKey) {
      localStorage.removeItem(storageKey);
    }

    setSelectedModule(null);

    localStorage.setItem("currentSlideDeck", selectedModule.page);

    location.reload();
  }

  function renderModuleCard(
    module: (typeof modules)[number],
    index: number
  ) {
    const policyId = policyIds[module.name];
    const hasDownloads = true;

    const score = scores[module.name] ?? 0;
    const isComplete = score === module.questionCount;

    const moduleNumber = currentPage * modulesPerPage + index + 1;

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
          height: "100%",
          minHeight: 0,
          padding: "0.5rem 0.65rem",
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
          fontSize: "0.9rem",
          transition:
            "background-color 0.2s ease, border-color 0.2s ease, transform 0.15s ease",
          overflow: "hidden",
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.backgroundColor = isComplete
            ? "#34784f"
            : "rgba(155, 125, 181, 0.65)";

          event.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.backgroundColor = isComplete
            ? "#3f8f5f"
            : "rgba(255, 255, 255, 0.10)";

          event.currentTarget.style.transform = "translateY(0)";
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
              backgroundColor: isComplete ? "#582c83" : "#9b7db5",
              borderRadius: "50%",
              fontSize: "0.8rem",
              fontWeight: "bold",
            }}
          >
            {moduleNumber}
          </span>

          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontWeight: isComplete ? "600" : "400",
              flex: 1,
              minWidth: 0,
            }}
            title={module.name}
          >
            {module.name}
          </span>
        </span>

        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "0.35rem",
            flexShrink: 0,
            marginLeft: "0.35rem",
          }}
        >
          <span
            style={{
              fontSize: "0.8rem",
              color: "#ffffff",
              fontWeight: "600",
              whiteSpace: "nowrap",
            }}
          >
            {score}/{module.questionCount}
          </span>

          {hasDownloads && (
            <button
              type="button"
              aria-label={`Download PDFs for ${module.name}`}
              title={
                policyId
                  ? `Download PDFs for ${module.name}`
                  : `No PDFs configured for ${module.name}`
              }
              onClick={(event) => {
                event.stopPropagation();

                if (policyId) {
                  void handleDownload(event, policyId);
                }
              }}
              style={{
                width: "30px",
                height: "30px",
                padding: 0,
                border: "none",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: policyId ? "pointer" : "not-allowed",
                flexShrink: 0,
                opacity: policyId ? 1 : 0.45,
                transition: "background 0.18s ease, transform 0.18s ease",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.background =
                  "rgba(255, 255, 255, 0.28)";
                event.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background =
                  "rgba(255, 255, 255, 0.15)";
                event.currentTarget.style.transform = "scale(1)";
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
  }

  const leftPageModules = visibleModules.filter(
    (_, index) => index % 2 === 0
  );

  const rightPageModules = visibleModules.filter(
    (_, index) => index % 2 === 1
  );

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage >= pageCount - 1;

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
          padding: "1.25rem clamp(0.75rem, 3vw, 3rem)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "1rem",
            flexShrink: 0,
          }}
        >
          <h1
            style={{
              fontSize: "clamp(1.6rem, 4vw, 3rem)",
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
              margin: "0.75rem auto 0",
            }}
          />
        </div>

        <div
          ref={bookAreaRef}
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minHeight: 0,
            width: "100%",
            maxWidth: "1600px",
            margin: "0 auto",
            paddingBottom: "0.5rem",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "0.5rem",
              flex: 1,
              minHeight: 0,
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
                minHeight: 0,
                padding: "0.65rem",
                backgroundColor: "rgba(255, 255, 255, 0.07)",
                border: "1px solid rgba(255, 255, 255, 0.22)",
                borderRadius: "8px 3px 3px 8px",
                boxShadow: "inset -5px 0 10px rgba(0, 0, 0, 0.08)",
              }}
            >

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr)",
                  gridTemplateRows: `repeat(${pageRows}, minmax(0, 1fr))`,
                  gap: "0.6rem",
                  flex: 1,
                  minHeight: 0,
                }}
              >
                {leftPageModules.map((module, index) =>
                  renderModuleCard(module, index * 2)
                )}
              </div>

            </div>

            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "50%",
                width: "2px",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(255,255,255,0.18)",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
                minHeight: 0,
                padding: "0.65rem",
                backgroundColor: "rgba(255, 255, 255, 0.07)",
                border: "1px solid rgba(255, 255, 255, 0.22)",
                borderRadius: "3px 8px 8px 3px",
                boxShadow: "inset 5px 0 10px rgba(0, 0, 0, 0.08)",
              }}
            >

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr)",
                  gridTemplateRows: `repeat(${pageRows}, minmax(0, 1fr))`,
                  gap: "0.6rem",
                  flex: 1,
                  minHeight: 0,
                }}
              >
                {rightPageModules.map((module, index) =>
                  renderModuleCard(module, index * 2 + 1)
                )}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(0.5rem, 2vw, 1.5rem)",
              padding: "0.85rem 0 0.25rem",
              flexShrink: 0,
            }}
          >
            <button
              type="button"
              disabled={isFirstPage}
              onClick={() =>
                setCurrentPage((page) => Math.max(0, page - 1))
              }
              style={{
                padding: "0.6rem clamp(0.65rem, 2vw, 1.2rem)",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.4)",
                backgroundColor: isFirstPage
                  ? "rgba(255,255,255,0.06)"
                  : "#9b7db5",
                color: "#ffffff",
                cursor: isFirstPage ? "not-allowed" : "pointer",
                opacity: isFirstPage ? 0.45 : 1,
                fontWeight: 600,
                fontSize: "0.85rem",
              }}
            >
              ← Previous
            </button>

            <span
              style={{
                minWidth: "90px",
                textAlign: "center",
                fontSize: "0.85rem",
                fontWeight: 600,
              }}
            >
              Page {currentPage + 1} of {pageCount}
            </span>

            <button
              type="button"
              disabled={isLastPage}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(pageCount - 1, page + 1)
                )
              }
              style={{
                padding: "0.6rem clamp(0.65rem, 2vw, 1.2rem)",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.4)",
                backgroundColor: isLastPage
                  ? "rgba(255,255,255,0.06)"
                  : "#9b7db5",
                color: "#ffffff",
                cursor: isLastPage ? "not-allowed" : "pointer",
                opacity: isLastPage ? 0.45 : 1,
                fontWeight: 600,
                fontSize: "0.85rem",
              }}
            >
              Next →
            </button>
          </div>
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

            <div style={{ padding: "1.5rem" }}>
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
                  onMouseEnter={(event) => {
                    event.currentTarget.style.backgroundColor = "#f2edf6";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.backgroundColor = "#ffffff";
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
                  onMouseEnter={(event) => {
                    event.currentTarget.style.backgroundColor = "#452066";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.backgroundColor = "#582c83";
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
