'use client';

import React, {
  forwardRef,
  useCallback,
  useRef,
  useState,
} from "react";
import HTMLFlipBook from "react-pageflip";
import { useRouter } from 'next/navigation';

type PageProps = {
  number: number;
  title: string;
  children?: React.ReactNode;
  cover?: boolean;
};

const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ number, title, children, cover = false }, ref) => (
    <div
      ref={ref}
      className={`book-page ${cover ? "book-cover" : ""}`}
    >
      <div className="page-content">
        {cover ? (
          <div
            className="cover-content"
            style={{
                transform: "translateY(-20px)",
            }}
            >
            <img
                src="/freshservice-icons/usc.png"
                alt="USC Logo"
                width={200}
                height={200}
                style={{
                display: "block",
                margin: "0 auto",
                paddingBottom: "20px",
                objectFit: "contain",
                }}
            />

            <span className="cover-eyebrow">
                Policies & Procedures
            </span>

            <h2>{title}</h2>

            <p>USC</p>

            <span className="cover-hint">
                OPEN TO EXPLORE THE POLICY
            </span>
          </div>
        ) : (
          <>
            {children}
            <span className="page-number">{number}</span>
          </>
        )}
      </div>
    </div>
  )
);

Page.displayName = "Page";

type FlipBookSlide = {
  title: string;
  content: React.ReactNode;
  isMultipleChoice?: boolean;
  quizScoreKey?: string;
  quizAnswersKey?: string;
  isCertificate?: boolean;
  isScribe?: boolean;
};

type FlipBookSlideViewerProps = {
  slides: FlipBookSlide[];
  initialSlide?: number;
  policyTitle: string;
};

