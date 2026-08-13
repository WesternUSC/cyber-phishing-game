'use client';

import React, { useState, useEffect } from "react";

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

const WAIT_TIME = 0 * 1000;

const STORAGE_KEY = "slideshow-progress";

const INCIDENT_SLIDE_TITLE = "Incident Response & Reporting";

const Slideshow: React.FC<SlideshowProps> = ({
  slides,
  startSlide = 0,
  onLastSlide,
}) => {
  const [current, setCurrent] = useState(startSlide);
  const [slideStartedAt, setSlideStartedAt] = useState(Date.now());
  const [seenSlides, setSeenSlides] = useState<Set<number>>(
    new Set([startSlide])
  );
  const [incidentSteps, setIncidentSteps] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

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
      } catch (error) {
        console.error("Failed to load slideshow progress:", error);
      }
    }

    setIsLoaded(true);
  }, [startSlide]);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        current,
        slideStartedAt,
        seenSlides: Array.from(seenSlides),
        incidentSteps,
      })
    );
  }, [isLoaded, current, slideStartedAt, seenSlides, incidentSteps]);

    const isExempt = (slideIndex: number) => {
      return EXEMPT_SLIDES.has(slideIndex);
    };

    const hasWaitedLongEnough = () => {
      if (isExempt(current)) {
        return true;
      }

      return Date.now() - slideStartedAt >= WAIT_TIME;
    };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore typing in text boxes
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      // Debug: remove in production
      if (event.key.toLowerCase() === 's') {
        setCurrent(slides.length - 2);
        const allSlidesSeen = seenSlides.size === slides.length;

        if (!allSlidesSeen) {
          const nextSlide = slides.length - 1;

          const allSlidesSeen = new Set(slides.map((_, index) => index));

          setSeenSlides(allSlidesSeen);

          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
              current: nextSlide,
              slideStartedAt: Date.now(),
              seenSlides: Array.from(allSlidesSeen),
              incidentSteps,
            })
          );

          onLastSlide?.();
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const changeSlide = (newIndex: number) => {
    setCurrent(newIndex);
    setSlideStartedAt(Date.now());

    setSeenSlides((previous) => {
      const updated = new Set(previous);
      updated.add(newIndex);
      return updated;
    });
  };

  const previous = () => {
    if (current > 0) {
      changeSlide(current - 1);
    }
  };

  const next = () => {
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
          })
        );

        onLastSlide?.();
        return;
      }
    }

    const isIncidentSlide =
      slides[current].title === INCIDENT_SLIDE_TITLE;

    if (isIncidentSlide && incidentSteps < 4) {
      setIncidentSteps((previous: number) => previous + 1);
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

  const goToSlide = (index: number) => {
    if (index === current) {
      return;
    }

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
          })
        );

        onLastSlide?.();
        return;
      }
    }

    const isIncidentSlide =
      slides[current].title === INCIDENT_SLIDE_TITLE;

    if (
      isIncidentSlide &&
      index === current + 1 &&
      incidentSteps < 4
    ) {
      window.alert(
        "Please reveal all four incident response steps before continuing."
      );
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
        {slides[current].title === INCIDENT_SLIDE_TITLE &&
        React.isValidElement(slides[current].content)
          ? React.cloneElement(
              slides[current].content as React.ReactElement<{
                visibleSteps: number;
              }>,
              { visibleSteps: incidentSteps }
            )
          : slides[current].content}
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