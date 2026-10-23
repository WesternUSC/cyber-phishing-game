
"use client";

import React, { useState } from "react";

type BookSlide = {
  title: string;
  content: React.ReactNode;
  isMultipleChoice?: boolean;
  quizScoreKey?: string;
  quizAnswersKey?: string;
  isCertificate?: boolean;
  isScribe?: boolean;
};

type BookSlideViewerProps = {
  slides: BookSlide[];
  initialSlide?: number;
  policyTitle: string;
};

export default function BookSlideViewer({
  slides,
  initialSlide = 0,
  policyTitle
}: BookSlideViewerProps) {
  const [currentPage, setCurrentPage] = useState(
    Math.max(0, Math.min(initialSlide, Math.max(0, slides.length - 1)))
  );

  const leftSlide = slides[currentPage];
  const rightSlide = slides[currentPage + 1];

  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);

  const [current, setCurrent] = useState(initialSlide);
  const [slideStartedAt, setSlideStartedAt] = useState(Date.now());

  const [seenSlides, setSeenSlides] = useState<Set<number>>(
    new Set([initialSlide])
  );

  const [flipDirection, setFlipDirection] = useState<
    "next" | "previous" | null
  >(null);

  const [flipFromIndex, setFlipFromIndex] = useState<number | null>(null);
  const [flipToIndex, setFlipToIndex] = useState<number | null>(null);
  
  const animateToPage = (
    nextIndex: number,
    direction: "next" | "previous"
  ) => {
    if (flipDirection !== null) return;

    const fromIndex =
      direction === "next"
        ? currentPage + 1
        : currentPage;

    const toIndex =
      direction === "next"
        ? currentPage + 2
        : currentPage - 1;

    setFlipFromIndex(fromIndex);
    setFlipToIndex(toIndex);
    setFlipDirection(direction);

    window.setTimeout(() => {
      setCurrentPage(nextIndex);
      setCurrent(nextIndex);
      setSlideStartedAt(Date.now());

      setSeenSlides((previous) => {
        const updated = new Set(previous);
        updated.add(nextIndex);
        updated.add(nextIndex + 1);
        return updated;
      });

      setFlipDirection(null);
      setFlipFromIndex(null);
      setFlipToIndex(null);
    }, 700);
  };

  const getQuizSlides = () => {
    return slides
      .map((slide, index) => ({
        slide,
        index
      }))
      .filter(({ slide }) => slide.isMultipleChoice);
  };

  const getQuizResult = () => {
    const quizSlides = getQuizSlides();

    if (quizSlides.length === 0) {
      return {
        isQuiz: false,
        score: 0,
        totalQuestions: 0,
        percentage: 100,
        firstQuizSlideIndex: -1
      };
    }

    const firstQuizSlide = quizSlides[0].slide;

    const scoreKey = firstQuizSlide.quizScoreKey;

    const answersKey = firstQuizSlide.quizAnswersKey;

    if (!scoreKey || !answersKey) {
      console.warn(
        "Multiple-choice slides require quizScoreKey and quizAnswersKey."
      );

      return {
        isQuiz: false,
        score: 0,
        totalQuestions: 0,
        percentage: 100,
        firstQuizSlideIndex: quizSlides[0].index
      };
    }

    const score = Number(
      localStorage.getItem(scoreKey) || "0"
    );

    const storedAnswers = localStorage.getItem(answersKey);

    let answers: Record<string, string> = {};

    if (storedAnswers) {
      try {
        answers = JSON.parse(storedAnswers);
      } catch {
        answers = {};
      }
    }

    const totalQuestions = quizSlides.length;

    const answeredQuestions = Object.keys(answers).length;

    const percentage =
      totalQuestions > 0
        ? (score / totalQuestions) * 100
        : 100;

    return {
      isQuiz: true,
      score,
      totalQuestions,
      answeredQuestions,
      percentage,
      firstQuizSlideIndex: quizSlides[0].index,
      scoreKey,
      answersKey
    };
  };

  const finishedPolicy = () => {
    location.reload();
  }

  const resetQuiz = () => {
    const quiz = getQuizResult();

    if (!quiz.isQuiz || quiz.firstQuizSlideIndex < 0) {
      return;
    }

    if (quiz.scoreKey) {
      localStorage.removeItem(quiz.scoreKey);
    }

    if (quiz.answersKey) {
      localStorage.removeItem(quiz.answersKey);
    }

    setShowQuizModal(false);
    setShowCompletedModal(false);
    setIsTransitioning(true);

    setTimeout(() => {
      const firstQuizIndex = quiz.firstQuizSlideIndex;

      setCurrentPage(firstQuizIndex);
      setCurrent(firstQuizIndex);
      setSlideStartedAt(Date.now());

      setSeenSlides((previous) => {
        const updated = new Set(previous);
        updated.add(firstQuizIndex);
        return updated;
      });

      setIsTransitioning(false);
    }, 300);
  };

  const previousPage = () => {
    if (flipDirection !== null || currentPage === 0) return;

    const previousIndex = Math.max(0, currentPage - 2);
    animateToPage(previousIndex, "previous");
  };

  const nextPage = () => {
    if (flipDirection !== null) return;

    const nextIndex = Math.min(
      currentPage + 2,
      slides.length - 1
    );

    const visibleSlides = [
      slides[currentPage],
      slides[currentPage + 1],
    ].filter((slide): slide is BookSlide => Boolean(slide));

    const multipleChoiceSlides = slides
      .map((slide, index) => ({ slide, index }))
      .filter(({ slide }) => slide.isMultipleChoice);

    const lastMultipleChoiceSlide =
      multipleChoiceSlides[multipleChoiceSlides.length - 1];

    const containsLastQuizSlide = visibleSlides.some(
      (slide) =>
        slide.isMultipleChoice &&
        slides.indexOf(slide) === lastMultipleChoiceSlide?.index
    );

    if (containsLastQuizSlide && lastMultipleChoiceSlide) {
      const { quizScoreKey, quizAnswersKey } =
        lastMultipleChoiceSlide.slide;

      if (quizScoreKey && quizAnswersKey) {
        const score = Number(
          localStorage.getItem(quizScoreKey) || "0"
        );

        const storedAnswers = localStorage.getItem(quizAnswersKey);

        let answers: Record<string, string> = {};

        if (storedAnswers) {
          try {
            answers = JSON.parse(storedAnswers);
          } catch {
            answers = {};
          }
        }

        const totalQuestions = multipleChoiceSlides.length;
        const percentage =
          totalQuestions > 0 ? (score / totalQuestions) * 100 : 100;

        console.log("Quiz check:", {
          score,
          totalQuestions,
          percentage,
          answers,
        });

        if (percentage < 100) {
          setShowQuizModal(true);
          return;
        }

        setShowCompletedModal(true);
        return;
      }
    }

    animateToPage(nextIndex, "next");
  };

  if (slides.length === 0) return null;

  const flipFromSlide =
    flipDirection === "next"
      ? slides[currentPage - 2 + 1]
      : slides[currentPage + 1];

  const flipToSlide =
    flipDirection === "next"
      ? slides[currentPage - 1]
      : slides[currentPage];

  return (
    <div className="book-viewer">

      <h1 className="book-viewer__title">
        {policyTitle}
      </h1>

      <div className="book-viewer__book">
        <div className="book-viewer__page book-viewer__page--left">
          <div className="book-viewer__page-content">
            {flipDirection === "previous"
              ? slides[currentPage - 2]?.content
              : leftSlide?.content}
          </div>
        </div>

        <div className="book-viewer__seam" />

        <div className="book-viewer__page book-viewer__page--right">
          <div className="book-viewer__page-content">
            {flipDirection === "next"
              ? slides[currentPage + 3]?.content
              : rightSlide?.content}
          </div>
        </div>

        {flipDirection !== null && (
          <div
            className={`book-viewer__flip-sheet ${
              flipDirection === "next"
                ? "book-viewer__flip-sheet--next"
                : "book-viewer__flip-sheet--previous"
            }`}
          >
            <div className="book-viewer__flip-face book-viewer__flip-face--front">
              <div className="book-viewer__page-content">
                {flipFromIndex !== null
                  ? slides[flipFromIndex]?.content
                  : null}
              </div>
            </div>

            <div className="book-viewer__flip-face book-viewer__flip-face--back">
              <div className="book-viewer__page-content">
                {flipToIndex !== null
                  ? slides[flipToIndex]?.content
                  : null}
              </div>
            </div>
          </div>
        )}

        {showQuizModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>

              <div style={styles.modalTopBar} />

              <div style={styles.modalContent}>

                <div style={styles.warningIcon}>
                  !
                </div>

                <h2 style={styles.modalTitle}>
                  Knowledge Check Incomplete
                </h2>

                <p style={styles.modalText}>
                  You must achieve a score of <strong>100%</strong>{" "}
                  on the knowledge check before you can continue.
                </p>

                <p style={styles.modalSubtext}>
                  Your previous answers will be cleared and you
                  will return to the beginning of the knowledge
                  check.
                </p>

                <button
                  onClick={resetQuiz}
                  style={styles.retryButton}
                >
                  Retry Knowledge Check
                </button>

              </div>
            </div>
          </div>
        )}

        {showCompletedModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>

              <div style={styles.modalTopBar} />

              <div style={styles.modalContent}>

                <div style={styles.finishedIcon}>
                  ✓
                </div>

                <h2 style={styles.modalTitle}>
                  Knowledge Check Complete!
                </h2>

                <p style={styles.modalText}>
                  You have finished this policy.
                </p>

                <p style={styles.modalSubtext}>
                  Please continue to the next one.
                </p>

                <button
                  onClick={finishedPolicy}
                  style={styles.retryButton}
                >
                  Continue
                </button>

              </div>
            </div>
          </div>
        )}

      </div>

      <div className="book-viewer__toolbar">
        <button
          type="button"
          onClick={previousPage}
          disabled={currentPage === 0 || flipDirection !== null}
        >
          ← Previous
        </button>

        <span>
          Pages {currentPage + 1}
          {rightSlide ? `–${currentPage + 2}` : ""}
          {" of "}
          {slides.length}
        </span>

        <button
          type="button"
          onClick={nextPage}
          disabled={flipDirection !== null}
        >
          Next →
        </button>
      </div>

      <style>{`
        .book-viewer {
          width: 100%;
          height: 100vh;
          min-height: 600px;
          max-height: 900px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #f1edf5;
          box-sizing: border-box;
          padding: 12px;
          overflow: hidden;
          font-family: inherit;
        }

        .book-viewer__title {
          flex: 0 0 auto;
          width: 100%;
          margin: 0;
          padding: 8px 12px;
          text-align: center;
          font-size: 1.6rem;
          font-weight: 700;
          line-height: 1.3;
          color: #4F2683;
          box-sizing: border-box;
          overflow-wrap: anywhere;
        }

        .book-viewer__toolbar {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: #475569;
          font-size: 14px;
        }

        .book-viewer__toolbar button {
          padding: 9px 16px;
          border: 1px solid #d8cde5;
          border-radius: 8px;
          background: white;
          color: #582c83;
          font: inherit;
          font-weight: 600;
          cursor: pointer;
        }

        .book-viewer__toolbar button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .book-viewer__book {
          position: relative;
          flex: 0 0 auto;
          height: calc(100% - 115px);
          min-width: 0;
          min-height: 0;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 2px minmax(0, 1fr);
          overflow: hidden;
          border-radius: 6px;
          background: #fff;
          box-shadow: 0 8px 28px rgba(40, 25, 55, 0.15);
          perspective: 1800px;
        }

        .book-viewer__page {
          position: relative;
          width: 100%;
          height: 100%;
          min-width: 0;
          min-height: 0;
          overflow: hidden;
          background: #fff;
          box-sizing: border-box;
        }

        .book-viewer__page--left {
          box-shadow: inset -10px 0 14px -14px rgba(0, 0, 0, 0.45);
        }

        .book-viewer__page--right {
          box-shadow: inset 10px 0 14px -14px rgba(0, 0, 0, 0.45);
        }

        .book-viewer__page-content {
          width: 100%;
          height: 100%;
          min-width: 0;
          min-height: 0;
          overflow: auto;
          box-sizing: border-box;
        }

        .book-viewer__page-content > * {
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }

        .book-viewer__seam {
          z-index: 2;
          background: linear-gradient(
            to right,
            #d8d0df,
            #a99bb8,
            #e8e1ed
          );
        }

        .book-viewer__empty-page {
          width: 100%;
          height: 100%;
          background: #fff;
        }

        @media (max-width: 700px) {
          .book-viewer {
            height: 85dvh;
            min-height: 450px;
            max-height: none;
          }

          .book-viewer__book {
            grid-template-columns: minmax(0, 1fr);
          }

          .book-viewer__page--right,
          .book-viewer__seam {
            display: none;
          }

          .book-viewer__flip-sheet {
            width: 100%;
          }

          .book-viewer__flip-sheet--next {
            transform-origin: left center;
          }

          .book-viewer__flip-sheet--previous {
            transform-origin: right center;
          }
        }

        .book-viewer__flip-sheet {
          position: absolute;
          top: 0;
          bottom: 0;
          width: calc((100% - 2px) / 2);
          z-index: 5;
          transform-style: preserve-3d;
          perspective: 1800px;
          pointer-events: none;
          background: white;
        }

        .book-viewer__flip-sheet--next {
          right: 0;
          transform-origin: left center;
          animation: book-page-flip-next 700ms
            cubic-bezier(0.45, 0, 0.25, 1) forwards;
        }

        .book-viewer__flip-sheet--previous {
          left: 0;
          transform-origin: right center;
          animation: book-page-flip-previous 700ms
            cubic-bezier(0.45, 0, 0.25, 1) forwards;
        }

        .book-viewer__flip-face {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background: #fff;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          box-shadow: 0 0 18px rgba(0, 0, 0, 0.12);
        }

        .book-viewer__flip-face--front {
          z-index: 2;
        }

        .book-viewer__flip-face--back {
          transform: rotateY(180deg);
        }

        .book-viewer__flip-sheet--previous
          .book-viewer__flip-face--back {
          transform: rotateY(180deg);
        }

        @keyframes book-page-flip-next {
          0% {
            transform: rotateY(0deg);
          }

          45% {
            box-shadow: -12px 0 22px rgba(0, 0, 0, 0.15);
          }

          100% {
            transform: rotateY(-180deg);
          }
        }

        @keyframes book-page-flip-previous {
          0% {
            transform: rotateY(0deg);
          }

          45% {
            box-shadow: 12px 0 22px rgba(0, 0, 0, 0.15);
          }

          100% {
            transform: rotateY(180deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .book-viewer__flip-sheet--next,
          .book-viewer__flip-sheet--previous {
            animation-duration: 1ms;
          }
        }
      `}</style>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    padding: 20,
  },

  header: {
    marginBottom: 20,
  },

  slide: {
    flex: 1,
    padding: 20,
    overflowY: "auto",
    border: "1px solid #ddd",
    borderRadius: 6,
  },

  footer: {
    display: "flex",
    alignItems: "center",
    gap: 15,
    marginTop: 15,
  },

  progressContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },

  progressTrack: {
    width: "50%",
    height: 12,
    backgroundColor: "#e5e5e5",
    borderRadius: 999,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    backgroundColor: "#28a745",
    borderRadius: 999,
    transition: "width 0.3s ease",
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(20, 15, 30, 0.65)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: 20,
  },

  modal: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    overflow: "hidden",
    boxShadow: "0 25px 70px rgba(0, 0, 0, 0.3)",
  },

  modalTopBar: {
    height: 8,
    backgroundColor: "#4F2683",
  },

  modalContent: {
    padding: "40px 42px 42px",
    textAlign: "center",
  },

  warningIcon: {
    width: 58,
    height: 58,
    margin: "0 auto 20px",
    borderRadius: "50%",
    backgroundColor: "#FBBE00",
    color: "#4F2683",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    fontWeight: 800,
  },

  finishedIcon: {
    width: 58,
    height: 58,
    margin: "0 auto 20px",
    borderRadius: "50%",
    backgroundColor: "#17ff64",
    color: "#4F2683",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    fontWeight: 800,
  },

  modalTitle: {
    margin: "0 0 14px",
    color: "#4F2683",
    fontSize: "1.65rem",
    fontWeight: 700,
  },

  modalText: {
    margin: "0 auto 12px",
    maxWidth: 420,
    color: "#2d2d2d",
    fontSize: "1.05rem",
    lineHeight: 1.6,
  },

  modalSubtext: {
    margin: "0 auto 28px",
    maxWidth: 420,
    color: "#666666",
    fontSize: "0.92rem",
    lineHeight: 1.5,
  },

  retryButton: {
    width: "100%",
    padding: "14px 24px",
    border: "none",
    borderRadius: 8,
    backgroundColor: "#4F2683",
    color: "#ffffff",
    fontSize: "1rem",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(79, 38, 131, 0.25)",
  },
};