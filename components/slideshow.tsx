'use client';

import React, { useState, useEffect } from "react";

interface Slide {
  title?: string;
  content: React.ReactNode;

  // Quiz configuration
  isMultipleChoice?: boolean;
  quizScoreKey?: string;
  quizAnswersKey?: string;
}

interface SlideshowProps {
  slides: Slide[];
  startSlide?: number;
  onLastSlide?: () => void;
  playerName: string;
}

// title slides that don't require 1 minute wait
const EXEMPT_SLIDES = new Set([0, 1, 5, 8, 11, 14, 18, 19]);

const WAIT_TIME = 0 * 1000;

const STORAGE_KEY = "slideshow-progress";

const INCIDENT_SLIDE_TITLE = "Incident Response & Reporting";
const CLOUD_SLIDE_TITLE = "Safe Cloud & File Sharing Rules";
const SETTINGS_SLIDE_TITLE = "Windows 11 Settings";

const Slideshow: React.FC<SlideshowProps> = ({
  slides,
  startSlide = 0,
  onLastSlide,
  playerName
}) => {
  const [current, setCurrent] = useState(startSlide);
  const [slideStartedAt, setSlideStartedAt] = useState(Date.now());

  const [seenSlides, setSeenSlides] = useState<Set<number>>(
    new Set([startSlide])
  );

  const [incidentSteps, setIncidentSteps] = useState(1);
  const [cloudSteps, setCloudSteps] = useState(1);
  const [settingsStep, setSettingsStep] = useState(1);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Quiz completion modal
  const [showQuizModal, setShowQuizModal] = useState(false);

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        setCurrent(parsed.current ?? startSlide);
        setSlideStartedAt(parsed.slideStartedAt ?? Date.now());

        setSeenSlides(
          new Set<number>(parsed.seenSlides ?? [startSlide])
        );

        setIncidentSteps(parsed.incidentSteps ?? 1);
        setCloudSteps(parsed.cloudSteps ?? 1);
        setSettingsStep(parsed.settingsStep ?? 1);

      } catch (error) {
        console.error("Failed to load slideshow progress:", error);
      }
    }

    setIsLoaded(true);
  }, [startSlide]);

  // Save slideshow progress
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        current,
        slideStartedAt,
        seenSlides: Array.from(seenSlides),
        incidentSteps,
        cloudSteps,
        settingsStep
      })
    );
  }, [
    isLoaded,
    current,
    slideStartedAt,
    seenSlides,
    incidentSteps,
    cloudSteps,
    settingsStep
  ]);

  const isExempt = (slideIndex: number) => {
    return EXEMPT_SLIDES.has(slideIndex);
  };

  const hasWaitedLongEnough = () => {
    if (isExempt(current)) {
      return true;
    }

    return Date.now() - slideStartedAt >= WAIT_TIME;
  };

  /*
   * ---------------------------------------------------------
   * Keyboard navigation
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't allow keyboard navigation while quiz popup is open
      if (showQuizModal) {
        return;
      }

      const target = event.target as HTMLElement;

      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (event.key === "ArrowRight" || event.key === " ") {
        next();
      }

      if (event.key === "ArrowLeft") {
        previous();
      }

      // Debug: remove in production
      if (event.key.toLowerCase() === "s") {
        setCurrent(slides.length - 2);

        const allSlidesSeen = seenSlides.size === slides.length;

        if (!allSlidesSeen) {
          const nextSlide = slides.length - 1;

          const allSlidesSeen = new Set(
            slides.map((_, index) => index)
          );

          setSeenSlides(allSlidesSeen);

          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
              current: nextSlide,
              slideStartedAt: Date.now(),
              seenSlides: Array.from(allSlidesSeen),
              incidentSteps,
              cloudSteps,
              settingsStep
            })
          );

          onLastSlide?.();
          return;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    current,
    seenSlides,
    incidentSteps,
    cloudSteps,
    settingsStep,
    showQuizModal
  ]);

  /*
   * ---------------------------------------------------------
   * Slide navigation
   * ---------------------------------------------------------
   */

  const changeSlide = (newIndex: number) => {
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrent(newIndex);
      setSlideStartedAt(Date.now());

      if (slides[newIndex]?.title === CLOUD_SLIDE_TITLE) {
        setCloudSteps(1);
      }

      if (slides[newIndex]?.title === SETTINGS_SLIDE_TITLE) {
        setSettingsStep(1);
      }

      setSeenSlides((previous) => {
        const updated = new Set(previous);
        updated.add(newIndex);
        return updated;
      });

      setIsTransitioning(false);
    }, 300);
  };

  const previous = () => {
    if (current === 0 || isTransitioning || showQuizModal) {
      return;
    }

    changeSlide(current - 1);
  };

  /*
   * ---------------------------------------------------------
   * Quiz handling
   * ---------------------------------------------------------
   */

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

    /*
     * All quiz slides in the same quiz should use the same
     * score/answers keys.
     */
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

    /*
     * Number of questions is based on the number of quiz slides.
     */
    const totalQuestions = quizSlides.length;

    /*
     * If you have answered fewer questions than exist,
     * don't allow completion yet.
     */
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

  const resetQuiz = () => {
    const quiz = getQuizResult();

    if (!quiz.isQuiz) {
      return;
    }

    if (quiz.scoreKey) {
      localStorage.removeItem(quiz.scoreKey);
    }

    if (quiz.answersKey) {
      localStorage.removeItem(quiz.answersKey);
    }

    /*
     * Reset quiz-related state.
     */
    setShowQuizModal(false);

    /*
     * Go to the first multiple-choice question.
     */
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrent(quiz.firstQuizSlideIndex);
      setSlideStartedAt(Date.now());

      setSeenSlides((previous) => {
        const updated = new Set(previous);

        /*
         * Keep previous slide history, but make sure
         * the first quiz slide is marked as seen.
         */
        updated.add(quiz.firstQuizSlideIndex);

        return updated;
      });

      setIsTransitioning(false);
    }, 300);
  };

  /*
   * ---------------------------------------------------------
   * Next button
   * ---------------------------------------------------------
   */

  const next = () => {
    console.log("clicked next");
    if (
      (
        current === slides.length - 1 &&
        !slides[current]?.isMultipleChoice
      ) ||
      isTransitioning ||
      showQuizModal
    ) {
      return;
    }

    // Special interactive slide logic
    const isIncidentSlide =
      slides[current].title === INCIDENT_SLIDE_TITLE;

    if (isIncidentSlide && incidentSteps < 4) {
      setIncidentSteps((previous) => previous + 1);
      return;
    }

    const isCloudSlide =
      slides[current].title === CLOUD_SLIDE_TITLE;

    if (isCloudSlide && cloudSteps < 3) {
      setCloudSteps((previous) => previous + 1);
      return;
    }

    const isSettingsSlide =
      slides[current].title === SETTINGS_SLIDE_TITLE;

    if (isSettingsSlide && settingsStep < 4) {
      setSettingsStep((previous) => previous + 1);
      return;
    }

    // Check wait time
    if (!hasWaitedLongEnough()) {
      window.alert(
        "You must wait at least one minute on this slide before proceeding."
      );
      return;
    }

    /*
    * -------------------------------------------------------
    * KNOWLEDGE CHECK
    * -------------------------------------------------------
    */

    const currentSlide = slides[current];

    if (currentSlide.isMultipleChoice) {
      // Find all multiple-choice slides
      const multipleChoiceSlides = slides
        .map((slide, index) => ({
          slide,
          index
        }))
        .filter(({ slide }) => slide.isMultipleChoice);

      // Is this the final multiple-choice question?
      const lastMultipleChoiceSlide =
        multipleChoiceSlides[multipleChoiceSlides.length - 1];

      const isLastMultipleChoiceSlide =
        lastMultipleChoiceSlide?.index === current;

      if (isLastMultipleChoiceSlide) {
        const scoreKey = currentSlide.quizScoreKey;
        const answersKey = currentSlide.quizAnswersKey;

        if (scoreKey && answersKey) {
          const score = Number(
            localStorage.getItem(scoreKey) || "0"
          );

          const storedAnswers =
            localStorage.getItem(answersKey);

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
            totalQuestions > 0
              ? (score / totalQuestions) * 100
              : 100;

          console.log("Quiz check:", {
            score,
            totalQuestions,
            percentage,
            answers
          });

          // NOT 100% -> show popup
          if (percentage < 100) {
            setShowQuizModal(true);
            return;
          }
        }
      }
    }

    /*
    * -------------------------------------------------------
    * NORMAL SLIDE NAVIGATION
    * -------------------------------------------------------
    */

    if (current === slides.length - 2) {
      const allSlidesSeen = seenSlides.size === slides.length;

      if (!allSlidesSeen) {
        const nextSlide = current + 1;

        const updatedSeenSlides = new Set(seenSlides);
        updatedSeenSlides.add(nextSlide);

        setSeenSlides(updatedSeenSlides);

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            current: nextSlide,
            slideStartedAt: Date.now(),
            seenSlides: Array.from(updatedSeenSlides),
            incidentSteps,
            cloudSteps,
            settingsStep
          })
        );

        onLastSlide?.();
        return;
      }
    }

    changeSlide(current + 1);
  };

  /*
   * ---------------------------------------------------------
   * Progress
   * ---------------------------------------------------------
   */

  const progress =
    slides.length > 1
      ? (current / (slides.length - 1)) * 100
      : 100;

  if (slides.length === 0) {
    return null;
  }

  /*
   * ---------------------------------------------------------
   * Render
   * ---------------------------------------------------------
   */

  return (
    <div style={styles.container}>

      <div style={styles.header}>
        {playerName}
      </div>

      <div
        style={{
          ...styles.slide,
          opacity: isTransitioning ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        {slides[current].title === INCIDENT_SLIDE_TITLE &&
        React.isValidElement(slides[current].content)
          ? React.cloneElement(
              slides[current].content as React.ReactElement<{
                visibleSteps: number;
              }>,
              { visibleSteps: incidentSteps }
            )
          : slides[current].title === CLOUD_SLIDE_TITLE &&
            React.isValidElement(slides[current].content)
          ? React.cloneElement(
              slides[current].content as React.ReactElement<{
                cloudSteps: number;
              }>,
              { cloudSteps }
            )
          : slides[current].title === SETTINGS_SLIDE_TITLE &&
            React.isValidElement(slides[current].content)
          ? React.cloneElement(
              slides[current].content as React.ReactElement<{
                settingsStep: number;
              }>,
              { settingsStep }
            )
          : slides[current].content}
      </div>

      <div style={styles.footer}>
        <button
          onClick={previous}
          disabled={current === 0 || showQuizModal}
        >
          Previous
        </button>

        <div style={styles.progressContainer}>
          <div style={styles.progressTrack}>
            <div
              style={{
                ...styles.progressBar,
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <button
          onClick={next}
          disabled={
            (
              current === slides.length - 1 &&
              !slides[current]?.isMultipleChoice
            ) ||
            showQuizModal
          }
        >
          Next
        </button>

      </div>

      {/* =====================================================
          QUIZ FAILURE MODAL
          ===================================================== */}

      {showQuizModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>

            {/* Western accent */}
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
    </div>
  );
};

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

  /*
   * ---------------------------------------------------------
   * Western University themed modal
   * ---------------------------------------------------------
   */

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

export default Slideshow;
