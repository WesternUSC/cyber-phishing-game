import React, { useEffect, useState } from "react";

type Slide = 'eso' | 'policies' | 'cs' | 'accessibility' | 'conflict' | 'disc' | 'early';

interface Module {
  name: string;
  score: number;
  questionCount: number;
  page: Slide;
}

interface ModuleTableOfContentsProps {
  title: string;
  setCurrentSlides: React.Dispatch<React.SetStateAction<Slide>>;
}

const modules: Omit<Module, "score">[] = [
    {
        name: "Employee Security Onboarding",
        questionCount: 0,
        page: "eso"
    },
    {
        name: "Acceptable Use Policy",
        questionCount: 5,
        page: "policies"
    },
    {
        name: "Accessibility for Customer Service Policy",
        questionCount: 5,
        page: "cs"
    },
    {
        name: "Accessibility Policy",
        questionCount: 5,
        page: "accessibility"
    },
    {
        name: "Conflict of Interest Policy for USC Paid Employees",
        questionCount: 5,
        page: "conflict"
    },
    {
        name: "Discrimination Harassment and Violence Prevention Policy",
        questionCount: 5,
        page: "disc"
    },
    {
        name: "Discrimination Harassment and Violence Reporting Procedure",
        questionCount: 5,
        page: "eso"
    },
    {
        name: "Early and Safe Return to Work Policy",
        questionCount: 5,
        page: "early"
    },
    {
        name: "Emergency Preparedness Policy",
        questionCount: 5,
        page: "eso"
    },
    {
        name: "Hazard Reporting Policy",
        questionCount: 5,
        page: "eso"
    },
    {
        name: "Health and Safety Responsibilities of Managers & Supervisors Policy",
        questionCount: 5,
        page: "eso"
    },
    {
        name: "Health and Safety Responsibilities of Workers (including Supplied Labour) Policy",
        questionCount: 5,
        page: "eso"
    },
    {
        name: "Health and Safety Work Refusal Policy",
        questionCount: 5,
        page: "eso"
    },
    {
        name: "Housekeeping and Organizing Policy",
        questionCount: 5,
        page: "eso"
    },
    {
        name: "Injury/Illness Reporting Policy",
        questionCount: 5,
        page: "eso"
    },
    {
        name: "Media Spokesperson Policy",
        questionCount: 5,
        page: "eso"
    },
    {
        name: "Right to Disconnect Policy for USC Paid Employees",
        questionCount: 5,
        page: "eso"
    },
    {
        name: "Social Media Policy",
        questionCount: 5,
        page: "eso"
    },
    {
        name: "Visitor Policy",
        questionCount: 5,
        page: "eso"
    },
    {
        name: "Whistleblower Policy",
        questionCount: 5,
        page: "eso"
    },
    {
        name: "Workplace Conduct Policy",
        questionCount: 5,
        page: "eso"
    },
    {
        name: "Professional Development Procedure",
        questionCount: 5,
        page: "eso"
    },
    {
        name: "Short Term Flexibility Procedure",
        questionCount: 5,
        page: "eso"
    },
    {
        name: "Financial Approvals and Purchasing Procedure",
        questionCount: 5,
        page: "eso"
    },
]

export default function ModuleTableOfContents({
  title,
  setCurrentSlides,
}: ModuleTableOfContentsProps) {
  const [scores, setScores] = useState<Record<string, number>>({});

  useEffect(() => {
    const acceptableUseScore = Number(
      localStorage.getItem("acceptable-use-score") || "0"
    );

    const csScore = Number(
      localStorage.getItem("cs-score") || "0"
    );

    const accessibilityScore = Number(
      localStorage.getItem("accessibility-score") || "0"
    );

    const conflictScore = Number(
      localStorage.getItem("conflict-score") || "0"
    );

    const discScore = Number(
      localStorage.getItem("disc-score") || "0"
    );

    const earlyScore = Number(
      localStorage.getItem("early-score") || "0"
    );

    setScores({
        "Acceptable Use Policy": acceptableUseScore,
        "Accessibility for Customer Service Policy": csScore,
        "Accessibility Policy": accessibilityScore,
        "Conflict of Interest Policy for USC Paid Employees": conflictScore,
        "Discrimination Harassment and Violence Prevention Policy": discScore,
        "Discrimination Harassment and Violence Reporting Procedure": acceptableUseScore,
        "Early and Safe Return to Work Policy": earlyScore,
        "Emergency Preparedness Policy": acceptableUseScore,
        "Hazard Reporting Policy": acceptableUseScore,
        "Health and Safety Responsibilities of Managers & Supervisors Policy": acceptableUseScore,
        "Health and Safety Responsibilities of Workers (including Supplied Labour) Policy": acceptableUseScore,
        "Health and Safety Work Refusal Policy": acceptableUseScore,
        "Housekeeping and Organizing Policy": acceptableUseScore,
        "Injury/Illness Reporting Policy": acceptableUseScore,
        "Media Spokesperson Policy": acceptableUseScore,
        "Right to Disconnect Policy for USC Paid Employees": acceptableUseScore,
        "Social Media Policy": acceptableUseScore,
        "Visitor Policy": acceptableUseScore,
        "Whistleblower Policy": acceptableUseScore,
        "Workplace Conduct Policy": acceptableUseScore,
        "Professional Development Procedure": acceptableUseScore,
        "Short Term Flexibility Procedure": acceptableUseScore,
        "Financial Approvals and Purchasing Procedure": acceptableUseScore,
    });
  }, []);

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
        padding: "3rem 4rem",
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
          gridTemplateColumns: "1fr 1fr",
          gridAutoRows: "1fr",
          gap: "0.6rem 1rem",
          flex: 1,
          minHeight: 0,
        }}
      >
        {modules.map((module, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlides(module.page)}
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
                gap: "0.75rem",
                minWidth: 0,
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
                flexShrink: 0,
                marginLeft: "1rem",
                fontSize: "0.85rem",
                color: "#ddd0e5",
                fontWeight: "600",
              }}
            >
              {scores[module.name] ?? 0} / {module.questionCount}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}