export default function FlipBookSlideViewer({
  slides,
  initialSlide = 0,
  policyTitle
}: FlipBookSlideViewerProps) {
  const bookRef = useRef<any>(null);
  //const [currentPage, setCurrentPage] = useState(0);

  const [currentPage, setCurrentPage] = useState(
    Math.max(0, Math.min(initialSlide, Math.max(0, slides.length - 1)))
  );

  const [current, setCurrent] = useState(initialSlide);
  const [slideStartedAt, setSlideStartedAt] = useState(Date.now());
  const [seenSlides, setSeenSlides] = useState<Set<number>>(
    new Set([initialSlide])
  );

  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);

  const [quizResetKey, setQuizResetKey] = useState(0);

  const [isFlipping, setIsFlipping] = useState(false);

  const router = useRouter();

  const onFlip = useCallback((event: { data: number }) => {
    setCurrentPage(event.data);
    setIsFlipping(false);
  }, []);

  const onChangeState = useCallback((event: { data: string }) => {
    setIsFlipping(event.data === "flipping");
  }, []);

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

    setQuizResetKey(prev => prev + 1);

    const firstQuizIndex = quiz.firstQuizSlideIndex;

    setCurrent(firstQuizIndex);
    setSlideStartedAt(Date.now());

    setSeenSlides((previous) => {
        const updated = new Set(previous);
        updated.add(firstQuizIndex);
        return updated;
    });

    // requestAnimationFrame(() => {
    //     bookRef.current?.pageFlip()?.flip(firstQuizIndex);
    // });

    const targetPageIndex = quiz.firstQuizSlideIndex + 1;

    bookRef.current?.pageFlip()?.turnToPage(targetPageIndex);
  };

  const finishedPolicy = () => {
    router.push("/policies");
  }

  const previousPage = () => {
    if (isFlipping) return;
    bookRef.current?.pageFlip()?.flipPrev();
  };

  const nextPage = () => {
    if (isFlipping) return;
    const pageFlip = bookRef.current?.pageFlip();

    if (!pageFlip) return;

    const currentIndex = pageFlip.getCurrentPageIndex();

    const quizSlides = slides
        .map((slide, index) => ({ slide, index }))
        .filter(({ slide }) => slide.isMultipleChoice);

    const lastQuizSlide = quizSlides[quizSlides.length - 1];

    if (lastQuizSlide) {
        const lastQuizPageIndex = lastQuizSlide.index + 1;

        const isLastQuizSlideVisible =
        currentIndex === lastQuizPageIndex ||
        currentIndex + 1 === lastQuizPageIndex;

        if (isLastQuizSlideVisible) {
        const { quizScoreKey, quizAnswersKey } = lastQuizSlide.slide;

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

            const totalQuestions = quizSlides.length;

            const percentage =
            totalQuestions > 0
                ? (score / totalQuestions) * 100
                : 100;

            if (percentage < 100) {
            setShowQuizModal(true);
            return;
            }
            
            setShowCompletedModal(true);
            return;
        }
        }
    }

    pageFlip.flipNext();
  };

  const totalPages = slides.length + 2;

  const bookWidth = 630;
  const bookHeight = 650;

  return (
    <main className="flipbook-shell">
      
      <div
        className="book-stage"
        style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            maxWidth: "1500px",
            margin: "0 auto",
        }}
        >
        <button
            onClick={previousPage}
            disabled={currentPage === 0}
            aria-label="Previous page"
            style={{
            position: "absolute",
            left: "0",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            border: "1px solid #ddd",
            backgroundColor: currentPage === 0 ? "#eee" : "#4F2683",
            color: currentPage === 0 ? "#999" : "#fff",
            fontSize: "26px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: currentPage === 0 ? "not-allowed" : "pointer",
            boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
            transition: "background-color 0.2s ease",
            padding: "0 0 4px 0",
            }}
        >
            &#8592;
        </button>

        <HTMLFlipBook
            ref={bookRef}
            width={bookWidth}
            height={bookHeight}
            size="stretch"
            minWidth={280}
            maxWidth={bookWidth}
            minHeight={380}
            maxHeight={bookHeight}
            drawShadow={true}
            flippingTime={900}
            usePortrait={true}
            startPage={0}
            startZIndex={0}
            autoSize={true}
            maxShadowOpacity={0.45}
            showCover={true}
            mobileScrollSupport={true}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={true}
            onFlip={onFlip}
            onChangeState={onChangeState}
            className="flipbook"
            style={{ margin: "0 auto" }}
        >
            <Page
            number={0}
            title={policyTitle}
            cover
            />

            {slides.map((page, index) => (
            <Page
                key={`${page.title}-${index}`}
                number={index + 1}
                title={page.title}
            >
                <div>
                {page.isMultipleChoice ? (
                    <React.Fragment key={quizResetKey}>
                    {page.content}
                    </React.Fragment>
                ) : (
                    page.content
                )}
                </div>
            </Page>
            ))}

            <Page
            number={totalPages - 1}
            title="The End"
            cover
            />
        </HTMLFlipBook>

        <button
            onClick={nextPage}
            disabled={currentPage >= totalPages - 1}
            aria-label="Next page"
            style={{
            position: "absolute",
            right: "0",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            border: "1px solid #ddd",
            backgroundColor:
                currentPage >= totalPages - 1 ? "#eee" : "#4F2683",
            color: currentPage >= totalPages - 1 ? "#999" : "#fff",
            fontSize: "26px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor:
                currentPage >= totalPages - 1 ? "not-allowed" : "pointer",
            boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
            transition: "background-color 0.2s ease",
            padding: "0 0 4px 0",
            }}
        >
            &#8594;
        </button>
      </div>

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

                <button
                    onClick={() => router.push("/home")}
                    style={{ ...styles.retryButton, marginTop: 12 }}
                >
                    Main Menu
                </button>

                </div>
            </div>
            </div>
        )}

      {/* <div className="book-controls">
        <button
          onClick={previousPage}
          disabled={currentPage === 0}
          aria-label="Previous page"
        >
          ← <span>Previous</span>
        </button>

        <span className="page-counter">
          {currentPage + 1} / {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage >= totalPages - 1}
          aria-label="Next page"
        >
          <span>Next</span> →
        </button>
      </div> */}

      <p className="flipbook-tip">
        Click a page corner, drag a page, or use the arrows.
      </p>
    </main>
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