import React, { useState } from "react";

type TrainingOption = {
  id: string;
  label: string;
  color: string;
};

type SelectionProps = {
  playerName: string;
  options?: TrainingOption[];
  onStartTraining?: (selectedOption: TrainingOption) => void;
  setMadeSelection: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultOptions: TrainingOption[] = [
  {
    id: "1",
    label: "EMPLOYEE SECURITY ONBOARDING",
    color: "#582c83",
  },
  {
    id: "2",
    label: "PLACEHOLDER 1",
    color: "#582c83",
  },
  {
    id: "3",
    label: "PLACEHOLDER 2",
    color: "#582c83",
  },
  {
    id: "4",
    label: "PLACEHOLDER 3",
    color: "#582c83",
  },
];

export default function Selection({
  playerName,
  options = defaultOptions,
  onStartTraining,
  setMadeSelection
}: SelectionProps) {
  const [selectedId, setSelectedId] = useState(options[0]?.id ?? "");

  const selectedOption = options.find(
    (option) => option.id === selectedId
  );

  const handleStart = () => {
    if (selectedOption) {
      onStartTraining?.(selectedOption);
    }

    setMadeSelection(true);
  };

  return (
    <div style={styles.page}>
      <div style={styles.titleContainer}>
        <h1 style={styles.title}>
          Welcome, <span style={styles.name}>{playerName}</span>
        </h1>

        {/* <p style={styles.subtitle}>Select below</p> */}
      </div>

      <div style={styles.content}>
        <img
          src="usc-logo.png"
          alt="USC logo"
          style={styles.logo}
        />

        <p style={styles.chooseText}>Please select one</p>

        <div style={styles.optionsContainer}>
          {options.map((option) => {
            const isSelected = option.id === selectedId;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedId(option.id)}
                style={{
                  ...styles.option,
                  backgroundColor: option.color,
                  ...(isSelected
                    ? styles.optionSelected
                    : styles.optionUnselected),
                }}
              >
                <span>{option.label}</span>

                {isSelected && (
                  <span style={styles.checkmark}>✓</span>
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleStart}
          disabled={!selectedOption}
          style={{
            ...styles.startButton,
            opacity: selectedOption ? 1 : 0.5,
            cursor: selectedOption ? "pointer" : "not-allowed",
          }}
        >
          Begin
          <span style={styles.arrow}>→</span>
        </button>
      </div>
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
    alignItems: "center",
    padding: "60px 24px",
    background:
      "linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #f5f3ff 100%)",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
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

  subtitle: {
    marginTop: "14px",
    marginBottom: 0,
    fontSize: "1.15rem",
    color: "#6b7280",
  },

  content: {
    width: "100%",
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    marginTop: "30px",
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

  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
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
    justifyContent: "space-between",
    textAlign: "left",
    boxSizing: "border-box",
    transition:
      "transform 0.18s ease, box-shadow 0.18s ease, border 0.18s ease",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.10)",
  },

  optionSelected: {
    transform: "scale(1.025)",
    borderColor: "white",
    boxShadow: "0 12px 28px rgba(0, 0, 0, 0.18)",
  },

  optionUnselected: {
    transform: "scale(1)",
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

  startButton: {
    marginTop: "42px",
    width: "100%",
    minHeight: "76px",
    border: "none",
    borderRadius: "22px",
    background: "#111827",
    color: "white",
    fontSize: "1.25rem",
    fontWeight: 800,
    boxShadow: "0 12px 30px rgba(17, 24, 39, 0.25)",
    transition: "transform 0.18s ease, box-shadow 0.18s ease",
  },

  arrow: {
    marginLeft: "12px",
    fontSize: "1.5rem",
  },

  logo: {
    width: "80px",
    height: "auto",
    objectFit: "contain",
    alignSelf: "center",
    marginBottom: "20px",
  },

};
