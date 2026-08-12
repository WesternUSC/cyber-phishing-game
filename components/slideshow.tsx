import React, { useState } from "react";

interface Slide {
  title?: string;
  content: React.ReactNode;
}

interface SlideshowProps {
  slides: Slide[];
  startSlide?: number;
  onLastSlide?: () => void;
}

// title slides that don't require 1 minute wait
const EXEMPT_SLIDES = new Set([0, 1, 5, 8, 11, 14, 18, 19]);

const WAIT_TIME = 60 * 1000;

const Slideshow: React.FC<SlideshowProps> = ({
  slides,
  startSlide = 0,
  onLastSlide,
}) => {
  const [current, setCurrent] = useState(startSlide);

  const [slideStartedAt, setSlideStartedAt] = useState(Date.now());

  const [seenSlides, setSeenSlides] = useState<Set<number>>(() => {
    return new Set([startSlide]);
  });

  const isExempt = (slideIndex: number) => {
    return EXEMPT_SLIDES.has(slideIndex);
  };

  const hasWaitedLongEnough = () => {
    if (isExempt(current)) {
      return true;
    }

    return Date.now() - slideStartedAt >= WAIT_TIME;
  };

  const changeSlide = (newIndex: number) => {
    setCurrent(newIndex);
    setSlideStartedAt(Date.now());

    setSeenSlides((previous) => {
      const updated = new Set(previous);
      updated.add(newIndex);
      return updated;
    });
  };

  const next = () => {
    if (current >= slides.length - 1) {
      onLastSlide?.();
      return;
    }

    if (!hasWaitedLongEnough()) {
      window.alert(
        "You must wait at least one minute on this slide before proceeding."
      );
      return;
    }

    changeSlide(current + 1);
  };

  const previous = () => {
    if (current > 0) {
      changeSlide(current - 1);
    }
  };

  const goToSlide = (index: number) => {
    if (index === current) {
      return;
    }

    const targetIsSeen = seenSlides.has(index);

    if (index < current) {
      if (targetIsSeen) {
        changeSlide(index);
      } else {
        window.alert("You haven't visited that slide yet.");
      }
      return;
    }

    if (index === current + 1) {
      if (!hasWaitedLongEnough()) {
        window.alert(
          "You must wait at least one minute on this slide before proceeding."
        );
        return;
      }

      changeSlide(index);
      return;
    }

    if (targetIsSeen) {
      changeSlide(index);
      return;
    }

    window.alert(
      "You must visit the previous slides before jumping ahead."
    );
  };

  const getNumberButtonStyle = (index: number) => {
    const isCurrent = index === current;
    const isSeen = seenSlides.has(index)

    return {
      ...styles.numberButton,
      backgroundColor: isCurrent
        ? "#007bff"
        : isSeen
        ? "#28a745"
        : "#aaa",
      color: isCurrent || isSeen ? "white" : "#666",
      cursor:
        isSeen || index === current || index === current + 1
          ? "pointer"
          : "not-allowed",
      opacity:
        isSeen || index === current || index === current + 1
          ? 1
          : 0.6,
    };
  };

  if (slides.length === 0) {
    return null;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>
          Slide {current + 1} / {slides.length}
        </h2>

        {slides[current].title && (
          <h3>{slides[current].title}</h3>
        )}
      </div>

      <div style={styles.slide}>
        {slides[current].content}
      </div>

      <div style={styles.footer}>
        <button
          onClick={previous}
          disabled={current === 0}
        >
          Previous
        </button>

        <div style={styles.numbers}>
          {slides.map((_, index) => {
            const isSeen = seenSlides.has(index);

            const canClick =
              index === current ||
              isSeen ||
              index === current + 1;

            return (
              <button
                key={index}
                onClick={() => {
                  if (canClick) {
                    goToSlide(index);
                  }
                }}
                disabled={!canClick}
                style={getNumberButtonStyle(index)}
                title={
                  !canClick
                    ? "Complete the previous slides before jumping here."
                    : undefined
                }
              >
                {index + 1}
              </button>
            );
          })}
        </div>

        <button
          onClick={next}
          disabled={current === slides.length - 1}
        >
          Next
        </button>
      </div>
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
    justifyContent: "space-between",
    gap: 10,
  },

  numbers: {
    display: "flex",
    gap: 5,
    flexWrap: "wrap",
  },

  numberButton: {
    width: 35,
    height: 35,
    border: "none",
    borderRadius: 4,
  },
};

export default Slideshow;