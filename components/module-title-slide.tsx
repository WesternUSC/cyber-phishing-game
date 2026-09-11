import React from "react";

type Slide = "eso" | "policies" | "job" | "culture";

interface ModuleTableOfContentsProps {
  title: string;
  setCurrentSlides: React.Dispatch<React.SetStateAction<Slide>>;
}

const modules = [
    {
        name: "Employee Security Onboarding",
        score: "0",
        questionCount: "0"
    },
    {
        name: "Acceptable Use Policy",
        score: Number(localStorage.getItem("acceptable-use-score") || "0"),
        questionCount: "5"
    },
    {
        name: "Accessibility for Customer Service Policy",
        score: Number(localStorage.getItem("acceptable-use-score") || "0"),
        questionCount: "5"
    },
    {
        name: "Accessibility Policy",
        score: Number(localStorage.getItem("acceptable-use-score") || "0"),
        questionCount: "5"
    },
    {
        name: "Conflict of Interest Policy for USC Paid Employees",
        score: Number(localStorage.getItem("acceptable-use-score") || "0"),
        questionCount: "5"
    },
    {
        name: "Discrimination Harassment and Violence Prevention Policy",
        score: Number(localStorage.getItem("acceptable-use-score") || "0"),
        questionCount: "5"
    },
    {
        name: "Discrimination Harassment and Violence Reporting Procedure",
        score: Number(localStorage.getItem("acceptable-use-score") || "0"),
        questionCount: "5"
    },
    {
        name: "Early and Safe Return to Work Policy",
        score: Number(localStorage.getItem("acceptable-use-score") || "0"),
        questionCount: "5"
    },
    {
        name: "Emergency Preparedness Policy",
        score: Number(localStorage.getItem("acceptable-use-score") || "0"),
        questionCount: "5"
    },
    {
        name: "Hazard Reporting Policy",
        score: Number(localStorage.getItem("acceptable-use-score") || "0"),
        questionCount: "5"
    },
    {
        name: "Health and Safety Responsibilities of Managers & Supervisors Policy",
        score: Number(localStorage.getItem("acceptable-use-score") || "0"),
        questionCount: "5"
    },
    {
        name: "Health and Safety Responsibilities of Workers (including Supplied Labour) Policy",
        score: Number(localStorage.getItem("acceptable-use-score") || "0"),
        questionCount: "5"
    },
    {
        name: "Health and Safety Work Refusal Policy",
        score: Number(localStorage.getItem("acceptable-use-score") || "0"),
        questionCount: "5"
    },
    {
        name: "Housekeeping and Organizing Policy",
        score: Number(localStorage.getItem("acceptable-use-score") || "0"),
        questionCount: "5"
    },
    {
        name: "Injury/Illness Reporting Policy",
        score: Number(localStorage.getItem("acceptable-use-score") || "0"),
        questionCount: "5"
    },
    {
        name: "Media Spokesperson Policy",
        score: Number(localStorage.getItem("acceptable-use-score") || "0"),
        questionCount: "5"
    },
    {
        name: "Right to Disconnect Policy for USC Paid Employees",
        score: Number(localStorage.getItem("acceptable-use-score") || "0"),
        questionCount: "5"
    },
    {
        name: "Social Media Policy",
        score: Number(localStorage.getItem("acceptable-use-score") || "0"),
        questionCount: "5"
    },
    {
        name: "Visitor Policy",
        score: Number(localStorage.getItem("acceptable-use-score") || "0"),
        questionCount: "5"
    },
    {
        name: "Whistleblower Policy",
        score: Number(localStorage.getItem("acceptable-use-score") || "0"),
        questionCount: "5"
    },
    {
        name: "Workplace Conduct Policy",
        score: Number(localStorage.getItem("acceptable-use-score") || "0"),
        questionCount: "5"
    },
    {
        name: "Professional Development Procedure",
        score: Number(localStorage.getItem("acceptable-use-score") || "0"),
        questionCount: "5"
    },
    {
        name: "Short Term Flexibility Procedure",
        score: Number(localStorage.getItem("acceptable-use-score") || "0"),
        questionCount: "5"
    },
    {
        name: "Financial Approvals and Purchasing Procedure",
        score: Number(localStorage.getItem("acceptable-use-score") || "0"),
        questionCount: "5"
    },
]

export default function ModuleTableOfContents({
  title,
  setCurrentSlides,
}: ModuleTableOfContentsProps) {
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
            onClick={() => setCurrentSlides("eso")}
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
              {module.score} / {module.questionCount}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}