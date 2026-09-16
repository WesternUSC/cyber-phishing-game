import React, { useEffect, useState } from "react";

export interface QuestionOption {
  label: string;
  text: string;
}

interface MultipleChoiceQuestionProps {
  questionId: string;
  question: string;
  options: QuestionOption[];
  correctAnswer: string;
  explanation: string;
  category: string;
}

// reset question progress:
/*
localStorage.removeItem("cybersecurity-training-score");
localStorage.removeItem("cybersecurity-training-answers");
*/

// access score anywhere:
/*
const score = Number(
  localStorage.getItem("cybersecurity-training-score") || "0"
);

<div>
  Score: {score} / 5
</div>
*/

let SCORE_KEY = "";
let ANSWERS_KEY = "";

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  questionId,
  question,
  options,
  correctAnswer,
  explanation,
  category,
}) => {
  switch (category) {
    case "acceptableUse":
      SCORE_KEY = "acceptable-use-score";
      ANSWERS_KEY = "acceptable-use-answers";
      break;

    case "customerService":
      SCORE_KEY = "cs-score";
      ANSWERS_KEY = "cs-answers";
      break;

    case "accessibility":
      SCORE_KEY = "accessibility-score";
      ANSWERS_KEY = "accessibility-answers";
      break;

    case "conflict":
      SCORE_KEY = "conflict-score";
      ANSWERS_KEY = "conflict-answers";
      break;

    default:
      SCORE_KEY = "acceptable-use-score";
      ANSWERS_KEY = "acceptable-use-answers";
      break;
  }

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  // load only the current answer
  useEffect(() => {
    const storedScore = localStorage.getItem(SCORE_KEY);

    if (storedScore) {
      setScore(Number(storedScore));
    } else {
      setScore(0);
    }

    const storedAnswers = localStorage.getItem(ANSWERS_KEY);

    if (storedAnswers) {
      try {
        const answers = JSON.parse(storedAnswers);

        setSelectedAnswer(answers[questionId] ?? null);
      } catch {
        setSelectedAnswer(null);
      }
    } else {
      setSelectedAnswer(null);
    }
  }, [questionId]);

  const handleAnswer = (answer: string) => {
    // prevent answering the same question multiple times
    if (selectedAnswer !== null) {
      return;
    }

    setSelectedAnswer(answer);

    // get all previously saved answers.
    let answers: Record<string, string> = {};

    const storedAnswers = localStorage.getItem(ANSWERS_KEY);

    if (storedAnswers) {
      try {
        answers = JSON.parse(storedAnswers);
      } catch {
        answers = {};
      }
    }

    // saving current questions answer
    answers[questionId] = answer;

    localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));

    if (answer === correctAnswer) {
      const currentScore = Number(
        localStorage.getItem(SCORE_KEY) || "0"
      );

      const newScore = currentScore + 1;

      localStorage.setItem(SCORE_KEY, String(newScore));
      setScore(newScore);
    }
  };

  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "2rem 3rem",
        boxSizing: "border-box",
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            color: "#582c83",
            fontSize: "2.75rem",
          }}
        >
          KNOWLEDGE CHECK
        </h1>

        <div
          style={{
            marginTop: "0.75rem",
            height: "3px",
            width: "100%",
            backgroundColor: "#e2e8f0",
            borderRadius: "2px",
          }}
        />
      </div>

      <div
        style={{
          alignSelf: "flex-end",
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#f2eef7",
          color: "#582c83",
          borderRadius: "8px",
          fontWeight: 700,
        }}
      >
        Score: {score}
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: "1000px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            color: "#102e5a",
            fontSize: "1.6rem",
            lineHeight: 1.5,
            marginBottom: "2rem",
          }}
        >
          {question}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          {options.map((option) => {
            const isSelected = selectedAnswer === option.label;
            const isCorrectOption = option.label === correctAnswer;

            let backgroundColor = "#ffffff";
            let borderColor = "#e2e8f0";
            let textColor = "#334155";

            if (isAnswered) {
              if (isSelected && isCorrect) {
                backgroundColor = "#dcfce7";
                borderColor = "#22c55e";
                textColor = "#166534";
              } else if (isSelected && !isCorrect) {
                backgroundColor = "#fee2e2";
                borderColor = "#ef4444";
                textColor = "#991b1b";
              } else if (isCorrectOption) {
                backgroundColor = "#dcfce7";
                borderColor = "#22c55e";
                textColor = "#166534";
              }
            }

            return (
              <button
                key={option.label}
                onClick={() => handleAnswer(option.label)}
                disabled={isAnswered}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  padding: "1.25rem",
                  textAlign: "left",
                  backgroundColor,
                  border: `2px solid ${borderColor}`,
                  borderRadius: "12px",
                  color: textColor,
                  cursor: isAnswered ? "default" : "pointer",
                  fontSize: "1rem",
                  lineHeight: 1.5,
                  transition: "all 200ms ease",
                  opacity:
                    isAnswered &&
                    !isSelected &&
                    option.label !== correctAnswer
                      ? 0.7
                      : 1,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor:
                      isAnswered && option.label === correctAnswer
                        ? "#22c55e"
                        : isAnswered && isSelected
                        ? "#ef4444"
                        : "#f2eef7",
                    color:
                      isAnswered &&
                      (option.label === correctAnswer || isSelected)
                        ? "#ffffff"
                        : "#582c83",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  {option.label}
                </span>

                <span>{option.text}</span>
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div
            style={{
              marginTop: "1.5rem",
              padding: "1.25rem 1.5rem",
              borderRadius: "10px",
              backgroundColor: isCorrect ? "#f0fdf4" : "#fef2f2",
              borderLeft: `5px solid ${
                isCorrect ? "#22c55e" : "#ef4444"
              }`,
            }}
          >
            <div
              style={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: isCorrect ? "#166534" : "#991b1b",
                marginBottom: "0.5rem",
              }}
            >
              {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
            </div>

            <div
              style={{
                color: "#374151",
                lineHeight: 1.6,
              }}
            >
              {explanation}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
